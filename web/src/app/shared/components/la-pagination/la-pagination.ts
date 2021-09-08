import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';

@Component({
    selector: 'app-la-pagination',
    template: `
        <div class="pagination">

            <a class="pagination__prev"
                *ngIf="showPreviousSite"
                (click)="previousSite()"
            >
                poprzednia
            </a>

            <a class="pagination__next"
                *ngIf="showNextSite"
                (click)="nextSite()"
            >
                następna
            </a>

        </div>
    `,
    styleUrls: ['./la-pagination.scss']
})
export class LaPaginationComponent implements OnChanges {
    @Input() pageSize: number;
    @Input() elementsAmount: number;

    // two way binding
    @Input() pageIndex: number;
    @Output() pageIndexChange: EventEmitter<number> = new EventEmitter();

    // show buttons in template
    showPreviousSite = false;
    showNextSite = false;

    ngOnChanges(): void {
        this.showButtons();
    }

    previousSite(): void {
        this.pageIndex = this.pageIndex - 1;
        this.pageIndexChange.emit(this.pageIndex);
        this.showButtons();
    }

    nextSite(): void {
        this.pageIndex = this.pageIndex + 1;
        this.pageIndexChange.emit(this.pageIndex);
        this.showButtons();
    }

    private showButtons(): void {
        this.showPreviousSite = this.pageIndex > 1;
        this.showNextSite = this.pageIndex * this.pageSize < this.elementsAmount;
    }
}
