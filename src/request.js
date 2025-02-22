'use strict';
let httpRequest = require('https');
const qs = require('querystring');

const getRequest = (url) => {
    if (url.includes('http://')) httpRequest = require('http');
    return new Promise(function (resolve, reject) {
        httpRequest.get(url, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                if (JSON.parse(body).errorMessage) {
                    reject(body);
                }
                resolve(body);
            });
            res.on('error', (error) => {
                reject(error);

            });
        });
    });
};

const makeRequest = function postRequest(self, endpoint, methodName, token) {
    let dataString = '';
    methodName === 'POST' ? dataString = qs.stringify(self.body) : '';
    const options = {
        'hostname': self.baseUrl,
        'path': endpoint,
        'method': methodName || 'GET',
        'headers': {
            'content-type': methodName === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
            'authorization': token,
            'cache-control': 'no-cache',
            ...self.headers
        }
    };
    return new Promise(function (resolve, reject) {
        const req = httpRequest.request(options, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
                //console.log(body);
            });
            res.on('end', () => {
                resolve(body);

            });
            res.on('error', (error) => {
                reject(error);

            });
        });
        //console.log('request ' + dataString);
        if (methodName === 'POST') req.write(dataString);
        req.end();
    });
};


const base64Encode = (encodeData) => {
    const buff = Buffer.from(encodeData);
    return buff.toString('base64');
};

module.exports = { getRequest, makeRequest, base64Encode };
