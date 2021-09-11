import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    TemplateRef
} from '@angular/core';
import { PhoneInListType } from '../../models-union/phone-in-list.type';
import { RepairsModel } from '../../models/repairs.model';

@Component({
    selector: 'app-phones-extend',
    templateUrl: './phones-extend.component.html',
    styleUrls: ['./phones-extend.component.scss']
})
export class PhonesExtendComponent {
    @Input() elInList: PhoneInListType | RepairsModel;
    @Output() messageBack: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(
        'sellPhone', { static: true }
    ) sellPhone: TemplateRef<any> | null = null;

    @ViewChild(
        'movePhone', { static: true }
    ) movePhone: TemplateRef<any> | null = null;

    choiceButton = true;
    showBlock: TemplateRef<any> | null = null;

    switchBlock(nameOfBlock: string): void {

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
}
