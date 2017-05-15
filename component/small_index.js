var config = {
    routers: [
        {
            'url': '/services/properties/schemas',
            'permission': '10000000065',
            'handler': function (req, res) {
                request.get('/schemas/org/' + req.query)
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
