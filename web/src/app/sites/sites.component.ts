import { Component } from '@angular/core';

@Component({
  selector: 'app-sites',
  template: `

    <div class="container">
        <app-nav></app-nav>
        <router-outlet></router-outlet>
    </div>

    `,
  styles: [
    '.container { margin: 0 auto; max-width: 1600px; }'
  ]
})
export class SitesComponent {
}
