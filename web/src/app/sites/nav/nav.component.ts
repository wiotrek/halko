import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { faBars, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Links } from 'src/app/shared/models/links.model';
import { User } from 'src/app/auth/_models/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
    faSignInAlt = faSignInAlt;
    faBars = faBars;

    // if something goes wrong, then assign default name
    singInUser = 'Punkt';

    links: Links[] = [
        { caption: 'Strona główna', path: '' },
        { caption: 'Spis telefonów', path: 'telefony' },
        { caption: 'Serwis', path: 'serwis' },
        { caption: 'Cennik', path: 'cennik' }
    ];

    subscription: Subscription;

    // Close dropdown outside button
    // getting dropdown element
    @ViewChild('dropDown') dropDown: any;

    // getting outside click to close dropdown
    @HostListener('document:click', ['$event'])
    closeDropdown(event: Event): void {
        if (!this.dropDown.isOpen) { return; }
        if (!this.ref.nativeElement.contains(event.target)) {
            this.dropDown.isOpen = false;
        }
    }

    constructor(
        private authService: AuthService,
        private ref: ElementRef
    ) {}

    ngOnInit(): void {
        this.subscription = this.authService.user.subscribe(
            (user: User) => {
                this.singInUser = user.displayName;

                // admin has own views
                if (user.displayName === 'Admin') {
                    this.links = [
                        { caption: 'Strona główna', path: 'admin' },
                        { caption: 'Spis telefonów', path: 'admin/telefony' },
                        { caption: 'Serwis', path: 'admin/serwis' },
                        { caption: 'Cennik', path: 'admin/cennik' }
                    ];
                }
            },
            () => this.singInUser = 'Punkt'
        );
    }

    logout(): void {
        this.subscription.unsubscribe();
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
