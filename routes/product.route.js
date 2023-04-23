const express = require('express');

const router = express.Router();


//CONTROLLERS
const authController =require('../controllers/authController')
const productController =require('../controllers/productController')
const categoryController =require('../controllers/categoryController')
//JOI 
 const validateMiddleware =require('../dtos/products/joiValidateMiddleware');
 const validationProduct =require('../dtos/products/productJoiSchema');
 const validationCategory =require('../dtos/products/categoryJoiSchema')

                                //CATEGORIES 
                                //ADD CATEGORY
/**
 * @swagger
 * /api/v1/products/categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Add a new category
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
 *               name:
 *                 type: string
 *                 description: Name of the category
 *               description:
 *                 type: string
 *                 description: Description of the category
 *             example:
 *               name: Electronics
 *               description: Products related to electronics
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.route('/categories').post(authController.protect,validateMiddleware(validationCategory.createCategoryJoiSchema),categoryController.addCategory)
                                            //GET ALL CATEGORIES
/**
 * @swagger
 * /api/v1/products/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *       - basicAuth: []
 *       - apiKey: []
 * definitions:
 *   Category:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: ID of the category
 *       name:
 *         type: string
 *         description: Name of the category
 *       description:
 *         type: string
 *         description: Description of the category
 *     example:
 *       _id: 60d4d8cf7b3c3b53a4c1f2ba
 *       name: Electronics
 *       description: Category for electronic devices and accessories
 */
.get(categoryController.getAllCategories)
                                //GET CATEGORY BY ID
/**
 * @swagger
 * /api/v1/products/categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get a single category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category to retrieve
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

router.route('/categories/:id').get(categoryController.getCategory)

/**
 * @swagger
 * /api/v1/products/categories/{id}:
 *   patch:
 *     tags:
 *       - Categories
 *     summary: Update an existing category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category to be updated
 *         required: true
 *         schema:
 *           type: string
 *           example: 6155d5a5a90113004477fb30
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained after logging in. Pass the token in the format `Bearer <token>`.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Updated Category
 *             description: This is an updated category
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

.patch(authController.protect,categoryController.updateCategory)

                                    //DELETE CATEGORY
/**
 * @swagger
 * /api/v1/products/categories/{categoryId}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         description: ID of the category to delete
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained after logging in. Pass the token in the format `Bearer <token>`.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

.delete(authController.protect,categoryController.deleteCategory)
                                            //PRODUCTS
                                    //ADD  PRODUCT
/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Add a new product
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *                 example: "T-Shirt"
 *               description:
 *                 type: string
 *                 description: Description of the product
 *                 example: "A comfortable and stylish T-shirt for everyday wear"
 *               quantity:
 *                 type: number
 *                 description: Add quantity
 *                 example: 30
 *               price:
 *                 type: number
 *                 description: Price of the product
 *                 example: 19.99
 *               category:
 *                 type: string
 *                 description: ID of the category the product belongs to
 *                 example: 644483b3b83c95a5d01fb8d6
 *               image:
 *                 type: file
 *                 description: Image of the product (JPEG or PNG)
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - image
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.route('/').post(
        authController.protect,
        productController.uploadProductImages,
        validateMiddleware(validationProduct.createProductJoiSchema),
        productController.resizeProductImages,productController.addProduct)
                                //GET ALL PRODUCTS

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number of the results
 *         required: false
 *         type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         description: Maximum number of results per page
 *         required: false
 *         type: integer
 *         example: 10
 *       - in: query
 *         name: sort
 *         description: Field to sort the results by (prefix with "-" for descending order)
 *         required: false
 *         type: string
 *         example: -price
 *       - in: query
 *         name: fields
 *         description: Fields to include in the results (separate by commas)
 *         required: false
 *         type: string
 *         example: name,price,image
 *       - in: query
 *         name: category
 *         description: ID of the category to filter by
 *         required: false
 *         type: string
 *         example: 60f6c64d7f268409a8ae1c23
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 20
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

.get(productController.getAllProducts)

                                //GET PRODUCT BY ID
/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.route('/:id').get(productController.getOneProduct)
                                        //UPDATE PRODUCT BY ID
/**
 * @swagger
 * /api/v1/products/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Update a product by ID
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
 *         description: ID of the product to update
 *         required: true
 *         type: string
 *         example: 609057fc14c20500157f0e22
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *               description:
 *                 type: string
 *                 description: Description of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               category:
 *                 type: string
 *                 description: ID of the category associated with the product
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image of the product
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *             example:
 *               name: Updated Product
 *               description: This is an updated product
 *               price: 200
 *               category: 60905a8a14c20500157f0e23
 *               brand: Apple
 *               quantity: 10
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
.patch(authController.protect,productController.uploadProductImages,
        validateMiddleware(validationProduct.updateProductJoiSchema),
        productController.resizeProductImages,productController.updateOneProduct)

                                            //DELETE PRODUCT BY ID
/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by ID
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
 *         description: ID of the product to be deleted
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */

.delete(authController.protect,productController.deleteOneProduct)

module.exports =router;