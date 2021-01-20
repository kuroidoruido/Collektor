import { EMPTY, Observable } from "rxjs";

import { Collektion } from "src/app/model/Collektion";
import { CollektionItem } from "src/app/model/CollektionItem";
import { BackendService } from "src/app/backend/backend.service";
import { ImageInfo } from "src/app/model/ImageInfo";

export class BackendServiceStub {
    getCollektions(): Observable<Collektion[]> {
      return EMPTY;
    }
    
      getCollektion(collektionId: string): Observable<Collektion> {
      return EMPTY;
    }
    
      createCollektion(newOne: Omit<Collektion, 'id'>): Observable<Collektion> {
      return EMPTY;
    }
    
      updateCollektion(one: Collektion): Observable<Collektion> {
      return EMPTY;
    }
      
      getCollektionItems(collektionId: string): Observable<CollektionItem[]> {
      return EMPTY;
    }
      getCollektionItem(collektionId: string, itemId: string): Observable<CollektionItem> {
      return EMPTY;
    }
      
      createCollektionItem(collektionId: string, newOne: Omit<CollektionItem, 'id'>): Observable<CollektionItem> {
      return EMPTY;
    }
      
      updateCollektionItem(collektionId: string, one: CollektionItem): Observable<CollektionItem> {
      return EMPTY;
    }
    
      createImage(file: File): Observable<ImageInfo[]> {
        return EMPTY;
      }
    
      deleteImage(imageId: string): Observable<void> {
      return EMPTY;
    }
}

export const BackendServiceMock = {
    provide: BackendService,
    useClass: BackendServiceStub,
};