import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-items-sum',
    templateUrl: 'items-sum.component.html',
    styleUrls: ['items-sum.component.scss']
})

export class ItemsSumComponent {
    @Input() setDanger?: boolean;

    @Input() pageSize: number;
    @Input() arrLength: number;
    @Input() sum: number;

    // two way binding
    @Input() start: number;
    @Input() end: number;
    @Output() startChange: EventEmitter<number> = new EventEmitter();
    @Output() endChange: EventEmitter<number> = new EventEmitter();

    previousSite = () => {
        this.start = this.start - this.pageSize;
        this.end = this.end - this.pageSize;
        this.startChange.emit(this.start);
        this.endChange.emit(this.end);
    }

    nextSite = () => {
        this.start = this.start + this.pageSize;
        this.end = this.end + this.pageSize;
        this.startChange.emit(this.start);
        this.endChange.emit(this.end);
    }
}
