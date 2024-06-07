import express from 'express'

import { deleteUserById, getUserById, getUsers } from '../db/users'

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers()
        return res.status(200).json(users)

    } catch (error) {
        console.log(error)
        return res.send(400)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const deletedUser = await deleteUserById(id)
        console.log('Borrado del usuario exitoso');
        return res.json(deletedUser)

    } catch (error) {
        console.log(error);
        return res.send(400)
        
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id}= req.params
        const {identifier} = req.body

        if(!identifier){
            return res.sendStatus(400)
        }

        const user = await getUserById(id)
        user.identifier = identifier
        await user.save()
        return res.status(200).json(user).end()
        
    } catch (error) {
        console.log(error);
        res.send(400)
        
    }
}