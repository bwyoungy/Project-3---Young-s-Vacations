import RoleModel from "./RoleModel";

class UserModel {
    public username:string;
    public email:string;
    public firstName:string;
    public lastName:string;
    public password:string;
    public role:RoleModel;

    public static usernameValidation = {
        required: {value: true, message: "Please write a username"},
        minLength: {value: 1, message: "Username must be at least one character"},
        maxLength: {value: 50, message: "Username can't be more than 50 characters"}
    }

    public static emailValidation = {
        required: {value: true, message: "Please write an email"},
        minLength: {value: 1, message: "Email must be at least one character"},
        maxLength: {value: 100, message: "Email can't be more than 100 characters"}
    }

    public static firstNameValidation = {
        required: {value: true, message: "Please write a first name"},
        minLength: {value: 1, message: "First name must be at least one character"},
        maxLength: {value: 100, message: "First name can't be more than 100 characters"}
    }

    public static lastNameValidation = {
        required: {value: true, message: "Please write a last name"},
        minLength: {value: 1, message: "Last name must be at least one character"},
        maxLength: {value: 100, message: "Last name can't be more than 100 characters"}
    }

    public static passwordValidation = {
        required: {value: true, message: "Please write a password"},
        minLength: {value: 1, message: "Password must be at least one character"},
        maxLength: {value: 500, message: "Password can't be more than 500 characters"}
    }
}

export default UserModel;