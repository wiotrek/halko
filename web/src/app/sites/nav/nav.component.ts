import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { faBars, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Links } from 'src/app/shared/models/links.model';

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
        { caption: 'Strona główna', path: '/zarzadzaj/'},
        { caption: 'Spis telefonów', path: 'telefony'},
        { caption: 'Rozliczenia', path: 'rozliczenia'},
        { caption: 'Serwis', path: 'serwis'},
        { caption: 'Skup telefonów', path: 'skup-telefonów'},
    ];

    constructor(
        private authService: AuthService) {}

    logout(): void {
        this.authService.logout();
    }
}
