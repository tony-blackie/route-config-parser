var config = {
    routers: [
        {
            'url': '/services/properties/index',
            'permission': '10000000065',
            'handlerParams': {
                aggregated: true
            },
            'preHandler': function (application) {
                const option1 = {
                    uri: '/services/properties/schemas'
                };
                const option2 = {
                    uri: '/services/properties/organization'
                };
                const p1 = application.Requests.Request(option1);
                const p2 = application.Requests.Request(option2);
                return application.Requests.all([p1, p2]);
            },
            'postHandler': function (data) {
                return data;
            }
        },
        {
            'url': '/services/properties/schemas',
            'permission': '10000000065',
            'handler': function (req, res) {
              request.get('/schemas/org/' + req.query)
                .on('response', function(response){
                    res.send(response)
                })
            }
        },
        {
            'url': '/services/properties/organization',
            'permission': '10000000065',
            'handler': function (req, res) {
              request.get('/properties/org' + req.params.id + '/' + req.params.resourse_name)
                .on('response', function(response){
                    res.send(response)
                })
            }
        }
    ],
    js:{
        10000000099: './dist/index.js'
    }
};

module.exports = config;