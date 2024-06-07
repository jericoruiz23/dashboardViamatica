import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { random, authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        console.log(email, 'email');
        console.log(password, 'passss');

        if (!email || !password) {
            console.log('Incorrect User or Password');
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400); 
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();
        res.cookie('JR23-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, identifier, lastName, firstName  } = req.body;
        console.log();
        
        if (!email || !password || !identifier || !lastName || !firstName) {
            console.log('falta datos');
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            console.log('ya existe usuario');
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            firstName,
            lastName,
            email,
            identifier,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        console.log(user,'exitoso');
        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error, 'error');
        console.error(error);
        return res.sendStatus(400);
    }

};

