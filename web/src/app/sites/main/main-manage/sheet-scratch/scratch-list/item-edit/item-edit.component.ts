import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemStructure } from 'src/app/sites/main/_models/item-structure.model';
import {
    faTrashAlt,
    faUndoAlt,
    faSave
} from '@fortawesome/free-solid-svg-icons';
import { Employees } from 'src/app/sites/main/_models/employees.model';


@Component({
    selector: 'app-item-edit',
    templateUrl: 'item-edit.component.html',
    styleUrls: ['item-edit.component.scss']
})

export class ItemEditComponent {
    @Input() ourItem: ItemStructure;
    @Input() category: string[];
    @Input() employees: Employees[];
    @Output() deleteElement: EventEmitter<ItemStructure> = new EventEmitter();
    @Output() editElement: EventEmitter<ItemStructure> = new EventEmitter();
    @Output() editModeToggle: EventEmitter<ItemStructure> = new EventEmitter();

    faTrashAlt = faTrashAlt;
    faUndoAlt = faUndoAlt;
    faSave = faSave;

    deleteElementFunc(item: ItemStructure): void {
        this.deleteElement.emit(item);
    }

    editElementFunc(newItemEdited: ItemStructure): void {
        console.log(newItemEdited);
    }

    editElementModeToggleFunc(item: ItemStructure): void {
        this.editModeToggle.emit(item);
    }
}
