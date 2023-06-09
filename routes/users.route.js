const express = require('express');

const router = express.Router();

//CONTROLLERS
const authController =require('../controllers/authController');
const userController =require('../controllers/userController');

//SCHEMA (DTOS)
const usersSchemaDto = require('../dtos/users/users.dto');

const catchValidatedReq =require('../dtos/validateRequestSchema')

                            // PROTECT ALL BELOW ROUTES
router.use(authController.protect);
                            //GET CURRENT USER
/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     tags:
 *       - Current User
 *     summary: Get the currently logged-in user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *     operationId: getCurrentUser
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   components:
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *           name:
 *             type: string
 *           email:
 *             type: string
 *         example:
 *           id: 123
 *           name: John Doe
 *           email: john.doe@example.com
 */

router.get('/me',userController.getMe,userController.getUser);
                            //UPDATE CURRENT USER PASSWORD
/**
 * @swagger
 * /api/v1/users/updateMyPassword:
 *   patch:
 *     tags:
 *       - Current User 
 *     summary: Update the currently logged-in user's password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password
 *                 example: newpassword
 *               passwordCurrent:
 *                 type: string
 *                 description: Current password
 *                 example: oldpassword1
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */

router.patch('/updateMyPassword',
// usersSchemaDto.updateCurrentUserPassword,
// catchValidatedReq ,
authController.updatePassword);

                            //UPDATE CURRENT USER
/**
 * @swagger
 * /api/v1/users/updateMe:
 *   patch:
 *     tags:
 *       - Current User
 *     summary: Update the currently logged-in user's profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Photo of the user
 *           example:
 *             username: Updated username
 *             email: example@example.com
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal server error
 */


router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  usersSchemaDto.updateCurrentUserDto,
  catchValidatedReq,
  userController.resizeUserPhoto,
userController.updateMe
);
                            //DELETE CURRENT USER

/**
 * @swagger
 * /api/v1/users/me:
 *   delete:
 *     tags:
 *       - Current User
 *     summary: Delete the currently logged-in user's account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: No Content
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *     operationId: deleteCurrentUser
 */

router.delete('/me', userController.deleteMe);

                                    //USERS
                                    //GET ALL USERS
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *     operationId: getAllUsers
 */
router
.route('/')
.get(userController.getAllUsers)
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *     operationId: getUserById
*/

                                            //GET USER BY ID
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *     operationId: getUserById
 */

router
  .route('/:id')
  .get(userController.getUser)
                                                //UPDATE USER
/**
 * @swagger
 * /api/v1/users/{userId}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update a user's email and username by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User object that needs to be updated (only email and username can be updated)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *     operationId: updateUserById
 */

  .patch(usersSchemaDto.updateCurrentUserDto,catchValidatedReq,userController.updateUser)
                                            //DELETE USER BY ID
/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to delete
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: No Content
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *     operationId: deleteUserById
 */
  .delete(userController.deleteUser);

module.exports = router;