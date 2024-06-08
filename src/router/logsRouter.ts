import express from 'express'
import { isAuthenticated, isOwner } from '../middlewares'
import { getAllLogs, deleteLog, updateLog } from '../controllers/logs'

export default (router: express.Router) => {
    // router.get('/users', isAuthenticated, getAllUsers)
    // router.delete('/logs/:id', isAuthenticated, isOwner, deleteLog)
    // router.patch('/logs/:id', isAuthenticated, isOwner, updateLog)
    // router.get('/logs', isAuthenticated, getAllLogs)
    router.get('/logs', getAllLogs)
    router.delete('/logs/:id', isAuthenticated, isOwner, deleteLog)
    router.patch('/logs/:id', isAuthenticated, isOwner, updateLog)
}