const express = require('express');
const fs = require('fs');
const config = require('./component/index.js');

const application = {
    Requests: {
        all: (requestsArray) => {
            // requestsArray.map(request => request)
        },
        Request: (url) => {
            switch (url) {
                case '/services/properties/schemas': {
                    return '\\localhost:3000/microservice/schemas'
                }
            }
        }
    }
};

// config.routers.map(router => console.log(router.url));

console.log(config.routers[0].preHandler(application));

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
