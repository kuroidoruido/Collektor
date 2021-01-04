import { Component, Input } from '@angular/core';
import { Collektion } from 'src/app/model/Collektion';

@Component({
  selector: 'app-collektion-tile',
  templateUrl: './collektion-tile.component.html',
  styleUrls: ['./collektion-tile.component.scss']
})
export class CollektionTileComponent {
  @Input() collektion: Collektion | undefined;
}
