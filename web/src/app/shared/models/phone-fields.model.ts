export interface PhoneFieldsModel {
    category: string;
    polishName: string;
    isNumber: boolean;
    width?: string;
    onlyInDetails?: boolean;
    isMobileRwd?: boolean;
    override?: boolean;
    currency?: string;
    required?: boolean;
    special?: boolean;
    forOptSelect?: string[];
}
