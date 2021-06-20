import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';

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
    user = new BehaviorSubject(null);

    constructor(
        private http: HttpClient,
        private router: Router) {}

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUfHv4oYhTiXB7WZ5ENwYPv3ZwLmBd8N0',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(
            tap(res => {
                this.handleAuthentication(
                    res.email,
                    res.localId,
                    res.idToken
                );
            })
        );
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
}
