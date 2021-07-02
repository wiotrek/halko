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

    postElement(el: ItemStructure): any {
        this.testElements.unshift(el);
    }

    putElement(el: ItemStructure, prevEl: ItemStructure): void {
        const index = this.testElements.indexOf(prevEl);
        this.testElements[index] = el;
    }

    deleteElement(ind: number): any {
        this.testElements.splice(ind, 1);
    }
}
