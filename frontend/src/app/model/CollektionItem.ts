export interface CollektionItem {
    id: String;
    label: String;
    photoUrls: String[];
    customFields: { [key: string]: string | boolean | number | Date };
}
