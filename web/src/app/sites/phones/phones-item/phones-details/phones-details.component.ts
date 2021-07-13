import { Component, Input } from '@angular/core';
import { ItemInList } from '../../_models/itemInList.model';

@Component({
    selector: 'app-phones-details',
    templateUrl: 'phones-details.component.html',
    styleUrls: ['phones-details.component.scss']
})
export class PhonesDetailsComponent {
    @Input() elInList: ItemInList;

    someModeIsActive = false;

    editMode = false;

    someModeIsActiveToggle = () => {
        this.editMode = !this.editMode;
        this.someModeIsActive = !this.someModeIsActive;
    }
}
