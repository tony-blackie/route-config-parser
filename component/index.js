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
                    uri: '/services/properties/schemas',
                    type: 'GET'   // added request type
                };
                const option2 = {
                    uri: '/services/properties/organization',
                    type: 'GET'   // added request type
                };
                const p1 = application.Requests.Request(option1);
                const p2 = application.Requests.Request(option2);
                console.log(`promise1: ${p1}`);
                console.log(`promise2: ${p2}`);
                return application.Requests.all([p1, p2]);  //possibly, return is not required here
            },
            'postHandler': function (data) {
                console.log(`worked: ${data}`);
                return data;
            }
        },
        {
            'url': '/services/properties/schemas',
            'permission': '10000000065',
            'handler': function (req, res) {
                return request.get('/schemas/' + req.query)
                .on('response', function(response){
                    res.send(response)
                })
            }
        },
        {
            'url': '/services/properties/organization',
            'permission': '10000000065',
            'handler': function (req, res) {
                return request.get('/properties' + req.params.id + '/' + req.params.resourse_name)
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
