module.exports = {
    server: {
        port: process.env.PORT || 3000,
    },
    mongo: {
        uri : 'mongodb://sample:sample1@ds151222.mlab.com:51222/heroku_722skd94'
    },
    origin: 'http://127.0.0.1:4200',
}
