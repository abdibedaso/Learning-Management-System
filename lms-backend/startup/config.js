const config = require('config');

module.exports = function(app) {

    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }

    app.set('strict routing', true);
    app.set('case sensitive routing', true);


}