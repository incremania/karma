const Product = require('../models/ProductModel');
const asyncWrapper = require('../middlewares/asyncWrapper');
const Order = require('../models/OrderModel')



const dataTotal = async (req, res) => {
  try {

    const products = await Product.find({});
    const totalProduct = products.length;


    const orders = await Order.find({});
    const totalOrder = orders.length;


    const recentProducts = await Product.find({})
      .sort({ createdAt: -1 }) 
      .limit(5); 

    res.status(200).json({
      message: "success",
      totalProduct: totalProduct,
      totalOrder: totalOrder,
      recentProductDetails: recentProducts 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error", error: error.message });
  }
};



// create product controller;

const deleteAll = async(req, res) => {
    await Product.deleteMany({})
    res.status(200).json( 'deleted')
}

const createProduct = asyncWrapper(async(req, res) => {
    const {categories, name, price, quantity, images, description} = req.body
    const product = await Product.create({
        name,
        price,
        quantity,
        images,
        description,
        categories,
        createdBy: req.user.userId
    })
    
    res.status(201).json({ product})
})

// get all product 

const getAllProduct = asyncWrapper(async(req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 }) ;
    if(!products) {
        return res.status(404).json({ message: 'no products avaialable yet'})
    }
   
    res.status(200).json({status: "succes", nbHits: products.length, products })
})

const getSingleProduct = asyncWrapper(async(req, res) => {
    const { productId } = req.params;
    const product = await Product.findOne({_id: productId});
    if(!product) {
        return res.status(404).json({error: 'no product with id ' + productId + ' found'})
    }

    res.status(200).json({status: "succes", product });
})

const updateProduct = asyncWrapper(async(req, res) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true, runValidators: true
    })
    if(!product) {
        return res.status(404).json({error: 'no product with id ' + productId + ' found'})
    }

    res.status(200).json({ product })
})

const deleteProduct = asyncWrapper(async(req, res) => {
    const { productId } = req.params;
   const product = await Product.findByIdAndDelete(productId)
   if(!product) {
    return res.status(404).json({error: 'no product with id ' + productId + ' found'})
}

   res.status(200).json({ status: "succes", message: 'product deleted' })
})



module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    deleteAll,
    dataTotal
}
