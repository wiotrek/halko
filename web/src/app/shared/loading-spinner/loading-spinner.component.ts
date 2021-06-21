import { Component } from '@angular/core';

@Component({
    selector: 'app-spinner-loading',
    template: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
    styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {}
