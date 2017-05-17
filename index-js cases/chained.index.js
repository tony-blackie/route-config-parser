var config = {
    routers: [
        {
            'url': '/services/schemas',
            'permission': '10000000065',
            'handlerParams': {
                aggregated: true
            },
            'preHandler': function (application, request) {
                            const option1 = {
                                uri: '/services/org/schemas'
                                header: request.header
                            };

                            const p1 = application.Requests.Request(option1);

                            return p1.then(response => {
                                const option2 = {
                                    uri: '/services/org/resources' + response.id,
                                    method: 'POST'
                                };

                                return application.Requests.Request(option2);
                            });

            },
            'postHandler': function (data) {
                return {
                    username: data[0].firstName + ' ' + data[0].lastName,
                    menuItems: data[1].menuItems
                };
            }
        },
        {
            'url': '/services/org/schemas',
            'permission': '10000000065',
            'handler': function (data) {
                return data;
            }
        },
        {
            'url': '/services/org/resources',
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
