"use strict";

const log4js = require('log4js');

log4js.configure('./config/log4js.json');
//const logger = log4js.getLogger('console');

function debugLog(message, o) {
    if(o) {
        console.log('[' + (new Date()).toLocaleString() + ']: ' + message, o);
    } else {
        console.log('[' + (new Date()).toLocaleString() + ']: ' + message);
    }
    //logger.debug(message);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    "debugLog": debugLog,
    "sleep": sleep
};
