class Config {
    // Define API Urls
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public followsUrl = "http://localhost:3001/api/follows/";
    public usersUrl = "http://localhost:3001/api/users/";
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
}

const appConfig = new Config(); // Singleton

export default appConfig;