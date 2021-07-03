import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemStructure } from './_models/item-structure.model';

@Injectable({providedIn: 'root'})
export class MainService {

    private testElements: ItemStructure[] = [
        {
            id: 0,
            initials: 'WK',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        },
        {
            id: 1,
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

    putElement(element: ItemStructure): void {
        const prevInArr = this.testElements.find(el =>  el.id === element.id);
        const indexInArr = this.testElements.indexOf(prevInArr);
        this.testElements[indexInArr] = element;
    }

    deleteElement(ind: number): void {
        this.testElements.splice(ind, 1);
    }
}
