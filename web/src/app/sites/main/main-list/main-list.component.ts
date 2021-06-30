import { Component } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';


@Component({
    selector: 'app-main-list',
    templateUrl: 'main-list.component.html',
    styleUrls: ['main-list.component.scss']
})
export class MainListComponent {
    faCheckCircle = faCheckCircle;
}
