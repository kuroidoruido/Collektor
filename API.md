# API

## Domain

### /
- GET: alias of "GET /status"

### /status
- GET: get the current status of the server

### /api/v0/collections
- GET: list collections (without items nor itemtype)
- POST(body: Collection): create a collection (with itemtype list but without items)

### /api/v0/collections/{collectionId}
- GET: get a collection (without items)
- PUT(body: Collection): update a collection (except items)

### /api/v0/collections/{collectionId}/items
- GET: list items in the collection
- POST(body: Item): create a new item and add it to the collection

### /api/v0/collections/{collectionId}/items/{itemId}
- PUT(body: Item): update the item
- DELETE: remove the item from the collection

## Authentication

### /auth/login
- POST(body: {username,password}): login and create a new session

### /auth/logout
- POST(body: {sessionToken}): logout
