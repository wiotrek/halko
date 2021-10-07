import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { CategoryIconColorDictionary } from 'src/app/sites/main/_dictionary/category-icon-color.dictionary';
import { CategoryIconDictionary } from 'src/app/sites/main/_dictionary/category-icon.dictionary';
import { ItemStructure } from 'src/app/shared/models/item-structure.model';

@Component({
  selector: 'app-item-view',
  templateUrl: 'item-view.component.html',
  styleUrls: [ 'item-view.component.scss' ]
})

export class ItemViewComponent {
  @Input() ourItem: ItemStructure;
  @Input() indexOfElement: number;
  @Input() editModeOn = true;
  @Output() editModeToggle: EventEmitter<number> = new EventEmitter();

  faEdit = faEdit;

  // supplies from dictionary
  categoryIcon = CategoryIconDictionary;
  categoryIconColor = CategoryIconColorDictionary;

  editModeToggleFunc = (ind: number) => {
    this.editModeToggle.emit(ind);
  }
}
