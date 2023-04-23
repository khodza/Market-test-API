const express = require('express');

const router = express.Router();


//CONTROLLERS
const authController =require('../controllers/authController')
const orderController =require('../controllers/orderController')

                                        //ORDERS
                                    //GET ALL ORDERS


/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders
 *     description: Returns all orders
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained after logging in. Pass the token in the format `Bearer <token>`.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.route('/').get(authController.protect,orderController.getAllOrders)

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order
 *     description: Creates a new order
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained after logging in. Pass the token in the format `Bearer <token>`.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 description: Array of products in the order
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: ID of the product
 *                     quantity:
 *                       type: number
 *                       description: Quantity of the product
 *             example:
 *               products:
 *                 - product: 6444d703ae803aa612d2fdb8
 *                   quantity: 2
 *                 - product: 6444dbbce0a709ff42fe3a1d
 *                   quantity: 3
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
                                        //ADD ORDER
.post(authController.protect,orderController.addOrder)

                                        //GET ORDER BY ID
/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get a single order by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the order to retrieve
 *         required: true
 *         type: string
 *         example: 613aaf0dc5d6400015e5b5aa
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

router.route('/:id').get(authController.protect,orderController.getOrder)
                                        //UPDATE ORDER BY ID
/**
 * @swagger
 * /api/v1/orders/{id}:
 *   patch:
 *     tags:
 *       - Orders
 *     summary: Update an order by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to update
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained after logging in. Pass the token in the format `Bearer <token>`.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['pending', 'shipped', 'delivered']
 *                 description: Status of the order
 *                 example: shipped
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

.patch(authController.protect,orderController.updateOrder)
                                        //DELETE ORDER BY ID
/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Delete an order by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained after logging in. Pass the token in the format `Bearer <token>`.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       - in: path
 *         name: id
 *         description: ID of the order to delete
 *         required: true
 *         type: string
 *         example: 6149e10c7f84e65eb1d6d95b
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

.delete(authController.protect,orderController.deleteOrder)
                                        //GET MY ORDERS
// router('/myorder',authController.protect,orderController.getMyOrders)

module.exports =router;