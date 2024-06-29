import axios from "axios";
import FollowModel from "../Models/FollowModel";
import appConfig from "../Utils/Config";
import { FollowsActionType, followsStore } from "../Redux/FollowState";

class FollowService {
    // Function to get all follows of a user
    public async getFollowsByUser(username:string):Promise<FollowModel[]> {
        // Get follows from redux store
        let follows = followsStore.getState().follows;

        // Check if got anything from store
        if (follows.length === 0) {
            // If follows not in store, get them from backend using API call
            const response = await axios.get<FollowModel[]>(appConfig.followsUrl + username);
            // Update follows with the data from backend
            follows = response.data;
            // Send data to store to update redux
            followsStore.dispatch({type: FollowsActionType.GetFollowsByUser, payload: response.data});
        }

        return follows;
    }
    
    // Function to add new follow
    public async addFollow(follow:FollowModel):Promise<void> {
        // Add new follow using API call
        const response = await axios.post<FollowModel>(appConfig.followsUrl, follow);
        // Add new follow to redux store
        followsStore.dispatch({type: FollowsActionType.AddFollow, payload:response.data});
    }

    // Function to delete follow
    public async unfollow(follow:FollowModel):Promise<void> {
        // Delete follow using API call
        await axios.delete<void>(appConfig.followsUrl + follow.vacationID + "/" + follow.username);
        // Delete follow from redux store
        followsStore.dispatch({type: FollowsActionType.Unfollow, payload: follow});
    }
}

const followService = new FollowService(); // Singleton

export default followService;