const { Schema, default: mongoose } = require('mongoose');

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: [true, "product name is required"],
      trim: true,
    },
    product_description: {
      type: String,
      required: [true, "product description/details is required"],
    },
    product_brand: {
      type: String,
      required: [true, "product description/details is required"],
    },
    product_availability: {
      type: String,
      required: [true, "product availability is required"],
    },
    images: [
      {
        publicId: {
          type: String,
          required: true,
        },
        src: {
          type: String,
          required: true,
        },
      },
    ],
    product_price: {
      type: Number,
      required: [true, "product price is required"],
      min: [0, "price cannot be less than $0"],
    },
    sales_price: {
      type: Number,
      min: [0, "price cannot be less than $0"],
    },
    product_size: {
        type: String
    },
    material: {
        type: String,
    },
    quantity: {
      type: Number,
      required: [true, "provide number of quantity available"],
      default: 1,
    },
    categories: {
      type: String,
      enum: {
        values: [
          "corporate wear",
          "text-based tees",
          "casual attire",
          "innerwear essentials",
          "polo shirts",
        ],
        message: "{VALUE} is not supported",
      },
      default: "corporate wear",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const product = mongoose.model('Product', productSchema);

module.exports = product