var config = {
    routers: [
        {
            'url': '/services/properties/index',
            'permission': '10000000065',
            'handlerParams': {
                aggregated: true
            },
            'preHandler': function (application) {
                let params = '';
                let promise;
                const options = {
                    uri: '/services/schemas/org',
					          qs: params
                };

                const schemasPromise = application.Requests.Request(options);
                console.log(`schemasPromise: ${schemasPromise.then}`);

                schemasPromise
                .then((schemas) => {
                    console.log('then worked: ' + schemas);
        						let requests = [];
        						schemas.map((schema) => {
          							requests.push(application.Requests.Request({
          							    uri: '/services/properties/org/' + schema.id
          							}))
        						});
                    promise = application.Requests.all(requests)

                    return promise;
      					})
                .catch((error) => {
                    console.log(`catch worked: ${error}`);
                });
            },
            'postHandler': (data) => {
                console.log(`postHandler worked: ${data}`);
                return data;
            }
        },
        {
            'url': '/services/properties/schemas',
            'permission': '10000000065',
            'handler': data => data
        },
        {
            'url': '/services/properties/organization',
            'permission': '10000000065',
            'handler': data => data
        }
    ],
    js:{
        10000000099: './dist/index.js'
    }
};

module.exports = config;
