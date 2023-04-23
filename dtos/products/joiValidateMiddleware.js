const AppError = require("../../utils/appError");

const validate = (schema) => (req, res, next) => {
    const {
      error
    } = schema.validate(req.body);
    if (error) {
    
      // res.status(400)
      //   .send(error.details[0].message);
      next(new AppError(error.details[0].message,400));
        
    } else {
      next();
    }
  };

  module.exports =validate;