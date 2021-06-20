import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faHandPeace } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
    faHandPeace = faHandPeace;

    constructor(
        private authService: AuthService,
        private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.settingBgColor();
    }

    onSubmit(form: NgForm): void {
        console.log(form.value);
        form.reset();

        this.authService.login(
            form.value.login,
            form.value.password
        ).subscribe(res => console.log(res), err => console.log(err));
    }

    private settingBgColor = () => {
        this.elementRef.nativeElement.ownerDocument.body.style.background = '#F5FFFA';
    }
}
