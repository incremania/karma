const { Schema, default: mongoose } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [isEmail, 'enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'password must be greater than 7 characters']
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} is not supported'
        },
        default: 'user'
    }
}, 
{
    timestamps: true
});

userSchema.pre('save', async function() {
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isPasswordMatch = await bcrypt.compare(
    canditatePassword,
    this.password
  );
  return isPasswordMatch;
};



module.exports = mongoose.model('User', userSchema);