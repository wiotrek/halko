import { RepairsRawModel } from './_models/repairs-raw.model';
import {RepairsModel} from '../../shared/models/repairs.model';

export class RepairsMapper {
    public static repairRawModelToRepairModel(repairPhoneRaw: RepairsRawModel): RepairsModel {
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
}
