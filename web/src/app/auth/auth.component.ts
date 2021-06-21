import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faHandPeace } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
    faHandPeace = faHandPeace;
    err: string = null;

    constructor(
        private router: Router,
        private authService: AuthService) {}

    ngOnInit(): void {
    }

    onSubmit(form: NgForm): void {
        if (!form.valid) { return; }

        this.authService.login(
            form.value.email,
            form.value.password
        ).subscribe(() => {
            this.router.navigate(['']);
        }, errMsg => {
            this.err = errMsg;
        });

        form.reset();
    }
}
