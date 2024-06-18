class CredentialsModel {
    public username:string;
    public password:string;

    public static usernameValidation = {
        required: {value: true, message: "Please write a username"},
        minLength: {value: 1, message: "Username must be at least one character"},
        maxLength: {value: 50, message: "Username can't be more than 50 characters"}
    }

    public static passwordValidation = {
        required: {value: true, message: "Please write a password"},
        minLength: {value: 1, message: "Password must be at least one character"},
        maxLength: {value: 500, message: "Password can't be more than 500 characters"}
    }

}

export default CredentialsModel;