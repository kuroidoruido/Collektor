import format from 'https://raw.githubusercontent.com/date-fns/deno/main/format/index.js';
import parse from 'https://raw.githubusercontent.com/date-fns/deno/main/parse/index.js';
import React, { useMemo } from 'react';
import { useRouter } from 'https://deno.land/x/aleph/framework/react/mod.ts'

import { Header } from '~/components/header.tsx';
import { useCollections } from '~/lib/useCollections.ts';
import type { Collection, CollectionField, CollectionItem, CollectionType } from '~/lib/models.ts';
import type { WithKey } from '~/lib/react.helper.ts';
import { useCollectionDef } from '~/lib/useCollectionDef.ts';

export default function CollectionPage() {
  const { params: { slug } } = useRouter();
  const { getCollection } = useCollections();
  const collection = getCollection(slug)
  if (collection == null) {
    return <NotFoundView slug={slug} />;
  } else {
    return <CollectionItemsView collection={collection} />;
  }
}

function NotFoundView({ slug }:{ slug: string }) {
  return <div className="page">
    <head>
      <title>Collektor - Not found</title>
    </head>
    <div>Impossible de trouver une collection avec l'id <span>{ slug }</span></div>
  </div>;
}

function CollectionItemsView({ collection }:{ collection: Collection }) {
  const title = useMemo(() => `Collektor - ${collection.label}`, [collection.label]);
  return (
    <div className="page">
      <head>
        <title>{title}</title>
      </head>
      <Header />
      <div className="container">
        {collection.content.map(item => (
          <CollectionItemCard key={item.id} type={collection.type} item={item} />
        ))}
      </div>
    </div>
  )
}

interface CollectionItemCardProps extends WithKey {
  type: CollectionType;
  item: CollectionItem;
}

function CollectionItemCard({ item, type }:CollectionItemCardProps) {
  const { getDefinition } = useCollectionDef();
  const definition = getDefinition(type);
  return <div className="card">
    <div className="card-content">
      <span className="card-title">
        <span className="label">{ item.label }</span>
        <span className="badge id">{ item.id }</span>
      </span>
    </div>
    <ul className="collection">
      { definition.fields.map(fieldDef => (
        <CollectionItemField key={fieldDef.field} fieldDef={fieldDef} item={item} />
      ))}
    </ul>
  </div>;
}

interface CollectionItemFieldProps extends WithKey {
  fieldDef: CollectionField;
  item: CollectionItem;
}

function CollectionItemField({ fieldDef, item }: CollectionItemFieldProps) {
  switch (fieldDef.type) {
    case 'multiline':
      return <li className="collection-item"><pre>{ item[fieldDef.field] }</pre></li>;
    case 'string':
      return <li className="collection-item">{ item[fieldDef.field] }</li>;
    case 'boolean':
      return <li className="collection-item">{ Boolean(item[fieldDef.field]) ? 'Oui' : 'Non' }</li>;
    case 'number':
      return <li className="collection-item">{ Number(item[fieldDef.field]) }</li>;
    case 'date':
      const date = parse(item[fieldDef.field], 'yyyy-MM-dd', new Date());
      const strDate = format(date, 'PPP');
      return <li className="collection-item">{ strDate }</li>;
    default:
      return <></>;
  }
}