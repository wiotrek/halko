import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    TemplateRef
} from '@angular/core';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { PhoneInListType } from '../../models-union/phone-in-list.type';
import { NgForm } from '@angular/forms';
import { PhoneModel } from '../../models/phone.model';
import { PhonesExtendResultsModel } from './_models/phones-extend-results.model';
import { OperationsNameEnum } from './_enums/operations-name.enum';

@Component({
    selector: 'app-phones-extend',
    templateUrl: './phones-extend.component.html',
    styleUrls: ['./phones-extend.component.scss']
})
export class PhonesExtendComponent {
    @Input() elInList: PhoneInListType;

    // list of point getting from phone list
    @Input() additionally: any | string[];

    @Output() componentBeingUsingOutput: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('sellPhone', { static: true })
    sellPhone: TemplateRef<any> | null = null;

    @ViewChild('movePhone', { static: true })
    movePhone: TemplateRef<any> | null = null;

    // phone icon
    faMobileAlt = faMobileAlt;

    choiceButton = true;
    showBlock: TemplateRef<any> | null = null;

    switchBlock(nameOfBlock?: string): void {
        switch (nameOfBlock) {
            case 'sellPhone':
                this.showBlock = this.sellPhone;
                break;
            case 'movePhone':
                this.showBlock = this.movePhone;
                break;
            default:
                this.showBlock = null;
                break;
        }
        this.choiceButton = !this.choiceButton;
    }

    sellPhoneFunc(f: NgForm): void {
        if (f.value.price < 1) { return; }

        const phone = this.elInList as PhoneModel;

        const sendToPhonesList: PhonesExtendResultsModel = {
            phoneId: phone.id,
            operationName: OperationsNameEnum.sellPhone,
            priceSold: f.value.price,
        };
        this.componentBeingUsingOutput.emit(sendToPhonesList);
    }

    transferPhoneFunc(f: NgForm): void {
        const phone = this.elInList as PhoneModel;

        const sendToPhonesList: PhonesExtendResultsModel = {
            phoneId: phone.id,
            operationName: OperationsNameEnum.movePhone,
            pointName: f.value.point,
        };
        this.componentBeingUsingOutput.emit(sendToPhonesList);
    }
}
