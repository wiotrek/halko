import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemStructure } from 'src/app/sites/main/_models/item-structure.model';
import { faTrashAlt, faUndoAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { Employees } from 'src/app/sites/main/_models/employees.model';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app-item-edit',
    templateUrl: 'item-edit.component.html',
    styleUrls: ['item-edit.component.scss']
})

export class ItemEditComponent {
    @Input() ourItem: ItemStructure;
    @Input() category: string[];
    @Input() employees: Employees[];
    @Output() deleteElement: EventEmitter<number> = new EventEmitter();
    @Output() editElement: EventEmitter<ItemStructure> = new EventEmitter();
    @Output() editModeToggle: EventEmitter<number> = new EventEmitter();

    // icons
    faTrashAlt = faTrashAlt;
    faUndoAlt = faUndoAlt;
    faSave = faSave;

    deleteElementFunc = (ind: number) => {
        this.deleteElement.emit(ind);
    }

    editElementFunc = (f: NgForm, ind: number) => {
        const editedElement = f.value as ItemStructure;
        editedElement.id = ind;
        this.editElement.emit(editedElement);
    }

    editElementModeToggleFunc = (ind: number) => {
        this.editModeToggle.emit(ind);
    }
}
