import { useCallback, useEffect, useState } from 'react'
import type { Collection } from '~/lib/models.d.ts'

interface UseCollections {
  collections: Collection[];
  getCollection: (collectionId: string) => Collection | null;
}

export function useCollections(): UseCollections {
  const [collections,setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    fetch('/api/collections')
    .then(resp => resp.json().catch(() => ({})))
    .then(({ collections }) => {
      if (collections) {
        setCollections(collections);
      }
    })
  }, []);

  const getCollection = useCallback((collectionId: string) => 
    collections.find(collection => collection.id === collectionId),
    [collections]  
  );

  return { collections, getCollection }
}
