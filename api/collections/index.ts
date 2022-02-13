import type { APIHandler } from 'aleph/types.d.ts'
import type { Collection } from '~/lib/models.ts';

export const handler: APIHandler = ({ response }) => {
  const collections: Collection[] = [
    {
      id: 'evercade',
      label: 'Jeux Evercade',
      type: 'video-game',
      content: [
        {
          id: '06',
          label: 'Namco museum collection 2',
          editor: 'Evercade',
          releaseDate: '2020-05-22',
          platform: 'Evercade',
          description: 
`- Burning Force
- Dig Dug 2
- Dragon Spirit
- Galaga
- Pac-Attack
- Phelios
- Splatterhouse 2
- Splatterhouse 3
- Tower of Druaga
- Warp man
- Weapon Lord
`
        },
        {
          id: '17',
          label: 'Indie heroes collection 1',
          editor: 'Evercade',
          releaseDate: '2021-07-30',
          platform: 'Evercade',
          description:
`- Doodle World
- Twin Dragons
- FoxyLand
- Debtor
- Alien Cat 2
- Deadeus
- Anguna
- Super Homebrew War
- FLEA
- UCHUSEN
- Ploid
- KUBO 3
- Quest Arrest
- Chain Break
`
        }
      ]
    }
  ];
  response.json({ collections })
}
