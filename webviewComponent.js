"use strict";

const bodyParser = require('body-parser');
const express = require('express');
const fqdn = require('fqdn');
const utils = require('./utils.js');
const axios = require('axios');

let postParamsPath;
let saveParamServiceUrl;
let localServicePort;
let webviewUrl;

let setPostParamsPath = function(path) {
    postParamsPath = path;
};

let setServicePort = function(port) {
    localServicePort = port;
};

let getServicePort = function() {
    return localServicePort;
};

let setSaveParamServiceUrl = function(url) {
    saveParamServiceUrl = url;
}

let setWebviewUrl = function(url) {
    webviewUrl = url;
}

let createWebviewServer = function() {
    if (!postParamsPath) {
        utils.debugLog('Error: please specify the path for posting webview input parameters');
        process.exit(1);
    }
    utils.debugLog('Webview service starting on port: ' + localServicePort);

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.post(postParamsPath, handlePostRequest);

    return app;
};

function handlePostRequest(req, res) {
    utils.debugLog('POST ' + req.protocol+'://'+req.get('host')+req.originalUrl);

    let payload = req.body;
    utils.debugLog('Request body: ' + JSON.stringify(payload));

    let userNameE = payload.parameters.filter( e => e.key === 'username' );
    let accountE = payload.parameters.filter( e => e.key === 'account' );
    let branchE = payload.parameters.filter( e => e.key === 'bankbranch' );
    let amountE = payload.parameters.filter( e => e.key === 'amount' );
    let targetActionE = payload.parameters.filter( e => e.key === 'targetAction' );
    let callbackE = payload.parameters.filter( e => e.key === 'webview.onDone' );

    let response = axios.post(saveParamServiceUrl, {
        userName: userNameE ? userNameE.value : "",
        account: accountE? accountE.value : "",
        bankBranch: branchE ? branchE.value : "",
        amount: amountE ? amountE.value : "",
        targetAction: targetActionE ? targetActionE.value : "",
        callbackUrl: callbackE ? callbackE.value : ""
    });
    debugLog("Saved parameters: ", response.data)
    
    const resbody = {
        'webview.url': webviewUrl + "?token=" + response.data.ID
    };

    utils.debugLog('Response body: ' + JSON.stringify(resbody));
    res.json(resbody);
}

module.exports = {
    "createServer": createWebviewServer,
    "setPostParamsPath": setPostParamsPath,
    "setServicePort": setServicePort,
    "getServicePort": getServicePort,
    "setSaveParamServiceUrl": setSaveParamServiceUrl,
    "setWebviewUrl": setWebviewUrl
};
