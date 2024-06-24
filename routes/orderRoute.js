const express = require('express');
const router = express.Router();

const { authenticateUser, authorizePermissions} = require('../middlewares/authenticateUser')
const  {
    createOrder,
    getAllOrder,
    getSingleOrder,

    updateOrder
} = require('../controllers/orderContoller')

router
.post('/order', createOrder)
.get('/order', authenticateUser, authorizePermissions('admin') , getAllOrder)
.get('/order/:orderId', getSingleOrder)
.patch('/order/:orderId', updateOrder)



module.exports = router