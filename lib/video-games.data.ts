import { CollectionDefinition } from "~/lib/models.ts";

export const VIDEO_GAMES_DEF: CollectionDefinition = {
    label: 'Video Game',
    fields: [
        {
            field: 'editor',
            label: 'Éditeur',
            type: 'string',
        },
        {
            field: 'releaseDate',
            label: 'Date de sortie',
            type: 'date',
        },
        {
            field: 'platform',
            label: 'Plateforme',
            type: 'string',
        },
        {
            field: 'description',
            label: 'Description',
            type: 'multiline',
        }
    ]
}