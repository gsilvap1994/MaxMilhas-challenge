/*
 * The CpfController is the class responsible for handling the requests.
 * Controller for the get, post, put and delete requests.
 */

import { validateCpf } from '../helpers/functions'
import db from '../config/nedb-config'

export default class CpfController {

    // getStatus return the status of a given cpf provided by user
    async getStatus(req, callback) {
        try {
            let { query } = req;

            if(validateCpf(query.cpf)) {
                db.find(query, (err,docs) => {
                    if (err) throw new Error('Error on find');
                    else if(docs.length > 0) {
                        callback.status(200).json(docs[0]);
                    }
                    else {
                        // if the given cpf doesn't appear in the database, it is inserted with 'FREE' status
                        db.insert({cpf: query.cpf, status: 'FREE', dateAdded:new Date()}, (err,doc) => {
                           if(doc) callback.status(200).json(doc);
                           else throw new Error('Error on register');
                       })
                    }
                })
            }
            else {
                // If the given cpf doesn't pass in the validation, the status of the response is 400 (Bad Request)
                callback.status(400).json({message: "CPF inválido."});
            } 

        }
        catch(error) {
            // If any error occurs, the status of the response is 500 (Internal Server Error)
            callback.status(500).json({message: 'error'});

        }
    }


    // post handle de cpf blacklist registration
    async post(req, callback, next) {
        try {
            let cpf = req.body.cpf;
            if(validateCpf(cpf)) {
                // needs to know if the cpf is already in the database
                db.find({cpf: cpf}, (err,docs) => {
                    if(err) throw new Error('Errod on find')
                    // if the cpf is already in the database and its status is block, then nothing needs to be done
                    else if(docs.length > 0 && docs[0].status ==='BLOCK') {
                        callback.status(200).json(docs[0]);
                    }
                    // if the cpf is already in the database and its status is free, then the cpf needs to be updated
                    else if(docs.length > 0 && docs[0].status === 'FREE') {
                        req.body.status = "FREE";
                        this.put(req, callback, next);
                    }
                    // if the cpf isn't in the database, then its added to the blacklist
                    else db.insert({ cpf: cpf, status: 'BLOCK', dateAdded:new Date()}, (err, doc) => {
                        if (doc) callback.status(200).json(doc);
                        else throw new Error('Error on insert');
                    })  
                })

            }
            else callback.status(400).json({message: "CPF inválido"});
            
        }
        catch(error) {
            callback.status(500).json({message: 'error'})
        }
    }


    // put handles the updates, if the cpf is FREE then it needs to be changed to BLOCK, and vice versa
    async put(req, callback, next) {
        let status = req.body.status === 'BLOCK' ? 'FREE' : 'BLOCK'; 
        try {
            let cpf = req.body.cpf;
            if (validateCpf(cpf)) {

                db.update({ cpf: cpf }, { $set: { status: status } }, {}, (err, num) => {
                    if (num) callback.status(200).json(num);
                    else throw new Error('Error on update');
                })
            }
            else callback.status(400).json({ message: "CPF inválido" });
        }
        
        catch(error) {
            console.log(error)
            callback.status(500).json({message: error});
        }
    }
    
    // getAll return all the cpfs, in or out of the blacklist
    async getAll(req, callback, next) {
        try {
            db.find({}, (err,docs) => {
                if(docs) callback.status(200).json(docs);
                else throw new Error('Error on find')
            })
        } 
        catch(error) {
            callback.status(500).json({message: error})
        }
    }


}