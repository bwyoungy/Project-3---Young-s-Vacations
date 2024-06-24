import Joi from "joi";

class FollowModel {
    public username:string;
    public vacationID:number;

    public constructor(follow:FollowModel) {
        this.username = follow.username;
        this.vacationID = follow.vacationID;
    }

    private static validationScheme = Joi.object({
        username: Joi.string().required().min(3).max(50),
        vacationID: Joi.number().required().positive().integer()
    });

    public validate():string {
        const reuslt = FollowModel.validationScheme.validate(this);
        return reuslt.error?.message;
    }
}

export default FollowModel;