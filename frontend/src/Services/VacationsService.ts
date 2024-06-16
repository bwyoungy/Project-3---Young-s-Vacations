import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/Config";
import { VacationsActionType, vacationsStore } from "../Redux/VacationState";

class VacationService {
    public async getAllVacations():Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0 ) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
            vacationsStore.dispatch({type: VacationsActionType.GetVacations, payload: response.data});
        }
        
        return vacations;
    }

    public async getVacationById(id:number):Promise<VacationModel> {
        let vacations = vacationsStore.getState().vacations;
        let vacation = vacations.find(v => v.vacationID === id);

        if(!vacation) {
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);
            vacation = response.data;
        }
        
        return vacation;
    }

    public async addVacation(vacation:VacationModel):Promise<void> {
        // Build form data (to work with files)
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("startDate", vacation.startDate.toString());
        myFormData.append("endDate", vacation.endDate.toString());
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]);

        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData);

        vacationsStore.dispatch({type: VacationsActionType.AddVacation, payload:response.data});
    }

    public async updateVacation(vacation:VacationModel): Promise<void> {
        // Build form data (to work with files)
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("startDate", vacation.startDate.toString());
        myFormData.append("endDate", vacation.endDate.toString());
        myFormData.append("price", vacation.price.toString());
        // Check if image was provided and append to data
        if (vacation.image?.[0]) myFormData.append("image", vacation.image[0]);
        // Otherwise append imageName
        else myFormData.append("imageName", vacation.imageName);

        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationID, myFormData);

        vacationsStore.dispatch({type: VacationsActionType.UpdateVacation, payload:response.data});
    }

    public async deleteVacation(id:number): Promise<void> {
        await axios.delete<void>(appConfig.vacationsUrl + id);

        vacationsStore.dispatch({type: VacationsActionType.DeleteVacation, payload: id});
    }
}

const vacationService = new VacationService();

export default vacationService;