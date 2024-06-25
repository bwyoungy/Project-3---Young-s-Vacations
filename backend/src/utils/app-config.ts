class AppConfig {
    public host = "localhost"; // Computer name/address of 
    public user = "root";
    public password = "";
    public database = "young-vacations";

    public port = 3001;
    public frontEndUrl = "http://localhost:3000";
}

const appConfig = new AppConfig();
export default appConfig;