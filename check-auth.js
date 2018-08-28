const jwt = require('jsonwebtoken');


exports.verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        req.decoded = jwt.verify(token, process.env.JWT_KEY);
        next();

    } catch (error) {
        console.log(req.decoded);
       res.sendStatus(403);
    }
}

exports.checkLocal = (req, res, next) => {
    const theToken = req.headers.authorization;
    console.log(theToken, "this is the token")
    if (typeof theToken !== 'undefined'){
        next();
    }

    else{
        res.sendStatus(403);
    }
}