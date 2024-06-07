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
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation);

        vacationsStore.dispatch({type: VacationsActionType.AddVacation, payload:response.data});
    }

    public async updateVacation(vacation:VacationModel): Promise<void> {
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationID, vacation);

        vacationsStore.dispatch({type: VacationsActionType.UpdateVacation, payload:response.data});
    }

    public async deleteVacation(id:number): Promise<void> {
        await axios.delete<void>(appConfig.vacationsUrl + id);

        vacationsStore.dispatch({type: VacationsActionType.DeleteVacation, payload: id});
    }
}

const vacationService = new VacationService();

export default vacationService;