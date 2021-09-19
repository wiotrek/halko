import { Component } from '@angular/core';

@Component({
    selector: 'app-admin',
    template: '<div class="wrapper"><router-outlet></router-outlet></div>',
    styles: [
        `.wrapper {
            max-width: 850px;
            margin: 20px auto;
        }`
    ]
})
export class AdminComponent {}
