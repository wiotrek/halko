import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
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
    points: string[] = [];

    links: Links[] = [
        { caption: 'Punkty', path: 'punkty' },
        { caption: 'Pracownicy', path: 'pracownicy' },
        { caption: 'Admini', path: 'admini' },
        { caption: 'Statystyki', path: 'statystyki' }
    ];

    constructor(private adminService: AdminService) {
        this.getPointList();
    }

    getPointList(): void {
        this.points = this.adminService.pointList;
    }
}
