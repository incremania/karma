const cloudinary = require('cloudinary').v2;
const Product = require('../models/ProductModel')
const fs = require('fs')

const uploadImages =async (req, res) => {
  
 try {
  if (!req.files) {
    return res.status(400).json({ error: "Please upload at least one image" });
  }

  if (!req.files.images) {
    return res.status(400).json({ error: "Please make sure you are using images not image" });
  }


  let productImages = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
  const uploadPromises = productImages.map(async (image) => {
    try {
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        use_filename: true,
        folder: 'product_image',
      });
      fs.unlinkSync(image.tempFilePath)
      
      return { src: result.secure_url, publicId: result.public_id };
    } catch (error) {
      return { error: `Error uploading image: ${error.message}` };
    }
  });

  const uploadedImages = await Promise.all(uploadPromises);

  res.status(200).json({ status: "succes", message: "product image created successfully", images: uploadedImages });
 } catch (error) {

  res.status(500).json({ error })
 }
};

const updateProductImage = async (req, res) => {
  try {
      const{ productId} = req.params;

      if (!req.files) {
          return res.status(400).json({ error: 'Please provide a valid image for update.' });
      }

      const productImage = req.files.images;

      if (!productImage || !productImage.tempFilePath) {
          return res.status(400).json({ error: 'Please provide a valid image for update.' });
      }

      // Check for MIME type
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more if needed
      if (!allowedMimeTypes.includes(productImage.mimetype)) {
          return res.status(400).json({ error: 'Only JPEG, PNG, and GIF images are allowed.' });
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
          use_filename: true,
          folder: 'product_images'
      });
      fs.unlinkSync(image.tempFilePath)

      // Update the product with the new image URL
      const updatedProduct = await Product.findByIdAndUpdate(productId, { $push: { images: result.secure_url } }, { new: true });

      if(!updatedProduct) {
                  return res.status(400).json({ error: 'Only JPEG, PNG, and GIF images are allowed.' });
      }

      res.status(200).json({ status: "succes",message: 'Product image updated successfully', product: updatedProduct });
  } catch (error) {
   
      res.status(500).json({ error: error.message });
  }
};



const deleteProductImage = async (req, res) => {
  try {
    // Receive product ID and image public ID from request parameters
    const { productId, publicId } = req.params;

    // Delete the image from Cloudinary using its public ID
     await cloudinary.uploader.destroy(publicId);
 
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.images = product.images.filter(image => image.publicId !== publicId);
    await product.save();

    res.status(200).json({ status: "succes",message: 'Product image deleted successfully' });
  } catch (error) {
   
    res.status(500).json({ error: 'Internal server error' });
  }
};





module.exports = { uploadImages, updateProductImage, deleteProductImage}


// store-api/tmp-2-1708799163856_zeckpy