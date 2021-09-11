import { Type } from '@angular/core';
import { Dictionary } from 'src/app/shared/models/dictionary.model';
import { RepairsToArchiveComponent } from '../components-specific/repairs-to-archive/repairs-to-archive.component';
import {PhonesExtendComponent} from '../components-specific/phones-extend/phones-extend.component';

export const PhoneInListDetailsCptsArray: Dictionary<Type<PhoneInListDetailsCptsType>> = {
    RepairsToArchiveComponent,
    PhonesExtendComponent
};

// is here because, if will be in models-union, then it will be easy
// way to forget change
export type PhoneInListDetailsCptsType
    = RepairsToArchiveComponent
    | PhonesExtendComponent;
