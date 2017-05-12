const express = require('express');
const fs = require('fs');
const config = require('./component/index.js');

// console.log(config.routers);
config.routers.map(router => console.log(router.url));

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
