export interface Collektion {
    id: string;
    label: string;
    imgUrl?: string;
    customFields: CollektionItemField[];
}

export interface CollektionItemField {
    key: string;
    label: string;
    type: CollektionItemFieldType;
}

export type CollektionItemFieldType = 'TEXT'  | 'BOOLEAN' | 'INTEGER' | 'DATE';
export const CollektionItemFieldTypes: CollektionItemFieldType[] = [ 'TEXT', 'BOOLEAN', 'INTEGER', 'DATE' ];