class Config {
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
}

const appConfig = new Config();

export default appConfig;