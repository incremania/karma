const { Schema, default: mongoose } = require('mongoose');
const { isEmail } = require('validator')


const newsletterSchema = new Schema({
    email: {
        type: String,
        validate: [isEmail, 'please provide a valid email'],
        required: [true, 'please provide an email']
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Newsletter', newsletterSchema)