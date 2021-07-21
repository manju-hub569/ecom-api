const jwt = require('jsonwebtoken');
const Cust = require('../models/cregisters');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtokenc;
        const verifyToken = jwt.verify(token, '43#suijo$#$mkdj6783j7s89nkjs8793hs3#47%Djr5@');
        const rootCust = await Cust.findOne({_id:verifyToken._id, "tokens.token":token});
        if(!rootCust){throw new Error('Cust not found')}

        req.token = token;
        req.rootCust = rootCust;
        req.CustId = rootCust;
        next();
    }catch(e) {
        res.status(401).send('unotherized Please Login First');
    }
}

module.exports = Authenticate;