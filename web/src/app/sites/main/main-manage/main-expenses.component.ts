import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';
import { CategoryItemExpensesArray } from '../_array/category-item-expenses.array';
import { EmployeesInitialArray } from '../_array/employees-initial.array';
import { Employees } from 'src/app/shared/models/employees.model';
import { ItemStructureAdd } from '../_models/item-structure-add.model';
import { ItemStructureEdit } from '../_models/item-structure-edit.model';
import { ItemStructure } from 'src/app/shared/models/item-structure.model';

@Component({
  selector: 'app-main-expenses',
  templateUrl: 'sheet-scratch/sheet-template/sheet-template.html',
  styleUrls: [ 'sheet-scratch/sheet-template/sheet-template.scss' ]
})

export class MainExpensesComponent implements OnInit, OnDestroy {
  // if choice date is equal with today, then is edit mode on
  @Input() editModeOn = true;

  title = 'Wydatki';
  isSetDanger = true;

  subscription: Subscription;

  items: ItemStructure[];

  category = CategoryItemExpensesArray;

  // assign default values
  employees: Employees[] = EmployeesInitialArray;

  // if element is -1 then none is editing
  currentlyEditedElement = -1;

  // pagination
  readonly pageSize = 5;
  start = 0;
  end = 5;

  sum: number;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getElements();
    this.displaySum();
  }

  editElementModeToggleFunc = (ind: number) =>
    this.currentlyEditedElement = ind === this.currentlyEditedElement
      ? -1 : ind

  addNewElementFunc = (newElement: ItemStructureAdd) => {
    this.mainService.addNewExpenseItem(newElement);
  }

  editElementFunc(elementToEdit: { newElement: ItemStructureEdit, ind: number }): void {
    this.mainService.EditExpenseItem(elementToEdit.newElement, elementToEdit.ind);
    this.currentlyEditedElement = -1;
  }

  deleteElementFunc = (el: { indexBackend: string, indexArr: number }) => {
    this.mainService.removeExpenseItem(
      el.indexBackend, el.indexArr
    );

    // because next element inherit edited
    this.currentlyEditedElement = -1;
  }

  private getEmployees(): void {
    this.subscription = this.mainService.getEmployees()
      .subscribe(
        (res: Employees[]) => this.employees = res,
        () => this.employees = EmployeesInitialArray
      );
  }

  private getElements(): void {
    this.mainService.expensesItem$.subscribe(
      (res: ItemStructure[]) => this.items = res
    );
  }

  private displaySum(): void {
    this.mainService.displayExpensesSum().subscribe(
      res => this.sum = res
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
