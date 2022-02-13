import React, { useMemo } from 'react';

import { Header } from '~/components/header.tsx';
import { useCollections } from '~/lib/useCollections.ts';
import type { Collection } from '~/lib/models.d.ts';
import { WithKey } from '~/lib/react.helper.ts';

export default function Home() {
  const { collections } = useCollections()

  return (
    <div className="page">
      <head>
        <title>Collektor - Collections</title>
      </head>
      <Header />
      <div className="container">
        {collections.map(collection => (
          <CollectionCard key={collection.label} collection={collection} />
        ))}
      </div>
    </div>
  )
}

interface CollectionCardProps extends WithKey {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const collectionUrl = useMemo(() => `/collection/${collection.id}`, [collection.id]);
  return <div className="card">
    <div className="card-content">
      <span className="card-title">
        <span className="label">{ collection.label }</span>
        <span className="badge content-count">{ collection.content.length }</span>
      </span>
    </div>
    <div className="card-action">
      <a href={collectionUrl}>Ouvrir</a>
    </div>
  </div>;
}