const { body } = require('express-validator');
                                //USERS DTOS
const updateCurrentUserDto = [
    body('username').optional(),
    body('email').optional().isEmail(),
    body('password').custom((value, { req }) => {
      if ('password' in req.body) {
        throw new Error('Password field is not allowed');
      }
      return true;
    })
  ];

  const updateCurrentUserPassword = [
    body('passwordCurrent').notEmpty(),
    body('password').notEmpty().isLength({min:8,max:20}).withMessage('Password should have minimum 8 characters and maximum 20 '),
    body({ ignoreUnknown: true }),
  ];

module.exports ={updateCurrentUserDto,updateCurrentUserPassword};
