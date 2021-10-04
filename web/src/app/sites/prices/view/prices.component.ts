import { Component } from '@angular/core';

@Component({
  selector: 'app-prices',
  template: `
    <div class="wrapper">

      <div class="middle">

        <div class="headline">

          <div class="headline__title">{{headline}}</div>

          <a
            class="headline__new-price"
            routerLink="dodaj-telefon"
            *appHasRole="['Admin']"
          >
            Dodaj informacje o telefonie
          </a>

        </div>

        <router-outlet></router-outlet>

      </div>

    </div>
  `,
  styleUrls: ['prices.component.scss']
})
export class PricesComponent {
    headline = 'Cennik';
}
