import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { first } from 'rxjs/operators';

import { BackendService } from 'src/app/backend/backend.service';
import { ImageInfo } from 'src/app/model/ImageInfo';
import { isDefined } from 'src/app/shared/assert.utils';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnChanges {
  @Input() model: string | undefined;
  @Output() modelChange = new EventEmitter<string>();

  private id: string | undefined;

  constructor(private backend: BackendService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model) {
      const nextModel = changes.model.currentValue;
      if (isDefined(nextModel)) {
        this.id = nextModel.substr(nextModel.lastIndexOf('/')+1);
      } else {
        this.id = undefined;
      }
    }
  }

  upload(event: any): void {
    let fileList: FileList = event?.target?.files;
    if (fileList.length > 0) {
      this.backend.createImage(fileList[0]).pipe(first()).subscribe((imageInfo: ImageInfo[]) => {
        this.id = imageInfo[0].id;
        this.model = imageInfo[0].url;
        this.modelChange.emit(this.model);
      });
    }
  }

  deleteImage(): void {
    if (this.id) {
      this.backend.deleteImage(this.id).subscribe(() => {
        delete this.model;
        delete this.id;
      });
    }
  }
}
