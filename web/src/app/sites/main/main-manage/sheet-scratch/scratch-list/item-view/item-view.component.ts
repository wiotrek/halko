import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { categoryIconColor } from 'src/app/sites/main/_dictionary/category-icon-color.dictionary';
import { categoryIcon } from 'src/app/sites/main/_dictionary/category-icon.dictionary';
import { ItemStructure } from 'src/app/sites/main/_models/item-structure.model';

@Component({
    selector: 'app-item-view',
    templateUrl: 'item-view.component.html',
    styleUrls: ['item-view.component.scss']
})

export class ItemViewComponent {
    @Input() OurItem: ItemStructure;
    @Output() editModeToggle: EventEmitter<number> = new EventEmitter();

    faEdit = faEdit;

    // suplies from dictionary
    categoryIcon = categoryIcon;
    categoryIconColor = categoryIconColor;

    editModeToggleFunc = (ind: number) => {
        this.editModeToggle.emit(ind);
    }
}
