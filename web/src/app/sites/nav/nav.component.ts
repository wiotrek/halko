import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { faBars, faSignInAlt } from '@fortawesome/free-solid-svg-icons';


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

    constructor(
        private authService: AuthService) {}

    logout(): void {
        this.authService.logout();
    }
}