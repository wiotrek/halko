import { PhoneModel } from 'src/app/shared/models/phone.model';
import { SortingValueArray } from 'src/app/shared/components/searcher/_arrays/sorting-value.array';
import { SortingVectorModel } from 'src/app/shared/components/searcher/_models/sorting-vector.model';

export class SortingPhonesClass {

    public static sortingPhonesFunc(
        phoneList: PhoneModel[],
        sorted: SortingVectorModel
    ): PhoneModel[] {

        switch (sorted) {

            case SortingValueArray[0]:
                return phoneList.sort(
                    (a, b) => a.producer.localeCompare(b.producer)
                );

            case SortingValueArray[1]:
                return phoneList.sort(
                    (a, b) => b.producer.localeCompare(a.producer)
                );

            case SortingValueArray[2]:
                return phoneList.sort(
                    (a, b) => a.price - b.price
                );

            case SortingValueArray[3]:
                return phoneList.sort(
                    (a, b) => b.price - a.price
                );

            default:
                return phoneList.sort(
                    (a, b) => a.producer.localeCompare(b.producer)
                );
        }
    }
}
