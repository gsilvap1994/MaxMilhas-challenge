/*
 * Routes supported in the application.
 * CPF router imports the REST api routes that manages the cpf operations
 */

import express from 'express';
import { SERVER_UPTIME } from './config/global-config';
import { requests } from './config/global-config' 
import CpfRouter from './routes/cpf-routes';
import db from './config/nedb-config'
import path from 'path';

const router = express.Router();

router.use(CpfRouter);


// the route '/' is the route for the application
router.get('/', (req, res) => {
    requests();
    res.sendFile(path.join(__dirname + '/view/index.html'))
});

// the route '/status' is the route for the server status
router.get('/status', (req,res) => {
    const status = {
        uptime: `${Date.now() - SERVER_UPTIME} ms`,
        numberOfRequests: `${requests()} requests`
    }
    db.count({status: "BLOCK"}, (err, count) => {
        if (!err) status.numberOfDocuments = `${count} CPFs in blacklist`;

        res.status(200).json(status)
    })
})



export default router;