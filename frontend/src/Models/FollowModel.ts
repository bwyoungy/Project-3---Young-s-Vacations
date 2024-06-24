class FollowModel {
    public username:string;
    public vacationID:number;

    public constructor(username:string, vacationID:number) {
        this.username = username;
        this.vacationID = vacationID;
    }

    public static usernameValidation = {
        required: {value: true, message: "Please write a username"},
        minLength: {value: 1, message: "Username must be at least one character"},
        maxLength: {value: 50, message: "Username can't be more than 50 characters"}
    }

    public static vacationIDValidation = {
        required: {value: true, message: "Please write a vacation ID"}
    }
}

export default FollowModel;