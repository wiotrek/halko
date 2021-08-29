import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from './_models/user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    // tslint:disable-next-line: typedef
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user
            .pipe(
                take(1),
                exhaustMap(
                    (user: User) => {
                        if (user) {
                            req = req.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${user.tokenFunc}`
                                }
                            });
                        }
                        return next.handle(req);
                    }
                )
            );
    }
}
