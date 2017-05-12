Every UI component used by the Frontend Platform, needs an index.js exporting a configuration object.

This JSON object comprised of the following sections:
    Routers – contains server route object/list of objects, each object is a server route with:
    url – server route url
    permission – permission id for that route
    handler – function callback for that route

A route can be of two types:
    Regular (as previously explained) - which represent a single request to API route
    Aggregated - an aggregated represent a set of server requests api, called by a single client http request, and has the following attributes:
    'handleParams' - object contains 'aggregated' key valued true
    'preHandler' - function receives the application object, which is used to declare the flow of the requests, returns a promise
    'postHandler' - function that receives the preHandler promise and returns the data to the client

js - object that has a numeric key (permission), and value is the js file relative path

a route url prefix '/services/' represents a path for proxy requests for the microservices, which suffix will be forward with the request to the relevant service

application object - an api our server enable for the components to use for agreed server action:
    Requests - allows to send requests to the server
    Request
        receives option object
            uri  - a url of the request [Required]
            additional parameters will be available future on
        This will send a request to the server with the original request attributes and will return a promise with the request response
    all - serves as Promise.all for out Request, returns promise

This configuration file allows our platform to agnostically use any component, while it behavior, routes and permissions defined by the UI Component creator. The platform will enforce its behavior and expose components permissions based.

Component Configuration file example:
index.js
var config = {
    routers: [
        {
            'url': '/services/layout',
            'permission': '10000000065',
            'handlerParams': {
                aggregated: true
            },
            'preHandler': function (application) {
                const option1 = {
                    uri: '/me'
                };
                const option2 = {
                    uri: '/services/menu'
                };
                const p1 = application.Requests.Request(option1);
                const p2 = application.Requests.Request(option2);
                return application.Requests.all([p1, p2]);
            },
            'postHandler': function (data) {

                return {
                    username: data[0].firstName + ' ' + data[0].lastName,
                    menuItems: data[1].menuItems
                };
            }
        },
        {
            'url': '/services/menu',
            'permission': '10000000065',
            'handler': function (data) {
                return data;
            }
        }
    ],
    js:{
        10000000099: './dist/index.js'
    }
};

module.exports = config;
