class VacationModel {
    public vacationID:number;
    public destination:string;
    public description:string;
    public startDate:Date;
    public endDate:Date;
    public price:number;
    public imageName:string;
    public image: FileList;

    public static destinationValidation = {
        required: {value: true, message: "Please write a destination"},
        minLength: {value: 1, message: "Destination must be at least one character"},
        maxLength: {value: 100, message: "Destination can't be more than 100 characters"}
    }

    public static descriptionValidation = {
        required: {value: true, message: "Please write a description"},
        minLength: {value: 1, message: "Description must be at least one character"},
        maxLength: {value: 5000, message: "Description can't be over 5000 characters"}
    }

    public static startDateValidation = {
        required: {value: true, message: "Please pick start date"}
    }

    public static endDateValidation = {
        required: {value: true, message: "Please pick end date"}
    }

    public static priceValidation = {
        required: {value: true, message: "Please enter price"},
        min: {value: 1, message: "Price must be a positive number"}
    }
}

export default VacationModel;