"use strict";

const webviewComponent = require('./webviewComponent.js');

webviewComponent.setServiceUrl(process.env.SERVICE_URL || 'https://o100.odainfra.com/odaqr');
webviewComponent.setServicePort(process.env.SERVICE_PORT || 3001);
webviewComponent.setSaveParamServiceUrl(process.env.SAVE_PARAM_URL || 'https://o100.odainfra.com/cpm/wv/save');
webviewComponent.setWebviewUrl(process.env.SAVE_PARAM_URL || 'https://o100.odainfra.com/webviewApp');
webviewComponent.setPostParamsPath('/webviewParams');

const server = webviewComponent.createServer();
server.listen(webviewComponent.getServicePort());
