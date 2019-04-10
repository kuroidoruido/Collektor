import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, empty, of, throwError } from 'rxjs';
import { catchError, flatMap, map, switchMap } from 'rxjs/operators';

import {
    AuthenticationService,
    AuthInfo,
    AuthNotLogged,
} from './authentication.service';

export interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    role: number;
}

export interface Photo {
    id: number;
    name: string;
    hash: string;
    sha256: string;
    ext: string;
    mime: string;
    size: string;
    url: string;
    provider: string;
    public_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface Item {
    id: number;
    label: string;
    tags: string[];
    fields: { [fieldName: string]: string };
    created_at: Date;
    updated_at: Date;
    photos: Photo[];
}

export type FieldType =
    | 'Text'
    | 'Autocomplete-Text'
    | 'Integer'
    | 'Enum'
    | 'Price';

export interface FieldTemplate {
    fields: {
        type: FieldType;
        index: number;
        label: string;
        typeOption?: string;
    }[];
}

export interface Collection {
    id: number;
    label: string;
    owner: User;
    template: FieldTemplate;
    created_at: Date;
    updated_at: Date;

    items?: Item[];
}

const authOrError = authInfo =>
    authInfo['jwt']
        ? of(authInfo as AuthInfo)
        : throwError(authInfo as AuthNotLogged);
const catchAuthErrorOnly = error =>
    error['authError'] ? empty() : throwError(error);

@Injectable({
    providedIn: 'root',
})
export class CollectionsService {
    constructor(
        private authService: AuthenticationService,
        private http: HttpClient
    ) {}

    getCollections(): Observable<Collection[]> {
        return this.authService.getCurrentSession().pipe(
            flatMap(authOrError),
            flatMap(({ jwt }) =>
                this.http.get<Collection[]>('/api/collections', {
                    headers: { Authorization: `Bearer ${jwt}` },
                })
            ),
            catchError(catchAuthErrorOnly)
        );
    }

    getCollection(collectionId: number): Observable<Collection> {
        const headers = (jwt: string) => ({ Authorization: `Bearer ${jwt}` });
        const grabCollection = (jwt: string) =>
            this.http
                .get<Collection[]>('/api/collections', {
                    headers: headers(jwt),
                    params: { id: `${collectionId}` },
                })
                .pipe(map(collections => collections[0]));
        const convertTagsToArray = items =>
            items.map(({ tags, ...item }) => ({
                ...item,
                tags: (tags as string).split(' '),
            }));
        const grabCollectionItems = (jwt: string) =>
            this.http
                .get<Item[]>('/api/items', {
                    headers: headers(jwt),
                    params: { fromCollection: `${collectionId}` },
                })
                .pipe(map(items => convertTagsToArray(items)));
        const combineCollectionAndItems = (jwt: string) =>
            combineLatest<Collection>(
                grabCollection(jwt),
                grabCollectionItems(jwt),
                (collection, items) => ({ ...collection, items })
            );

        return this.authService.getCurrentSession().pipe(
            flatMap(authOrError),
            switchMap(({ jwt }) => combineCollectionAndItems(jwt)),
            catchError(catchAuthErrorOnly)
        );
    }
}
