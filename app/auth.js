function Auth() {
    var restify = require('restify')

    // function for basic auth using login credentials that are hardcoded
    function authenticate (req, res, next) {
        admins = {
            admin: {
                id: 1,
                password: 'admin'
            }
        };

        if (req.username == 'anonymous' || !admins[req.username] || req.authorization.basic.password !== admins[req.username].password) {
            // Respond with { code: 'NotAuthorized', message: '' }
            next(new restify.NotAuthorizedError());
        } else {
            next();
        }
    }
    return {authenticate};
}

module.exports = Auth;
