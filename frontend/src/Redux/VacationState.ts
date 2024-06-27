import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// Global state
export class VacationState {
    public vacations: VacationModel[] = [];
}

// Action types
export const VacationsActionType = {
    GetVacations: "GetVacations",
    AddVacation: "AddVacation",
    UpdateVacation: "UpdateVacation",
    DeleteVacation: "DeleteVacation"
}

// Action
export interface VacationsAction {
    type: string,
    payload: any
}

// Reducer
export function vacationsReducer(currentState = new VacationState(), action:VacationsAction) : VacationState {
    const dupState = {...currentState}; // copy by refrence

    switch (action.type) {
        case VacationsActionType.GetVacations: // Payload is VacationModel[]
            dupState.vacations = action.payload;
            break;
    
        case VacationsActionType.AddVacation: // Payload is VacationModel
            dupState.vacations.push(action.payload);
            break;
    
        case VacationsActionType.UpdateVacation: // Payload is VacationModel
            dupState.vacations[dupState.vacations.findIndex(v => v.vacationID === action.payload.vacationID)] = action.payload;
            break;
    
        case VacationsActionType.DeleteVacation: // Payload is id (number)
            dupState.vacations.splice(dupState.vacations.findIndex(v => v.vacationID === action.payload), 1);
            break;
    }

    return dupState;
}

// Store
export const vacationsStore = createStore(vacationsReducer);