import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

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
export class LaPaginationComponent implements OnInit{
    @Input() pageSize: number;
    @Input() amount: number;

    // two way binding
    @Input() pageIndex: number;
    @Output() pageIndexChange: EventEmitter<number> = new EventEmitter();

    // show buttons in template
    showPreviousSite = false;
    showNextSite = false;

    ngOnInit(): void {
        this.showButtons();
        console.log(this.amount);
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
        this.showNextSite = this.pageIndex * this.pageSize < this.amount;
    }
}
