import { CollectionDefinition, CollectionType } from "./models.ts";
import { VIDEO_GAMES_DEF } from "./video-games.data.ts";

export const TYPES: Record<CollectionType,CollectionDefinition> = {
    'video-game': VIDEO_GAMES_DEF,
};
