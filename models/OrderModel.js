const { Schema, default: mongoose } = require('mongoose');

const SingleOrderItemSchema = new Schema({
  product_name: { type: String, required: true },
  images: { type: [String], required: true },
  product_price: { type: Number, required: true },
  quantity: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const OrderSchema = new Schema({
    shippingFee: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    orderItems: [SingleOrderItemSchema],
    status: {
        type: String,
        enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
        default: 'pending'
    }
    
},
{timestamps: true}
)

module.exports = mongoose.model('Order', OrderSchema)









