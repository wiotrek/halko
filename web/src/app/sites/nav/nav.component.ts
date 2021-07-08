import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { faBars, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

interface Links {
    displayName: string;
    path: string;
}

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {
    faSignInAlt = faSignInAlt;
    faBars = faBars;

    loged = {
        name: 'Karuzela Września'
    };

    links: Links[] = [
        { displayName: 'Strona główna', path: '/zarzadzaj/'},
        { displayName: 'Spis telefonów', path: 'spis-telefonów'},
        { displayName: 'Rozliczenia', path: 'rozliczenia'},
        { displayName: 'Serwis', path: 'serwis'},
        { displayName: 'Skup telefonów', path: 'skup-telefonów'},
    ];

    constructor(
        private authService: AuthService) {}

    logout(): void {
        this.authService.logout();
    }
}
