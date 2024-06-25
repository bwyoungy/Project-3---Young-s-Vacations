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

// Start express server
const server = express();

// Add CORS and JSON use
server.use(cors());
server.use(express.json());

// Sanitize request body - Remove HTML and script tags
server.use(sanitize);

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