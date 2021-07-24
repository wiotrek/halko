import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { AuthResponseData } from './_models/auth-response-data.model';

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject(null);
    apiUrl = environment.api;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    login(login: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(
            this.apiUrl + 'api/auth/login',
            {
                login,
                password,
            }
        ).pipe(
            catchError(this.handleError),
            tap((res: AuthResponseData) => {
                this.handleAuthentication(
                    res.role,
                    res.pointNames,
                    res.token
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
            role: string;
            pointNames: string[];
            token: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) { return; }

        const loadedUser = new User(
            userData.role,
            userData.pointNames,
            userData.token,
        );

        if (loadedUser.tokenFunc) {
            this.user.next(loadedUser);
        }
    }

    private handleAuthentication(
            role: string, pointNames: string[], token: string,
        ): void {

        const user = new User(
            role,
            pointNames,
            token,
        );

        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errRes: HttpErrorResponse): any {

        const errMsg = !errRes.error || !errRes.error.error
        ? 'Pojawił się problem z serverem'
        : 'Błędny login lub hasło';

        return throwError(errMsg);
    }
}
