import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const JWT_STORAGE_TOKEN_KEY = 'collektor.login.token';

export type AuthInfo = {
    jwt: string;
    user: {
        email: string;
        id: number;
        username: string;
        provider: string;
        confirmed: string;
        blocked: string;
        role: {
            id: number;
            name: string;
            description: string;
            type: string;
        };
    };
};

export type AuthNotLogged = {
    message: string;
    authError: true;
};

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private session$: Subject<AuthInfo | AuthNotLogged>;

    constructor(private http: HttpClient) {
        this.session$ = new ReplaySubject<AuthInfo | AuthNotLogged>(1);
        if (!this.restoreSessionIfPossible()) {
            this.logout();
        }
    }

    login(
        identifier: string,
        password: string
    ): Observable<AuthInfo | AuthNotLogged> {
        this.http
            .post<AuthInfo>('/api/auth/local', { identifier, password })
            .pipe(tap(this.saveSession))
            .subscribe(s => this.session$.next(s));
        return this.session$;
    }

    getCurrentSession(): Observable<AuthInfo | AuthNotLogged> {
        return this.session$;
    }

    logout() {
        sessionStorage.removeItem(JWT_STORAGE_TOKEN_KEY);
        this.session$.next({ message: 'Not log in', authError: true });
    }

    private restoreSessionIfPossible(): boolean {
        const fromStorage: AuthInfo = JSON.parse(
            sessionStorage.getItem(JWT_STORAGE_TOKEN_KEY)
        );
        if (
            fromStorage &&
            fromStorage.jwt &&
            fromStorage.user &&
            fromStorage.user.email
        ) {
            this.session$.next(fromStorage);
            return true;
        }
        return false;
    }

    private saveSession(authInfo: AuthInfo) {
        sessionStorage.setItem(JWT_STORAGE_TOKEN_KEY, JSON.stringify(authInfo));
    }
}
