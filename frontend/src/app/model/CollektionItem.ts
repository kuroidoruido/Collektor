export interface CollektionItem {
    id: string;
    label: string;
    photoUrls: string[];
    customFields: { [key: string]: string | boolean | number | Date };
}
