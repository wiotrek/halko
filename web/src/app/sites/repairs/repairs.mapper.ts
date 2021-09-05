import { RepairsApiGetModel } from './_models/repairs-api-get.model';
import { RepairsModel } from '../../shared/models/repairs.model';
import { RepairsAddApiPostModel } from './_models/repairs-add-api-post.model';
import { NgForm } from '@angular/forms';

export class RepairsMapper {

    // repairs list
    public static repairRawModelToRepairModel(repairPhoneRaw: RepairsApiGetModel): RepairsModel {
        const employerFirstName = repairPhoneRaw.participant.firstName;
        const employerLastName = repairPhoneRaw.participant.lastName;

        return {
            giveBackDate: repairPhoneRaw.giveBackDate,
            giveBackInfo: repairPhoneRaw.giveBackInfo,
            id: repairPhoneRaw.id,
            name: repairPhoneRaw.name,
            owner: repairPhoneRaw.owner,
            ownerContact: repairPhoneRaw.ownerContact,
            ownerCost: repairPhoneRaw.ownerCost,
            serviceCost: repairPhoneRaw.serviceCost,
            imei: repairPhoneRaw.imei,
            troubleDescription: repairPhoneRaw.troubleDescription,
            pointSubmitDate: repairPhoneRaw.pointSubmitDate,
            employer: employerFirstName + ' ' + employerLastName,
            point: repairPhoneRaw.participant.point.name
        };
    }

    // repairs add
    public static repairAddFormToApi(objForm: NgForm, point: string): RepairsAddApiPostModel {
        return {
            name: objForm.value.name,
            owner: objForm.value.owner,
            ownerContact: objForm.value.ownerContact,
            ownerCost: objForm.value.ownerCost,
            serviceCost: objForm.value.serviceCost,
            imei: objForm.value.imei,
            troubleDescription: objForm.value.troubleDescription,
            participant: {
                initial: objForm.value.employer,
                point: {
                    name: point
                }
            }
        } as RepairsAddApiPostModel;
    }
}
