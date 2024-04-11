import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/Config";

class VacationService {
    public async getAllVacations():Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
        return response.data;
    }

    public async getVacationById(id:number):Promise<VacationModel> {
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);
        
        return response.data;
    }

    public async addVacation(vacation:VacationModel):Promise<void> {
        // const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation);
    }
}

const vacationService = new VacationService();

export default vacationService;