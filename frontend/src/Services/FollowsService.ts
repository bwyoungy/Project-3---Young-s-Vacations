import axios from "axios";
import FollowModel from "../Models/FollowModel";
import appConfig from "../Utils/Config";
import { FollowsActionType, followsStore } from "../Redux/FollowState";

class FollowService {
    public async getFollowsByUser(username:string):Promise<FollowModel[]> {
        let follows = followsStore.getState().follows;

        if (follows.length === 0) {
            const response = await axios.get<FollowModel[]>(appConfig.followsUrl + username);
            followsStore.dispatch({type: FollowsActionType.GetFollowsByUser, payload: response.data});
        }

        return follows;
    }
    
    public async addFollow(follow:FollowModel):Promise<void> {
        const response = await axios.post<FollowModel>(appConfig.followsUrl, follow);

        followsStore.dispatch({type: FollowsActionType.AddFollow, payload:response.data});
    }

    public async unfollow(follow:FollowModel):Promise<void> {
        await axios.delete<void>(appConfig.followsUrl + follow.vacationID + "/" + follow.username);

        followsStore.dispatch({type: FollowsActionType.Unfollow, payload: follow});
    }
}

const followService = new FollowService();

export default followService;