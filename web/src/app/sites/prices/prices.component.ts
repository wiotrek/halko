import {Component} from '@angular/core';
import {Links} from '../../shared/models/links.model';

@Component({
    selector: 'app-prices',
    template: `
        <div class="wrapper">

            <div class="middle">

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
export class PricesComponent {}
