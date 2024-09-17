const  Order = require('../models/OrderModel')
const Product = require('../models/ProductModel')

// const createOrder = async(req, res) => {
//   try {
//     const { orderItems, shippingFee} = req.body

//     if (!orderItems || !Array.isArray(orderItems) || orderItems.length < 1) {
//         return res.status(400).json({ error: 'Invalid or empty order items array' });
//       }
//       if (typeof shippingFee !== 'number' || isNaN(shippingFee) || shippingFee <= 0) {
//         return res.status(400).json({ error: 'Invalid or missing shipping fee' });
//       }

//     let cartItems = [];
//     let subtotal = 0

//     for(const item of orderItems){
//         const dbProduct = await Product.findOne({ _id: item.product})
//         console.log(dbProduct._id)
//         if(!dbProduct) {
//             return res.status(400).json({ error: 'no product found'})
//         }
//         const { name, image, price, _id } = dbProduct;

//         console.log(price, name, image, _id)

//         const singleOrderItem = {
//             quantity: item.quantity,
//             name,
//             image,
//             price,
//             product: _id
//         }

//         cartItems = [...cartItems, singleOrderItem]
//         subtotal += item.quantity * price

//     }



//     const total = shippingFee + subtotal
    
//     const order = await Order.create({
//         shippingFee,
//         subtotal,
//         total,
//         orderItems: cartItems
//     })      

//     res.status(200).json({status: "succes", message: "order created successfully" ,order})
//   } catch (error) {
   
//     res.status(500).json({error})
//   }

// }

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingFee } = req.body;

    // Validation
    if (!orderItems || !Array.isArray(orderItems) || orderItems.length < 1) {
      return res
        .status(400)
        .json({ error: "Invalid or empty order items array" });
    }
    if (
      typeof shippingFee !== "number" ||
      isNaN(shippingFee) ||
      shippingFee <= 0
    ) {
      return res.status(400).json({ error: "Invalid or missing shipping fee" });
    }

    let cartItems = [];
    let subtotal = 0;

    // Fetch products in bulk
    const productIds = orderItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    // Create a map of products for quick lookup
    const productMap = products.reduce((acc, product) => {
      acc[product._id.toString()] = product;
      return acc;
    }, {});

    // Process order items
    for (const item of orderItems) {
        if(!item.quantity) {
            return res.status(400).json({ error: "Invalid or missing quantity" });
        }
      const dbProduct = productMap[item.product.toString()];
      if (!dbProduct) {
        return res
          .status(400)
          .json({ error: `Product not found for ID ${item.product}` });
      }
  

      const { product_name, images, product_price, _id } = dbProduct;
    

      if (!product_name || !product_price) {
        return res.status(400).json({ error: "Product data is incomplete" });
      }

      const singleOrderItem = {
        quantity: item.quantity,
        product_name,
        images,
        product_price,
        product: _id,
      };

      cartItems.push(singleOrderItem);
      subtotal += item.quantity * product_price;
    }

    // Ensure subtotal and total are numbers
    subtotal = parseFloat(subtotal);
    const total = parseFloat(shippingFee) + subtotal;

    // Create the order
    const order = await Order.create({
      shippingFee: parseFloat(shippingFee),
      subtotal,
      total,
      orderItems: cartItems,
    });

    res
      .status(201)
      .json({
        status: "success",
        message: "Order created successfully",
        order,
      });
  } catch (error) {
    console.error("Error creating order:", error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllOrder = async(req, res) => {
    try {
      const orders = await Order.find({}).sort({ createdAt: -1 }) 
      res.status(200).json({status: "succes", nbHits: orders.length, orders})  
    } catch (error) {
        res.status(500).json({error})
    }
}


const getSingleOrder = async(req, res) => {
    try {
        const { orderId } = req.params
        if(!orderId.length == 24) {
            return res.status(400).json({ error: 'invalid id'})
        }
        const order = await Order.findOne({_id: orderId});
        if(!order) {
            return res.status(404).json({ error: 'order not found'})
        }

        res.status(200).json({status: "succes",  order })

    } catch (error) {
        res.status(500).json({ error })
    }
}


const updateOrder = async(req, res) => {
    try {
        const { orderId } = req.params
        if(!orderId.length == 24) {
            return res.status(400).json({ error: 'invalid id'})
        }
        const order = await Order.findOne({_id: orderId});
        if(!order) {
            return res.status(404).json({ error: 'order not found'})
        }
        order.status = 'paid'
        await order.save()
        res.status(200).json({status: "succes", message: "order updated successfully", order })
    } catch (error) {
        res.status(500).json({ error })
    }
    
}


module.exports = {
    createOrder,
    getAllOrder,
    getSingleOrder,
    updateOrder
}