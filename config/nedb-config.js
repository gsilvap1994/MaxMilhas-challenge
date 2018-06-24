/*
 *  NeDB is the embedded database used for the application
 *  The blacklist is stored in a json file, located at the data folder
 */

import DataStore from 'nedb';

const cpfDatabase = new DataStore({filename: '../data/cpf.json', autoload: true})

export default cpfDatabase;