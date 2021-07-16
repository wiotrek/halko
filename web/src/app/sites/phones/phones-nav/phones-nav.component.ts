import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Links } from 'src/app/shared/models/links.model';

@Component({
    selector: 'app-phones-nav',
    templateUrl: './phones-nav.component.html',
    styleUrls: ['./phones-nav.component.scss']
})
export class PhonesNavComponent {

    paths: Links[] = [
        { caption: 'Spis telefonów', path: '' },
        { caption: 'Archiwum', path: 'archiwum'},
        { caption: 'Dodaj telefon', path: 'dodaj-telefon' }
    ];

    activeSite: Links;
    leftOption: Links;
    rightOption: Links;

    constructor(
        private router: Router,
        private route: ActivatedRoute) {

        // default
        this.activeSite = this.paths[0];
        this.leftOption = this.paths[2];
        this.rightOption = this.paths[1];
    }

    setPropertyNav = (link: Links) => {
        this.activeSite = link;

        this.leftOption = this.paths[2] === link
        ? this.paths[0] : this.paths[2];

        this.rightOption = this.paths[1] === link
        ? this.paths[0] : this.paths[1];

        this.router.navigate([`./${link.path}`], { relativeTo: this.route });
    }
}
