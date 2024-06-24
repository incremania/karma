const cloudinary = require('cloudinary').v2;
const Blog = require('../models/BlogModel')
const fs = require('fs');

const uploadBlogImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    const image = req.files.image;

    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      use_filename: true,
      folder: 'blog_images',
    });

    fs.unlinkSync(image.tempFilePath)
    
    res.status(200).json({ status: "success", image: result.secure_url, publicId: result.public_id  });
  } catch (error) {

    res.status(500).json({status: "error", error:  error.error });
  }
};


const updateBlogImage = async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    const image = req.files.image;

    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      use_filename: true,
      folder: 'blog_images',
    });

    fs.unlinkSync(image.tempFilePath)
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, { image: result.secure_url }, { new: true });

    res.status(200).json({status: "success", message: "blog image updated successfully", blog: updatedBlog });
  } catch (error) {
   
    res.status(500).json({ error: error.message });
  }
};

const deleteBlogImage = async (req, res) => {
  try {
    // Receive blog ID and image public ID from request parameters
    const { blogId, publicId } = req.params;

    // Delete the image from Cloudinary using its public ID
     await cloudinary.uploader.destroy(publicId);
 
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    blog.images = blog.images.filter(image => image.publicId !== publicId);
    await blog.save();

    res.status(200).json({status: "success",  message: 'Blog image deleted successfully', });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  uploadBlogImage,
  updateBlogImage,
  deleteBlogImage
}
  
