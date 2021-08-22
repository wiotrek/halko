import { Type } from '@angular/core';
import { Dictionary } from 'src/app/shared/models/dictionary.model';
import { RepairsToArchiveComponent } from '../components/repairs/repairs-to-archive/repairs-to-archive.component';

export const PhoneInListDetailsCptsDirectory: Dictionary<Type<RepairsToArchiveType>> = {
    RepairsToArchiveComponent
};

export type RepairsToArchiveType
    = RepairsToArchiveComponent;
