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
                config.routers[0].postHandler(responses);
            })
            .catch(error => console.log(error));
        },
        Request: (config) => {
            /* URI is taken from the objects that are being aggregated in index.js */
            let uri;
            let result;

            switch (config.uri) {
                case '/services/schemas/org': {
                    uri = '/someMatchedUrlForSchemas';
                    break;
                }
                case '/services/properties/org/0': {
                    uri = '/someMatchedUrlForOrganizations0'
                    break;
                }
                case '/services/properties/org/1': {
                    uri = '/someMatchedUrlForOrganizations1'
                    break;
                }
            }

            /* Mocked promise for schemas*/
            if (uri === '/someMatchedUrlForSchemas') {
                console.log('worked');
                result = new Promise((resolve, reject) => {
                    resolve([
                        {
                            id: 0
                        },
                        {
                            id: 1
                        }
                    ]);
                });
            }

            if (uri === '/someMatchedUrlForOrganizations0') {
                result = new Promise((resolve, reject) => {
                    resolve(
                        {
                            id: 0,
                            property_type: 'organization'
                        }
                    );
                });
            }

            if (uri === '/someMatchedUrlForOrganizations1') {
                result = new Promise((resolve, reject) => {
                    resolve(
                        {
                            id: 1,
                            property_type: 'organization'
                        }
                    );
                });
            }

            return result;
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
