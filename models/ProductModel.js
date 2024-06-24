const { Schema, default: mongoose } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'product description/details is required']
    },
    images:  [{
            publicId: {
                type: String,
                required: true
            },
            src: {
                type: String,
                required: true
            }
            
        }],
    price: {
        type: Number,
        required: [true, 'product price is required'],
        min: [0, 'price cannot be less than $0']
    },
    quantity: {
        type: Number,
        required: [true, 'provide number of quantity available'],
        default: 1
    },
    categories: {
        type: String,
        enum: {
            values: ['corporate wear', 'text-based tees', 
        'casual attire', 'innerwear essentials', 'polo shirts'
        ],
        message: '{VALUE} is not supported'
    },
    default: 'corporate wear'
},
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

},
{timestamps: true}
)

const product = mongoose.model('Product', productSchema);

module.exports = product