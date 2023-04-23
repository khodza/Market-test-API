const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();

//CONTROLLERS
const authController =require('../controllers/authController');

//SCHEMA (DTOS)
const usersSchemaDto = require('../dtos/users/auth.dto');

const catchValidatedReq =require('../dtos/validateRequestSchema')

                                    //AUTHENTICATION ROUTES
                                            //SIGNUP
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Name of User
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 minLength: 8
 *                 maxLength: 20
 *               passwordConfirm:
 *                 type: string
 *                 description: Confirm your Password
 *                 minLength: 8
 *                 maxLength: 20
 *             example:
 *               username: khodza
 *               email: khodzapro@gmail.com
 *               password: 2003qwerty
 *               passwordConfirm: 2003qwerty
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict
 */
router.post('/signup',usersSchemaDto.registerSchema,catchValidatedReq, authController.signup);
                                            //LOGIN
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 minLength: 8
 *                 maxLength: 20
 *           example:
 *             email: khodzapro@gmail.com
 *             password: 2003qwerty
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       429:
 *         description: Too Many requests (You blocked)
 */

const loginLimiter = rateLimit({
    max: 5,
    windowMs: 30 * 60 * 1000,
    handler: (request, response, next) =>
      response.status(429).json({
        status: "failed",
        message: "Too many attempts. Please try again after 30 min",
      }),
  });
router.post('/login', usersSchemaDto.loginSchema,loginLimiter,catchValidatedReq,authController.login);
                                            //LOGOUT
/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Logout the currently logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router.get('/logout', authController.logout);

module.exports =router;
