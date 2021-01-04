import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Collektion } from 'src/app/model/Collektion';
import { CollektionItem } from 'src/app/model/CollektionItem';

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) {}

  getCollektions(): Observable<Collektion[]> {
    return this.http.get<Collektion[]>('/api/collections');
  }

  createCollektion(newOne: Collektion): Observable<Collektion> {
    return this.http.post<Collektion>('/api/collections', newOne);
  }
  
  getCollektionItem(collektionId: String): Observable<CollektionItem[]> {
    return this.http.get<CollektionItem[]>(`/api/collections/${collektionId}/items`);
  }
  
  createCollektionItem(collektionId: String, newOne: CollektionItem): Observable<CollektionItem> {
    return this.http.post<CollektionItem>(`/api/collections/${collektionId}/items`, newOne);
  }
}
