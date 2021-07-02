import { Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-scratch-adder',
    templateUrl: 'scratch-adder.component.html',
    styleUrls: ['scratch-adder.component.scss']
})

export class ScratchAdderComponent {
    faCheckCircle = faCheck;
}
