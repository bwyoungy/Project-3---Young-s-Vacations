import { createStore } from "redux";
import FollowModel from "../Models/FollowModel";

// Global state
export class FollowState {
    public follows: FollowModel[] = [];
}

// Action types
export const FollowsActionType = {
    GetFollowsByUser: "GetFollowsByUser",
    AddFollow: "AddFollow",
    Unfollow: "Unfollow"
}

// Action
export interface FollowsAction {
    type: string,
    payload: any
}

// Reducer
export function followsReducer(currentState = new FollowState(), action:FollowsAction) : FollowState {
    const dupState = {...currentState}; // copy by refrence

    switch (action.type) {
        case FollowsActionType.GetFollowsByUser: // Payload is FollowModel[]
            dupState.follows = action.payload;
            break;
    
        case FollowsActionType.AddFollow: // Payload is FollowModel
            dupState.follows.push(action.payload);
            break;
    
        case FollowsActionType.Unfollow: // Payload is FollowModel
            dupState.follows.splice(dupState.follows.findIndex(f => f.vacationID === action.payload.vacationID && f.username === action.payload.username), 1);
            break;
    }

    return dupState;
}

// Store
export const followsStore = createStore(followsReducer);