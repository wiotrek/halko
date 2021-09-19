import { Component } from '@angular/core';
import { Links } from 'src/app/shared/models/links.model';

@Component({
    selector: 'app-admin-settings',
    template: `
        <ul class="nav nav-tabs">
            <li class="nav-item" *ngFor="let link of links">
                <a
                    class="nav-link"
                    [routerLink]="link.path"
                    routerLinkActive="active"
                >
                    {{link.caption}}
                </a>
            </li>
        </ul>

        <router-outlet></router-outlet>`
})
export class AdminSettingsComponent {
    links: Links[] = [
        { caption: 'Punkty', path: 'punkty' },
        { caption: 'Pracownicy', path: 'pracownicy' },
        { caption: 'Admini', path: 'admini' },
        { caption: 'Statystyki', path: 'statystyki' }
    ];
}
