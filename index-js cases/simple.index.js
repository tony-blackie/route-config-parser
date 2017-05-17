var config = {
    routers: [
        {
            'url': '/services/org/schemas',
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
