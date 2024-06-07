import express from "express";

import users from './usersRouter'
import authentication from "./authenticationRouter";

const router = express.Router()

export default(): express.Router =>{
    authentication(router);
    users(router)
    return router;
}