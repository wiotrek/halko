import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-scratch-header',
    template: `<h1 class="header">{{title}}</h1>`,
    styleUrls: ['scratch-header.component.scss']
})

export class ScratchHeaderComponent {
    @Input() title: string;
}
