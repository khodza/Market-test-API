const { validationResult } = require("express-validator")
const AppError =require('../utils/appError')

const catchValidatedReq = function(req,res,next){
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next();
}

module.exports = catchValidatedReq;