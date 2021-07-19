import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Links } from 'src/app/shared/models/links.model';

@Component({
    selector: 'app-phones-nav',
    templateUrl: './phones-nav.component.html',
    styleUrls: ['./phones-nav.component.scss']
})
export class PhonesNavComponent implements DoCheck {

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
        private route: ActivatedRoute
    ) {
        // default values
        this.activeSite = this.paths[0];
        this.leftOption = this.paths[2];
        this.rightOption = this.paths[1];
    }

    ngDoCheck(): void {
        this.setPropertyNav(this.router.url);
    }

    setPropertyNav = (currenturl: string) => {

        // check which path is now
        const currentlyLink = this.paths.find(
            x => x.path === currenturl.slice(10)
        );

        // set header
        this.activeSite = currentlyLink;

        // set left link button
        this.leftOption = this.paths[2] === currentlyLink
        ? this.paths[0]
        : this.paths[2];

        // set right link button
        this.rightOption = this.paths[1] === currentlyLink
        ? this.paths[0] : this.paths[1];
    }

    switchSiteNav = (link: string) => {
        this.router.navigate([`./${link}`], { relativeTo: this.route });
    }
}
