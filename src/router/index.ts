import express from "express";

import users from './usersRouter'
import authentication from "./authenticationRouter";
import logs from './logsRouter'

const router = express.Router()

export default(): express.Router =>{
    authentication(router);
    users(router)
    logs(router)
    
    return router;
}