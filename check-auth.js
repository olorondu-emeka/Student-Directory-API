const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        req.decoded = jwt.verify(token, process.env.JWT_KEY);
        next();

    } catch (error) {
        
       res.sendStatus(403);
    }
}

exports.checkLocal = (req, res, next) => {
    const theToken = req.headers.authorization;
    if (typeof theToken !== 'undefined'){
        next();
    }

    else{
        res.sendStatus(403);
    }
}