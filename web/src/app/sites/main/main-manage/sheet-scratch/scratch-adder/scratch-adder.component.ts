import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Employees } from '../../../_models/employees.model';
import { ItemStructure } from '../../../_models/item-structure.model';

@Component({
    selector: 'app-scratch-adder',
    templateUrl: 'scratch-adder.component.html',
    styleUrls: ['scratch-adder.component.scss']
})

export class ScratchAdderComponent {
    @Input() category: string[];
    @Input() employees: Employees[];
    @Output() newElement: EventEmitter<ItemStructure> = new EventEmitter();

    // icons
    faCheckCircle = faCheck;

    addElement(f: NgForm): void {
        const elementToAdd = f.value as ItemStructure;
        this.newElement.emit(elementToAdd);

        f.controls.price.reset();
        f.controls.name.reset();
    }
}
