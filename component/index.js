var config = {
    routers: [
        {
            'url': '/services/properties/all/schemas',
            'permission': '10000000065',
            'handlerParams': {
                aggregated: true
            },
            'preHandler': function (application, reqParams) {
                /* Mock params */
                reqParams = {
                    query: [
                      sub_service1,
                      sub_service2
                    ]
                };
                /* Mock params end */

                let options = {
                    uri: '/services/schemas/org',
					          qs: reqParams.query
                };

                const schemasPromise = application.Requests.Request(options);

                schemasPromise
                .then((schemas) => {
        						let requests = [];
                    console.log(schemas);
        						schemas.map((schema) => {
                        options = {
                            uri: '/services/properties/org/' + schema.id
                        };
          							requests.push(application.Requests.Request(options))
        						});

                    return application.Requests.all(requests);
      					})
                .catch((error) => {

                });
            },
            'postHandler': (data) => {
                console.log(data);
                data.map(item => console.log(`postHandler callback, id: ${item.id}, type: ${item.property_type}`));
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
