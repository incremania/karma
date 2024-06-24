const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth')
const {authenticateUser, authorizePermissions} = require('../middlewares/authenticateUser')
const   {
//   updateUser,
  updatePassword,
  getSingleUser,
  getAllUser,
  showCurrentUser,
} = require('../controllers/userController');

router
.post('/register', register)
.post('/login', login)
.get('/user', authenticateUser, authorizePermissions('user', 'admin'), getSingleUser)
.get('/users', authenticateUser, authorizePermissions('admin'), getAllUser)
.patch('/update-password', authenticateUser, authorizePermissions('user', 'admin'), updatePassword)
// .patch('/update-user', authenticateUser, authorizePermissions('user', 'admin'), updateUser)



module.exports = router
