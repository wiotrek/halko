import { PhoneModel } from 'src/app/sites/phones/_models/phone.model';
import { SortingValueConst } from 'src/app/shared/components/searcher/_consts/sorting-value.const';
import { SortingVectorModel } from 'src/app/shared/components/searcher/_models/sorting-vector.model';

export class SortingPhonesClass {

    public static sortingPhonesFunc(
        phoneList: PhoneModel[],
        sorted: SortingVectorModel
    ): PhoneModel[] {

        switch (sorted) {

            case SortingValueConst[0]:
                return phoneList.sort(
                    (a, b) => a.producer.localeCompare(b.producer)
                );

            case SortingValueConst[1]:
                return phoneList.sort(
                    (a, b) => b.producer.localeCompare(a.producer)
                );

            case SortingValueConst[2]:
                return phoneList.sort(
                    (a, b) => a.price - b.price
                );

            case SortingValueConst[3]:
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
