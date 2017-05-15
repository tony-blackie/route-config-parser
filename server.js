const express = require('express');
const fs = require('fs');
const config = require('./component/index.js');
const http = require('http');
const request = http.request;

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
            let uri;
            switch (config.uri) {
                case '/services/properties/schemas': {
                    uri = '\\localhost:3000/microserviceName/schemas';
                }
                case '/services/properties/organization': {
                    uri = '\\localhost:3000/microserviceName/organization'
                }
            }

            return request({
                host: uri,
                type: config.type
            });
        }
    }
};

{/* Iterate over all route objects */}
// config.routers.map(router => console.log(router.url));

{/* Call pre-handler with application config */}
//console.log(config.routers[0].preHandler(application));

{/* Call preHandler with application object */}
// app.get('/services/properties/schemas', (request, response) => {
//     const url = request.url;
//     const params = request.params;


    config.routers[0].preHandler(application);
// });

// let data = fs.readFile('./component/someFile.json', 'utf8', (error, data) => {
//     if (error) {
//         return console.log(error);
//     }
//
//     data = JSON.parse(data);
//     console.log(data.name);
//     console.log(data.age);
// });
