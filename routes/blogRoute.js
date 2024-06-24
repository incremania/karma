const express = require('express');
const router = express.Router();
const {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController')
const {
    uploadBlogImage,
    updateBlogImage,
    deleteBlogImage
  } = require('../controllers/blogImageController')
const { authenticateUser, authorizePermissions} = require('../middlewares/authenticateUser')


router
.post('/blog', authenticateUser, authorizePermissions('admin'), createBlog)
.post('/blog/image',authenticateUser, authorizePermissions('admin'), uploadBlogImage)
.get('/blog/all',  getAllBlog)
.get('/blog/:blogId',  getSingleBlog)
.patch('/blog/:blogId',authenticateUser, authorizePermissions('admin'), updateBlog)
.patch('/blog/image/:blogId', authenticateUser, authorizePermissions('admin'),updateBlogImage)
.delete('/blog/image/:blogId/:publicId',authenticateUser, authorizePermissions('admin'), deleteBlogImage)
.delete('/blog/:blogId', authenticateUser, authorizePermissions('admin'), deleteBlog)

module.exports = router