import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';
import { CategoryItemSoldsArray } from '../_array/catogory-item-solds.array';
import { EmployeesInitialArray } from '../_array/employees-initial.array';
import { Employees } from 'src/app/shared/models/employees.model';
import { ItemStructureAdd } from '../_models/item-structure-add.model';
import { ItemStructureEdit } from '../_models/item-structure-edit.model';
import { ItemStructure } from 'src/app/shared/models/item-structure.model';

@Component({
  selector: 'app-main-sales',
  templateUrl: 'sheet-scratch/sheet-template/sheet-template.html',
  styleUrls: [ 'sheet-scratch/sheet-template/sheet-template.scss' ]
})
export class MainSalesComponent implements OnInit, OnDestroy {
  title = 'Sprzedaż';
  isSetDanger = false;

  private subscription: Subscription;

  items: ItemStructure[];

  category = CategoryItemSoldsArray;

  // assign default names
  employees: Employees[] = EmployeesInitialArray;

  // if element is -1 then none is editing
  currentlyEditedElement = -1;

  // pagination
  readonly pageSize = 5;
  start = 0;
  end = 5;

  sum: number;

  // if choice date is equal with today, then is edit mode on
  editModeOn = true;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getElements();
    this.displaySum();
    this.checkChoiceDate();
  }

  editElementModeToggleFunc = (ind: number) =>
    this.currentlyEditedElement = ind === this.currentlyEditedElement
      ? -1 : ind

  addNewElementFunc = (newElement: ItemStructureAdd) =>
    this.mainService.addNewSoldItem(newElement)


  editElementFunc(elementToEdit: { newElement: ItemStructureEdit, ind: number }): void {
    this.mainService.EditSoldItem(elementToEdit.newElement, elementToEdit.ind);
    this.currentlyEditedElement = -1;
  }

  deleteElementFunc = (el: { indexBackend: string, indexArr: number }) => {
    this.mainService.removeSoldItem(
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
    this.mainService.soldsItem$.subscribe(
      (res: ItemStructure[]) => this.items = res
    );
  }

  private displaySum(): void {
    this.mainService.displaySoldsSum().subscribe(
      res => this.sum = res
    );
  }

  private checkChoiceDate(): void {
    this.mainService.editModeOn.subscribe(res => {
      this.editModeOn = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
