const express = require('express');
const fs = require('fs');
const config = require('./component/index.js');
const http = require('http');

const app = express();

const application = {
    Requests: {
        all: (requestsArray) => {
            Promise.all(requestsArray)
            .then(responses => {
              console.log('worked');
              config.routers[0].postHandler(responses);
            })
            .catch(error => console.log(error));
        },
        Request: (config) => {
            let uri,
                handler;  //handler is taken from object with the given url
            let base = 'localhost';
            let query = '';
            switch (config.uri) {
                case '/services/properties/schemas': {
                    uri = '\\localhost:3000/microserviceName/schemas';
                }
                case '/services/properties/organization': {
                    uri = '\\localhost:3000/__mocks__/organization'
                }
            }

            let result = new Promise((resolve, reject) => {
                resolve([
                        {
                            id: 0
                        },
                        {
                            id: 1
                        }
                ]);
            });
            console.log(`result: ${result}`);

            return result;

            // return http.request({
            //     host: uri,
            //     path: '/__mocks__',
            //     port: '3000',
            //     method: config.type ? config.type : 'GET'
            // }, handler);
        }
    }
};

{/* Iterate over all route objects */}
// config.routers.map(router => console.log(router.url));

{/* Call pre-handler with application config */}
//console.log(config.routers[0].preHandler(application));

{/* Call preHandler with application object */}
// app.get('/services/properties/schemas', (req, res) => {
//     const url = req.url;
//     const params = req.params;

    config.routers[0].preHandler(application);
// });
