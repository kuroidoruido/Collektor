export type CollectionType = 'video-game';

export interface Collection {
    id: string;
    label: string;
    type: CollectionType;
    content: CollectionItem[];
}

export interface CollectionItem {
    id: string;
    label: string;
    [key: string]: string | number | boolean;
}

export interface CollectionDefinition {
    label: string;
    fields: CollectionField[];
}

export interface CollectionField {
    field: string;
    label: string;
    type: 'multiline' | 'string' | 'boolean' | 'number' | 'date',
}
