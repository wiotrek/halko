import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemStructure } from './_models/item-structure.model';

@Injectable({providedIn: 'root'})
export class MainService {

    private testElements: ItemStructure[] = [
        {
            initials: 'KB',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        },
        {
            initials: 'KB',
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

    deleteElement(ind: number): any {
        this.testElements.splice(ind, 1);
    }
}
