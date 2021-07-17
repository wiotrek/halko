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
        private router: Router) {}

    login(login: string, password: string): Observable<AuthResponseData> | Observable<unknown> {
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
                    res.pointNames,
                    res.token,
                    res.role
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
            pointNames: string[];
            token: string;
            role: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) { return; }

        const loadedUser = new User(
            userData.pointNames,
            userData.token,
            userData.role
        );

        if (loadedUser.tokenFunc) {
            this.user.next(loadedUser);
        }
    }

    private handleAuthentication(
            pointNames: string[], token: string, role: string
        ): void {

        const user = new User(
            pointNames,
            token,
            role
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
