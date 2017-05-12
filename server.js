const express = require('express');
const fs = require('fs');
const config = require('./component/index.js');

const app = express();

const application = {
    Requests: {
        all: (requestsArray) => {
            // requestsArray.map(request => request)
        },
        Request: (url) => {
            switch (url.uri) {
                case '/services/properties/schemas': {
                    return '\\localhost:3000/microservice/schemas'
                }
            }
        }
    }
};

{/* Iterate over all route objects */}
// config.routers.map(router => console.log(router.url));

{/* Call pre-handler with application config */}
//console.log(config.routers[0].preHandler(application));

app.get('/services/properties/schemas', (request, response) => {
    const url = request.url;
    const params = request.params;

    config.routers[0].preHandler(application);
});
let promiseChain = config.routers[0].preHandler(application);
Promise.all(promiseChain).then(responsesArray => config.routers[0].postHandler(responsesArray));

const app = express();

// let data = fs.readFile('./component/someFile.json', 'utf8', (error, data) => {
//     if (error) {
//         return console.log(error);
//     }
//
//     data = JSON.parse(data);
//     console.log(data.name);
//     console.log(data.age);
// });
