import { EMPTY, Observable } from "rxjs";

import { Collektion } from "src/app/model/Collektion";
import { CollektionItem } from "src/app/model/CollektionItem";
import { BackendService } from "../backend/backend.service";

export class BackendServiceStub {
    getCollektions(): Observable<Collektion[]> {
        return EMPTY;
    }

    createCollektion(newOne: Collektion): Observable<Collektion> {
        return EMPTY;
    }
    
    getCollektionItem(collektionId: String): Observable<CollektionItem[]> {
        return EMPTY;
    }
    
    createCollektionItem(collektionId: String, newOne: CollektionItem): Observable<CollektionItem> {
        return EMPTY;
    }
}

export const BackendServiceMock = {
    provide: BackendService,
    useClass: BackendServiceStub,
};