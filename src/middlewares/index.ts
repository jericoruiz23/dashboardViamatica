import express from 'express'
import {get, merge} from 'lodash'

import { getUserBySessionToken } from '../db/users'

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {id} = req.params
        const currentUserId = get(req, 'identity._id') as string

        if(!currentUserId){
            console.log(currentUserId,'No existe User id');            
            return res.sendStatus(403)
        }
        if(currentUserId.toString()!== id){
            console.log('no coincide el id');
            return res.sendStatus(403)
        }

        next()
    } catch (error) {
        console.log(error);
        return res.send(400)
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['JR23-AUTH']
        if (!sessionToken){
            console.log('No session token');
            
            return res.sendStatus(403)
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        if (!existingUser){
            console.log('Existing user');
            return res.sendStatus(403)
        }

        merge(req,{identity: existingUser})
        return next()

    } catch (error) {
        console.log(error);
        
        return res.send(400)
    }
}