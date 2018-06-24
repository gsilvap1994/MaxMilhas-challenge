/*
 * global-config.js handles the general configuration of the server status.
 */

export const SERVER_UPTIME = Date.now();

export const PORT = 3000;

let REQUESTS = 0
export  function  requests() {
    return ++REQUESTS;
}