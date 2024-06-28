import { Notyf } from "notyf";

class NotifyService {
    private notification = new Notyf({duration: 5000, position: {x:"left", y:"bottom"}});
    
    public successMsg(message:string):void {
        this.notification.success(message);
    }
    
    public errorMsg(error:any):void {
        console.log(this.extractErrMsg(error));
        
        this.notification.error(this.extractErrMsg(error));
    }

    private extractErrMsg(error:any):string {
        if  (typeof error === "string") return error;

        if (typeof error.response?.data === "string") return error.response.data;

        if (Array.isArray(error.response?.data)) return error.response.data[0];

        if (typeof error.message === "string") return error.message;

        return "Some error, please try again";
    }
}

const notify = new NotifyService();

export default notify;