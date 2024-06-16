import mysql from "mysql";
import appConfig from "./app-config";

// Create mySQL connections pool
const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database
});

function execute(sqlQuery:string, values?:any[]):Promise<any> {
    return new Promise<any>((resolve, reject)=>{
        connection.query(sqlQuery, values, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

export default {
    execute
}