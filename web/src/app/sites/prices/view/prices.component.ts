import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prices',
  template: `
    <div class="wrapper">

      <div class="middle">

        <div class="headline">

          <div class="headline__title">{{headline}}</div>

          <a
            class="headline__new-price"
            routerLink="{{isAdderMode ? 'dodaj-telefon' : ''}}"
            *appHasRole="['Admin']"
          >
            {{isAdderMode ? 'Cofnij' : 'Dodaj informacje o telefonie'}}
          </a>

        </div>

        <router-outlet></router-outlet>

      </div>

    </div>
  `,
  styleUrls: ['prices.component.scss']
})
export class PricesComponent implements OnInit {
  headline = 'Cennik';

  isAdderMode = false;

  constructor(private router: Router) {
    this.checkUrl();
  }

  ngOnInit(): void {
    this.checkUrl();
  }

  checkUrl = () =>
    this.isAdderMode = this.router.url.includes('dodaj-telefon')
}
