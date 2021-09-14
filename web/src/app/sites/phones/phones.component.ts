import { Component } from '@angular/core';
import { Links } from 'src/app/shared/models/links.model';

@Component({
    selector: 'app-phones',
    template: `
    <div class="wrapper">

        <div class="middle">

            <app-sub-nav
                [paths]="paths"
                [nameModule]="nameModule"
            ></app-sub-nav>

            <router-outlet></router-outlet>

        </div>

    </div>
    `,
    styles: [`
        .middle {
            max-width: 850px;
            margin: 0 auto;
        }
    `]
})

export class PhonesComponent {
    nameModule = 'telefony';

    paths: Links[] = [
        { caption: 'Spis telefonów', path: '' },
        { caption: 'Archiwum', path: 'archiwum'},
        { caption: 'Dodaj telefon', path: 'dodaj-telefon' }
    ];
}
