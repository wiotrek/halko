import { Component } from '@angular/core';

@Component({
    selector: 'app-phones',
    template: `

    <div class="wrapper">
        <div class="middle">
            <app-phones-nav></app-phones-nav>
            <router-outlet></router-outlet>
        </div>
    </div>

    `,
    styles: [`

        .wrapper {
            margin-top: 30px;
        }

        .middle {
            max-width: 850px;
            margin: 0 auto;
        }

    `]
})

export class PhonesComponent {}
