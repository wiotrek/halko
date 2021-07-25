import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { faBars, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Links } from 'src/app/shared/models/links.model';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
    faSignInAlt = faSignInAlt;
    faBars = faBars;

    singInUser = 'Punkt';

    links: Links[] = [
        { caption: 'Strona główna', path: '' },
        { caption: 'Spis telefonów', path: 'telefony' },
        { caption: 'Rozliczenia', path: 'rozliczenia' },
        { caption: 'Serwis', path: 'serwis' },
        { caption: 'Skup telefonów', path: 'skup-telefonów' }
    ];

    subscription: Subscription;

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.subscription = this.authService.user.subscribe(
            (user: User) => this.singInUser = user.displayName,
            () => this.singInUser = 'Punkt'
        );
    }

    logout(): void {
        this.subscription.unsubscribe();
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
