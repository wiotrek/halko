import { Component, ElementRef, OnInit } from '@angular/core';
import { faHandPeace } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
    faHandPeace = faHandPeace;

    constructor(
        private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.settingBgColor();
    }

    private settingBgColor = () => {
        this.elementRef.nativeElement.ownerDocument.body.style.background = '#008B8B';
    }
}
