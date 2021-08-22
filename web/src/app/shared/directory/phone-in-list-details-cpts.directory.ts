import { Type } from '@angular/core';
import { Dictionary } from 'src/app/shared/models/dictionary.model';
import { RepairsToArchiveComponent } from '../components/repairs/repairs-to-archive/repairs-to-archive.component';

export const PhoneInListDetailsCptsDirectory: Dictionary<Type<PhoneInListDetailsCptsType>> = {
    RepairsToArchiveComponent
};

// is here because, if will be in models-union, then it will be easy
// way to forget change
export type PhoneInListDetailsCptsType
    = RepairsToArchiveComponent;
