import { Component } from '@angular/core';
import { Links } from 'src/app/shared/models/links.model';

@Component({
  selector: 'app-participants-mgmt',
  template: `
        <app-sub-nav
            [paths]="paths"
            [nameModule]="nameModule"
            [parent]="parent"
        ></app-sub-nav>

        <router-outlet></router-outlet>
    `
})
export class ParticipantsMgmtComponent {
  // for sub nav component
  nameModule = 'pracownicy';
  parent = 'admin';
  paths: Links[] = [
    {caption: 'Pracownicy', path: ''},
    {caption: 'Dodaj admina', path: 'dodaj-admina'},
    {caption: 'Dodaj pracownika', path: 'dodaj-pracownika'}
  ];
}
