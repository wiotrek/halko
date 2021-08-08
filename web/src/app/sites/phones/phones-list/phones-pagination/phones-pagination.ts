import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-phones-pagination',
    template: `
        <div class="pagination">

            <a class="pagination__prev"
                *ngIf="end - pageSize > 0"
                (click)="previousSite()"
            >poprzednia</a>

            <a class="pagination__next"
                *ngIf="start + pageSize < arrLength"
                (click)="nextSite()"
            >następna</a>

        </div>
    `,
    styleUrls: ['./phones-pagination.scss']
})
export class PhonesPaginationComponent {
    @Input() pageSize: number;
    @Input() arrLength: number;

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
