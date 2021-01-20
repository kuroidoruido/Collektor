import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

import { Collektion } from 'src/app/model/Collektion';
import { CollektionItem } from 'src/app/model/CollektionItem';
import { ImageInfo } from 'src/app/model/ImageInfo';

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) {}

  getCollektions(): Observable<Collektion[]> {
    return this.http.get<Collektion[]>('/api/collections');
  }

  getCollektion(collektionId: String): Observable<Collektion> {
    return this.http.get<Collektion>(`/api/collections/${collektionId}`);
  }

  createCollektion(newOne: Omit<Collektion, 'id'>): Observable<Collektion> {
    return this.http.post<Collektion>('/api/collections', newOne);
  }

  updateCollektion(one: Collektion): Observable<Collektion> {
    return this.http.put<Collektion>('/api/collections', one);
  }
  
  getCollektionItem(collektionId: String): Observable<CollektionItem[]> {
    return this.http.get<CollektionItem[]>(`/api/collections/${collektionId}/items`);
  }
  
  createCollektionItem(collektionId: String, newOne: Omit<CollektionItem, 'id'>): Observable<CollektionItem> {
    return this.http.post<CollektionItem>(`/api/collections/${collektionId}/items`, newOne);
  }
  
  updateCollektionItem(collektionId: String, one: CollektionItem): Observable<CollektionItem> {
    return this.http.put<CollektionItem>(`/api/collections/${collektionId}/items`, one);
  }

  createImage(file: File): Observable<ImageInfo[]> {
    const formData: FormData = new FormData();
    formData.append('images', file, file.name);
    return this.http.post<ImageInfo[]>('/api/imgs', formData, {
      headers: new HttpHeaders()
        .append('Accept', 'application/json')
      }
    );
  }

  deleteImage(imageId: string): Observable<void> {
    return this.http.delete<void>(`/api/imgs/${imageId}`);
  }
}
