import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemStructure } from './_models/item-structure.model';

@Injectable({providedIn: 'root'})
export class MainService {

    private testElements: ItemStructure[] = [
        {
            initials: 'WK',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        },
        {
            initials: 'WK',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        }
    ];

    getElements(): Observable<ItemStructure[]> {
        return new Observable(
            observer => observer.next(this.testElements)
        );
    }

    postElement(el: ItemStructure): void {
        this.testElements.unshift(el);
    }

    putElement(editedElement: ItemStructure, indElement: number): void {
        this.testElements[indElement] = editedElement;
    }

    deleteElement(ind: number): void {
        this.testElements.splice(ind, 1);
    }
}
