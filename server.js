const express = require('express');
const fs = require('fs');
const http = require('http');
const config = require('./component/index.js');

const app = express();

app.use(express.static('component'));

let response;
const application = {
    Requests: {
        all: (requestsArray) => {
            Promise.all(requestsArray)
            .then(responses => {
                let postHandlerResult = config.routers[0].postHandler(responses);

                response.send(postHandlerResult);
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

{/* Call preHandler with application object */}
app.get('/services/properties/all/schemas', (req, res) => {
    const url = req.url;
    const params = req.params;
    response = res;

    config.routers[0].preHandler(application);
});

const port = 8080;

app.listen(port);
console.log(`App is running on port ${port}`);
