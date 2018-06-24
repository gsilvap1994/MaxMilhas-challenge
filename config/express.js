/*
 * express.js handles the general configuration for express
 */

import routes from '../routes';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


module.exports = () => {
    const app = express();

    // view make assets requests to /static
    app.use(express.static('static'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false,
    }));

    app.use(routes);

    return app;
} 