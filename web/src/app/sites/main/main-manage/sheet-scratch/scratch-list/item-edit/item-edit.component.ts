import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemStructure } from 'src/app/shared/models/item-structure.model';
import { faSave, faTrashAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { Employees } from 'src/app/shared/models/employees.model';
import { NgForm } from '@angular/forms';
import { ItemStructureEdit } from 'src/app/sites/main/_models/item-structure-edit.model';

@Component({
  selector: 'app-item-edit',
  templateUrl: 'item-edit.component.html',
  styleUrls: [ 'item-edit.component.scss' ]
})

export class ItemEditComponent {
  @Input() ourItem: ItemStructure;
  @Input() indexOfElement: number;
  @Input() category: string[];
  @Input() employees: Employees[];

  @Output() deleteElement: EventEmitter<{ indexBackend: string, indexArr: number }> = new EventEmitter();

  @Output() editModeToggle: EventEmitter<number> = new EventEmitter();
  @Output() editElement: EventEmitter<{ newElement: ItemStructureEdit, ind: number }> = new EventEmitter();


  // icons
  faTrashAlt = faTrashAlt;
  faUndoAlt = faUndoAlt;
  faSave = faSave;

  deleteElementFunc = () => {
    this.deleteElement.emit({
      indexBackend: this.ourItem.id.toString(), indexArr: this.indexOfElement
    });
  };

  editElementFunc = (f: NgForm) => {
    const newElement = f.value as ItemStructureEdit;
    newElement.id = this.ourItem.id.toString();

    const readyElement = {newElement, ind: this.indexOfElement};
    this.editElement.emit(readyElement);
  };

  editElementModeToggleFunc = () => {
    this.editModeToggle.emit(this.indexOfElement);
  };
}
