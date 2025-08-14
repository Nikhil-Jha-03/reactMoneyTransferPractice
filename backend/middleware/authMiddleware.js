const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.includes('bearer')) {
            return res.status(404).json({
                msg: "Please Login"
            })
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET)
        if (decoded.id) {
            req.userId = decoded.id;
            next()
        }else{
            return res.status(403).json({
                msg:"MiddleWare Error"
            })
        }
    } catch (error) {
        return res.status(403).json({
            msg: 'Error in middleware authenticating',
            error: error.message
        });
    }
}

module.exports = authMiddleware
