import cors from "cors";
import express from "express";
import routeNotFound from "./middleware/route-not-found";
import catchAll from "./middleware/catch-all";
import appConfig from "./utils/app-config";
import authController from "./controllers/auth-controller"
import vacationsController from "./controllers/vacations-controller";
import followsController from "./controllers/follows-controller";
import expressFileUpload from "express-fileupload"
import sanitize from "./middleware/sanitize";
import expressRateLimit from "express-rate-limit"

// Start express server
const server = express();

// Add CORS and JSON use
server.use(cors({origin: appConfig.frontEndUrl}));
server.use(express.json());

// Sanitize request body - Remove HTML and script tags
server.use(sanitize);

// Limit user use to defend against DoS attacks
server.use("/api", expressRateLimit({
    max: 20, // maximum requests per client
    windowMs: 1000 // Time window for maximum requests
}));

// Add handling of uploaded files
server.use(expressFileUpload());

// Route api to the controller
server.use("/api", authController);
server.use("/api", vacationsController);
server.use("/api", followsController);

// Route error in finding route and other errors
server.use("*", routeNotFound);
server.use(catchAll);

// Start server listener
server.listen(appConfig.port,()=>console.log(`Listening on http://${appConfig.host}:${appConfig.port}`));