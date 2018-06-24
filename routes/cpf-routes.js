/*
 * CPF get, post, put and delete routes
 */

import express from 'express';
import CpfController from '../controllers/cpf-controller'
import {requests} from '../config/global-config'

const router = express.Router();
const controller = new CpfController();

router.get('/consulta', (req, res, next) => {
    requests();
    controller.getStatus(req, res, next);

})

router.post('/cadastro', (req, res, next) => {
    requests();
    controller.post(req, res, next);
})

router.put('/cadastro', (req,res,next) => {
    requests();
    controller.put(req, res, next)
})

router.delete('/consulta', (req, res, next) => {
    requests();
    controller.delete(req, res, next);
})

router.get('/blacklist', (req,res,next) => {
    requests();
    controller.getAll(req,res,next);
})

export default router;