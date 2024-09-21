const { Schema, default: mongoose } = require('mongoose');

const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'please provide a blog title']
    },
    post: {
        type: String,
        required: [true, 'please make your post']
    },
    description: {
        type: String,
        required: [true, 'please provide blog description']
    },
    image:  {
        src: {
            type: String,
            required: [true, 'Image source is required']
        },
        publicId: {
            type: String,
            required: [true, 'Image public ID is required']
        }
    }
},
{timestamps: true}
)

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog