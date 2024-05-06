const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(403)
            .json({
                message: 'Token is required'
            })
        }
        try {
            const decoded = jwt.verify(req.headers['authorization'], 'secret')
            return next()
        }
        catch (e) {
            return res.status(403).json({
                message: 'Invalid token or expired'
            })
        }
    }

    module.exports =  ensureAuthenticated