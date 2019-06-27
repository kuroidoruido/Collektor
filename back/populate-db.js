var { AsyncSubject, from, of, zip } = require("rxjs");
var { ajax } = require("rxjs/ajax");
var { flatMap, map, tap } = require("rxjs/operators");
var { XMLHttpRequest } = require("xmlhttprequest");

const createXHR = () => {
  return new XMLHttpRequest();
};

const baseUrl = "http://localhost:1337";

const users = [
  {
    username: "Spike Spiegel",
    email: "spike@bebop.com",
    password: "password",
    collections: [
      {
        label: "Starship",
        template: {
          fields: [
            { label: "Crew size", index: 0, type: "Integer" },
            { label: "Type", index: 1, type: "Text" }
          ]
        },
        items: [
          {
            label: "Swordfish IIx",
            tags: "owned",
            fields: {
              "Crew size": 1,
              Type: "MONO racer, Model 2405"
            }
          },
          {
            label: "Arcadia IV",
            tags: "required",
            fields: {
              "Crew size": 50,
              Type: "Arcadia"
            }
          }
        ]
      }
    ]
  },
  {
    username: "Jet Black",
    email: "jet@bebop.com",
    password: "password",
    collections: [
      {
        label: "Starship",
        template: {
          fields: [
            { label: "Crew size", index: 0, type: "Integer" },
            { label: "Type", index: 1, type: "Text" }
          ]
        },
        items: [
          {
            label: "Bebop",
            tags: "owned",
            fields: {
              "Crew size": 5,
              Type: "Fishing ship"
            }
          },
          {
            label: "Hammer Head",
            tags: "owned",
            fields: {
              "Crew size": 1,
              Type: "MONO boat"
            }
          },
          {
            label: "Death Star III",
            tags: "required",
            fields: {
              "Crew size": 342953,
              Type: "Death Star"
            }
          }
        ]
      }
    ]
  },
  {
    username: "Faye Valentine",
    email: "faye@bebop.com",
    password: "password",
    collections: [
      {
        label: "Starship",
        template: {
          fields: [
            { label: "Crew size", index: 0, type: "Integer" },
            { label: "Type", index: 1, type: "Text" }
          ]
        },
        items: [
          {
            label: "Red Tail",
            tags: "owned",
            fields: {
              "Crew size": 1,
              Type: "MONO carrier"
            }
          }
        ]
      }
    ]
  },
  {
    username: "Edward Wong Hau Pepelu Tivrusky 4th",
    email: "edward@bebop.com",
    password: "password",
    collections: []
  },
  {
    username: "Ein",
    email: "ein@bebop.com",
    password: "password",
    collections: [
      {
        label: "Bones",
        template: {
          fields: [
            { label: "Animal", index: 0, type: "Text" },
            { label: "Type", index: 0, type: "Text" }
          ]
        },
        items: [
          {
            label: "Gorilla's Humerus",
            tags: "owned",
            fields: {
              Animal: "Gorilla",
              Type: "Humerus"
            }
          },
          {
            label: "T-Rex's Femur",
            tags: "required",
            fields: {
              Animal: "T-Rex",
              Type: "Femur"
            }
          }
        ]
      },
      {
        label: "Things",
        template: {
          fields: [{ label: "Type", index: 0, type: "Text" }]
        },
        items: [
          {
            label: "Ed's Shogi",
            tags: "owned",
            fields: {
              Type: "shogi"
            }
          },
          {
            label: "Bowl",
            tags: "owned",
            fields: {
              Type: "bowl"
            }
          }
        ]
      }
    ]
  }
];

const rootAuth$ = new AsyncSubject();
const rootAuth = () => {
  ajax({
    createXHR,
    method: "POST",
    url: `${baseUrl}/admin/auth/local`,
    body: { identifier: "admin@local.com", password: "password" },
    crossDomain: true
  })
    .pipe(map(({ response: { jwt } }) => jwt))
    .subscribe(rootAuth$);
  return rootAuth$;
};
const createUser = user =>
  ajax({
    createXHR,
    method: "POST",
    url: `${baseUrl}/auth/local/register`,
    body: user,
    crossDomain: true
  }).pipe(map(({ response: { user } }) => user));
const createCollection = (collection, jwt) => {
  console.log("createCollection", JSON.stringify(collection), jwt);
  return ajax({
    createXHR,
    method: "POST",
    url: `${baseUrl}/collections`,
    body: collection,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json"
    },
    crossDomain: true
  }).pipe(map(({ response }) => response));
};
const createItem = (item, jwt) =>
  ajax({
    createXHR,
    method: "POST",
    url: `${baseUrl}/items`,
    body: item,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json"
    },
    crossDomain: true
  }).pipe(map(({ response }) => response));

rootAuth();

from(users)
  .pipe(
    // creates users
    flatMap(({ collections, ...user }) =>
      zip(of(collections), createUser(user), rootAuth$)
    ),
    // set owner property on every collections of the user
    flatMap(([collections, { id }, jwt]) =>
      from(collections).pipe(map(c => ({ ...c, owner: id, jwt })))
    ),
    // creates collections
    flatMap(({ items, jwt, ...collection }) =>
      zip(of(items), createCollection(collection, jwt), of(jwt))
    ),
    // set fromCollection property on every items of the collection
    flatMap(([items, { id }, jwt]) =>
      from(items).pipe(map(i => ({ ...i, fromCollection: id, jwt })))
    ),
    // creates items
    flatMap(({ jwt, ...item }) => createItem(item, jwt))
  )
  .subscribe(
    () => console.log("finished"),
    err => console.error("An error occurred", err)
  );
