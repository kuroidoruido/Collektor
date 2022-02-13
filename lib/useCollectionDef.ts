import { TYPES } from "~/lib/data.ts";
import { CollectionType } from "~/lib/models.ts";

export function useCollectionDef() {
    return { definitions: TYPES, getDefinition };
}

function getDefinition(defId: CollectionType) {
    return TYPES[defId];
}