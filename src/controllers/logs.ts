import express from 'express';
import { getLogs, createLog, getLogById, deleteLogById, updateLogById } from '../db/logs';

export const getAllLogs = async (req: express.Request, res: express.Response) => {
    try {
        const logs = await getLogs();
        return res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching logs:', error);
        return res.sendStatus(400);
    }
};

export const getLog = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const log = await getLogById(id);
        if (!log) {
            return res.sendStatus(404);
        }
        return res.status(200).json(log);
    } catch (error) {
        console.error('Error fetching log:', error);
        return res.sendStatus(400);
    }
};

export const createNewLog = async (req: express.Request, res: express.Response) => {
    let data = {
        identifier: ''
    }
    try {
        const log = await createLog(req.body);
        return res.status(201).json(log);
    } catch (error) {
        console.error('Error creating log:', error);
        return res.sendStatus(400);
    }
};

export const deleteLog = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedLog = await deleteLogById(id);
        if (!deletedLog) {
            return res.sendStatus(404);
        }
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting log:', error);
        return res.sendStatus(400);
    }
};

export const updateLog = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const log = await updateLogById(id, req.body);
        if (!log) {
            return res.sendStatus(404);
        }
        return res.status(200).json(log);
    } catch (error) {
        console.error('Error updating log:', error);
        return res.sendStatus(400);
    }
};
