import {
    Component,
    Input,
    ViewChild,
    ComponentFactoryResolver,
    ViewContainerRef,
    AfterViewInit,
    Injector,
    Type,
    ChangeDetectorRef,
    Output,
    EventEmitter
} from '@angular/core';
import { PhoneInListDetailsCptsType } from 'src/app/shared/array/phone-in-list-details-cpts.array';
import { PhoneInListType } from 'src/app/shared/models-union/phone-in-list.type';
import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

@Component({
    selector: 'app-phone-in-list-details',
    templateUrl: 'phone-in-list-details.component.html',
    styleUrls: ['phone-in-list-details.component.scss']
})
export class PhoneInListDetailsComponent implements AfterViewInit {
    @Input() deviceFields: PhoneFieldsModel[];
    @Input() elInList: PhoneInListType;

    // variable for which will be assign name component
    @Input() componentWillUsing?: Type<PhoneInListDetailsCptsType>;
    @Output() componentBeingUsingOutput: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('optComponent', { read: ViewContainerRef }) optComponent: ViewContainerRef;

    constructor(
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver,
        private cdref: ChangeDetectorRef
    ) {}

    ngAfterViewInit(): void {

        if (this.componentWillUsing) {

            // prepare choosen component to display on template
            const factory = this.componentFactoryResolver.resolveComponentFactory(
                this.componentWillUsing
            );

            const componentRef = factory.create(this.injector);

            componentRef.instance.elInList = this.elInList;

            componentRef.instance.messageBack.subscribe(
                res => {
                    this.componentBeingUsingOutput.emit(res);
                }
            );

            const view = componentRef.hostView;

            // setting chosen component to ng-container #optComponent
            this.optComponent.insert(view);

            // without this function, appear error - ExpressionChangedAfterItHasBeenCheckedError
            // because event loop is mistaken
            this.cdref.detectChanges();
        }
    }
}
