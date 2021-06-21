import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {
    constructor(
        private authService: AuthService) {}

    logout(): void {
        this.authService.logout();
    }
}
