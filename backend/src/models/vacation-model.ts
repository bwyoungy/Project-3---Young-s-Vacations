import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import FollowModel from "./follow-model";

class VacationModel {
    public vacationID: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public imageName: string;
    public image?: UploadedFile;
    public follows: FollowModel[];

    public constructor(vacation:VacationModel) {
        this.vacationID = vacation.vacationID;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.follows = vacation.follows;
    }

    private static validationScheme = Joi.object({
        vacationID: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(1).max(100),
        description: Joi.string().required().min(1).max(5000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().greater(Joi.ref('startDate')),
        price: Joi.number().required().positive().integer(),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
        follows: Joi.array().optional()
    });

    public validate():string {
        const result = VacationModel.validationScheme.validate(this);
        return result.error?.message;
    }
}

export default VacationModel;