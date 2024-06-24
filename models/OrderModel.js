const { Schema, default: mongoose } = require('mongoose');

const SingleOrderItemSchema = new Schema({
    name: {type: String, required: true},
    image: {type: [String], required: true},
    price: {type: Number, required: true},
    quantity: {type: String, required: true},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

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
        enum: ['pending', 'failed', 'paid', 'delivered', 'cancelled'],
        default: 'pending'
    }
    
},
{timestamps: true}
)

module.exports = mongoose.model('Order', OrderSchema)









