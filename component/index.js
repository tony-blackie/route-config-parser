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
                const options = {
                    uri: '/services/schemas/org',
					          qs: params
                };
                const getSchemas = application.Request(option);

                return new Promise((resolve, reject) => {
          					getSchemas.then((schemas) => {
            						let requests = [];
            						schemas.map((schema) => {
              							requests.push(application.Request({
              							    uri: '/services/properties/org/' + schema
              							}))
            						});
            						resolve(application.all(requests));
          					});
    				    });
            },
            'postHandler': data => data
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
