const mongoose = require('mongoose');

const connectDb = (url) => {
   
      mongoose.connect(url, {
            family: 4
        })
   
}

module.exports = connectDb



