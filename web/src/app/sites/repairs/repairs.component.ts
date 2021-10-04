import { Component } from '@angular/core';
import { Links } from 'src/app/shared/models/links.model';

@Component({
  selector: 'app-repairs',
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

    .wrapper {
      margin-top: 30px;
    }

    .middle {
      max-width: 850px;
      margin: 0 auto;
    }

  `]
})
export class RepairsComponent {
  // for sub nav component
  nameModule = 'serwis';

  // used links
  paths: Links[] = [
    { caption: 'Aktualne serwisy', path: '' },
    { caption: 'Archiwum', path: 'archiwum'},
    { caption: 'Dodaj serwis', path: 'dodaj-serwis' }
  ];
}
