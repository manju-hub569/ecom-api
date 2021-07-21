const jwt = require('jsonwebtoken');
const User = require('../models/registers');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, '43#suijo$#$mkdj6783j7s89nkjs8793hs3#47%Djr5#');
        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});
        if(!rootUser){throw new Error('user not found')}

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser;
        next();
    }catch(e) {
        res.status(401).send('unotherized Please Login First');
    }
}

module.exports = Authenticate;