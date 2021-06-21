import { Component, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faHandPeace } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    isLoadingSpinner = false;
    faHandPeace = faHandPeace;
    err: string = null;

    constructor(
        private router: Router,
        private authService: AuthService) {}

    @HostListener('click') onClick(): void {
        this.err = null;
    }

    onSubmit(form: NgForm): void {
        if (!form.valid) { return; }

        this.isLoadingSpinner = true;

        this.authService.login(
            form.value.email,
            form.value.password
        ).subscribe(() => {
            this.router.navigate(['']);
            this.isLoadingSpinner = false;
        }, errMsg => {
            this.err = errMsg;
            this.isLoadingSpinner = false;
        });

        form.reset();
    }
}
