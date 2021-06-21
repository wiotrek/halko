import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    // temporary resolve
    pathSingIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    keyFirebase = environment.firebase_key;

    user = new BehaviorSubject(null);

    constructor(
        private http: HttpClient,
        private router: Router) {}

    login(email: string, password: string): Observable<AuthResponseData> | Observable<unknown>{
        return this.http.post<AuthResponseData>(
            this.pathSingIn + this.keyFirebase,
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap((res: AuthResponseData) => {
                this.handleAuthentication(
                    res.email,
                    res.localId,
                    res.idToken
                );
            })
        );
    }

    logout(): void {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/logowanie']);
    }

    autoLogin(): void {
        const userData: {
            email: string;
            id: string;
            token: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) { return; }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData.token
        );

        if (loadedUser.tokenFunc) {
            this.user.next(loadedUser);
        }
    }

    private handleAuthentication(email: string, userId: string, token: string): void {
        const user = new User(
            email,
            userId,
            token
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errRes: HttpErrorResponse): any {
        let errorMessage = 'Pojawił się problem z serverem';
        if (!errRes.error || !errRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errRes.error.error.message) {
            case 'INVALID_EMAIL':
                errorMessage = 'Nieznany email';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Niepoprawne hasło';
                break;
        }
        return throwError(errorMessage);
    }
}
