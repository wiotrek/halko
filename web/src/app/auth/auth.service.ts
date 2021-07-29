import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { AuthResponseData } from './_models/auth-response-data.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User | null>(null);
    apiUrl = environment.api;

    private jwtHelper = new JwtHelperService();
    private tokenExpirationTimer: any;

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
            catchError(
                (err: HttpErrorResponse) => throwError(err.error.message)
            ),
            tap((res: AuthResponseData) => {
                this.handleAuthentication(
                    res.login,
                    res.role,
                    res.pointNames,
                    res.token,
                    this.jwtHelper.decodeToken(res.token).exp
                );
            })
        );
    }

    logout(): void {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/logowanie']);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin(): void {

        const userData: {
            login: string;
            role: string;
            pointNames: string[];
            token: string;
            tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) { return; }

        const loadedUser = new User(
            userData.login,
            userData.role,
            userData.pointNames,
            userData.token,
            new Date(userData.tokenExpirationDate)
        );

        if (loadedUser.tokenFunc) {
            this.user.next(loadedUser);
        }

        const expirationDateInMs = new Date(
            userData.tokenExpirationDate
          ).getTime();

        const expirationDuration = expirationDateInMs - new Date().getTime();
        this.autoLogout(expirationDuration);
    }

    autoLogout(expirationDuration: number): void {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(
            login: string, role: string, pointNames: string[],
            token: string, expiresIn: number
        ): void {

        const expirationDate = new Date(
            new Date().getTime() + expiresIn
        );

        const user = new User(
            login,
            role,
            pointNames,
            token,
            expirationDate
        );

        this.user.next(user);
        this.autoLogout(expiresIn);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}
