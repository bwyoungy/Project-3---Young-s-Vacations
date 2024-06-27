import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/Config";
import { VacationsActionType, vacationsStore } from "../Redux/VacationState";

class VacationService {
    // Function to get all vacations
    public async getAllVacations():Promise<VacationModel[]> {
        // Get vacations from redux store
        let vacations = vacationsStore.getState().vacations;

        // Check if any vacations were in redux store
        if (vacations.length === 0 ) {
            // If no vacations in redux store, get vacations from backend using API call
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
            // Update vacations with vacations from backend
            vacations = response.data;
            // Add vacations to redux store
            vacationsStore.dispatch({type: VacationsActionType.GetVacations, payload: response.data});
        }
        
        return vacations;
    }

    // Function to get vacation by id
    public async getVacationById(id:number):Promise<VacationModel> {
        // Get all vacations from redux store
        let vacations = vacationsStore.getState().vacations;
        // Find specific vacation based on id
        let vacation = vacations.find(v => v.vacationID === id);

        // Check if vacation  found in redux store
        if(!vacation) {
            // If vacation not in redux store, get vacation from backend using API call
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);
            // Update vacation with info from backend
            vacation = response.data;
        }
        
        return vacation;
    }

    // Function to add new vacation
    public async addVacation(vacation:VacationModel):Promise<void> {
        // Build form data (to work with files)
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("startDate", vacation.startDate.toString());
        myFormData.append("endDate", vacation.endDate.toString());
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]);

        // Add vacation using API call
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData);
        // Add vacation returned from backend (with auto-id, etc.) to redux store
        vacationsStore.dispatch({type: VacationsActionType.AddVacation, payload:response.data});
    }

    // Function to update vacation
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

        // Update vacation using API call to backend
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationID, myFormData);
        // Update vacation in redux store using updated vacation returned from backend
        vacationsStore.dispatch({type: VacationsActionType.UpdateVacation, payload:response.data});
    }

    // Function to delete vacation
    public async deleteVacation(id:number): Promise<void> {
        // Delete vacation using API call to backend
        await axios.delete<void>(appConfig.vacationsUrl + id);
        // Delete vacation in redux store
        vacationsStore.dispatch({type: VacationsActionType.DeleteVacation, payload: id});
    }
}

const vacationService = new VacationService(); // Singleton

export default vacationService;