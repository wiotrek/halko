import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ItemInListModel } from '../../../_models/item-in-list.model';

@Component({
    selector: 'app-phones-details',
    templateUrl: 'phones-details.component.html',
    styleUrls: ['phones-details.component.scss']
})
export class PhonesDetailsComponent implements OnInit{
    @Input() elInList: ItemInListModel;

    // these elements will replacement each other
    @ViewChild(
        'viewAndEditPhone', { static: true }
    ) viewAndEditPhone: TemplateRef<any> | null = null;

    @ViewChild(
        'soldPhone', { static: true }
    ) soldPhone: TemplateRef<any> | null = null;

    @ViewChild(
        'sendPhone', { static: true }
    ) sendPhone: TemplateRef<any> | null = null;

    // block which any elements will replace
    showBlock: TemplateRef<any>|null = null;
    show = true;

    undoButtonActive = false;
    editMode = false;

    ngOnInit(): void {
        this.showBlock = this.viewAndEditPhone;
    }

    switchBlock(nameOfBlock: string): void {

        switch (nameOfBlock) {
            case 'viewAndEditPhone':
                this.showBlock = this.viewAndEditPhone;
                this.editMode = true;
                break;
            case 'soldPhone':
                this.showBlock = this.soldPhone;
                break;
            case 'sendPhone':
                this.showBlock = this.sendPhone;
                break;
            case 'back':
                this.showBlock = this.viewAndEditPhone;
                this.editMode = false;
                break;
        }

        this.undoButtonActive = !this.undoButtonActive;
    }
}
