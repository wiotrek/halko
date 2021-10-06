import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Employees } from '../../../../../shared/models/employees.model';
import { ItemStructureAdd } from '../../../_models/item-structure-add.model';

@Component({
  selector: 'app-scratch-adder',
  templateUrl: 'scratch-adder.component.html',
  styleUrls: [ 'scratch-adder.component.scss' ]
})

export class ScratchAdderComponent {
  @Input() setDanger?: boolean;
  @Input() category: string[];
  @Input() employees: Employees[];
  @Output() newElement: EventEmitter<ItemStructureAdd> = new EventEmitter();

  // icons
  faCheckCircle = faCheck;

  addElement(f: NgForm): void {
    const elementToAdd = f.value as ItemStructureAdd;
    this.newElement.emit(elementToAdd);
    f.controls.price.reset();
    f.controls.productName.reset();
  }
}
