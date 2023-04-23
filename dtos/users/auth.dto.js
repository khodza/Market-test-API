const { body } = require('express-validator');


                                //AUTHENTICATION DTOS
const registerSchema = [
    body('username').notEmpty().withMessage('Tell us Your Name'),
    body('email').isEmail().withMessage('Invalid email, please provide valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password should contain at least 8 characters'),
    body('passwordConfirm').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  ];

  const loginSchema = [
    body('email').isEmail().withMessage('Invalid email, please provide valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password should contain at least 8 characters')
  ];
module.exports ={registerSchema,loginSchema};