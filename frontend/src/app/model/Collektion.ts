export interface Collektion {
    id: String;
    label: String;
    imgUrl?: String;
    customFields: CollektionItemField[];
}

export interface CollektionItemField {
    key: String;
    label: String;
    type: CollektionItemFieldType;
}

export type CollektionItemFieldType = 'TEXT'  | 'BOOLEAN' | 'INTEGER' | 'DATE';
export const CollektionItemFieldTypes: CollektionItemFieldType[] = [ 'TEXT', 'BOOLEAN', 'INTEGER', 'DATE' ];