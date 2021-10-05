import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prices',
  template: `
    <div class="wrapper">

      <div class="middle">

        <div class="headline">

          <div class="headline__title">{{headline}}</div>

          <a
            class="headline__new-price"
            (click)="setUrl()"
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

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.checkUrl();
  }

  ngOnInit(): void {
    this.checkUrl();
  }

  checkUrl = () =>
    this.isAdderMode = this.router.url.includes('dodaj-telefon')

  setUrl(): void {
    this.router.navigate([
      this.isAdderMode ? '/admin/cennik' : 'dodaj-telefon'
    ], { relativeTo: this.route })
    .then(() => this.checkUrl());
  }
}
