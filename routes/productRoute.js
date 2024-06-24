const express = require('express');
const router = express.Router()
const {createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct} = require('../controllers/productContoller');
const { uploadImages, 
    updateProductImage,
     deleteProductImage} = require('../controllers/productImageController')
const {authenticateUser, authorizePermissions} = require('../middlewares/authenticateUser')


    router
    .post('/product', authenticateUser, authorizePermissions('admin'), createProduct)
    .post('/image/upload', authenticateUser, authorizePermissions('admin'), uploadImages )
    .patch('/image/upload/:productId', authenticateUser, authorizePermissions('admin'), updateProductImage)
    .delete('/image/delete/:productId/:publicId', authenticateUser, authorizePermissions('admin'), deleteProductImage)
    .get('/all', getAllProduct)
    .get('/:productId', authenticateUser, authorizePermissions('admin'), getSingleProduct)
    .patch('/:productId', authenticateUser, authorizePermissions('admin'), updateProduct)
    .delete('/:productId', authenticateUser, authorizePermissions('admin'), deleteProduct)
    

module.exports = router
