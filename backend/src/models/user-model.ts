import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {
    public username:string;
    public email:string;
    public firstName:string;
    public lastName:string;
    public password:string;
    public role:RoleModel;

    public constructor(user:UserModel) {
        this.username = user.username;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.password = user.password;
        this.role = user.role;
    }

    private static validationScheme = Joi.object({
        username: Joi.string().required().min(3).max(50),
        email: Joi.string().required().email({minDomainSegments: 2, tlds: {allow: true}}).min(7).max(100),
        firstName: Joi.string().required().min(1).max(100),
        lastName: Joi.string().required().min(1).max(100),
        password: Joi.string().required().min(8).max(100),
        role: Joi.string().required().valid("user", "admin")
    });
    
    public validate():string {
        const result = UserModel.validationScheme.validate(this);
        return result.error?.message;
    }
    
}


export default UserModel;