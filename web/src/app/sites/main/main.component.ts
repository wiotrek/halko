import { Component } from '@angular/core';

@Component({
    selector: 'app-main',
    template: `
    <div class="wrapper">
        <div>
            <app-main-sales></app-main-sales>
        </div>
        <div>
            <app-main-expenses></app-main-expenses>
        </div>
        <div>
            <app-main-statistics></app-main-statistics>
        </div>
    </div>
    `,
    styleUrls: ['main.component.scss']
})
export class MainComponent {}
