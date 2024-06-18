import Joi from "joi";

class CredentialsModel {
    public username:string;
    public password:string;
    
    public constructor(credentials:CredentialsModel) {
        this.username = credentials.username;
        this.password = credentials.password;
    }

    private static validationScheme = Joi.object({
        username: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(8).max(100)
    });
    
    public validate():string {
        const result = CredentialsModel.validationScheme.validate(this);
        return result.error?.message;
    }
}

export default CredentialsModel;