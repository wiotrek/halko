import { Component } from '@angular/core';
import { faHandPeace } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    faHandPeace = faHandPeace;
}
