require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const connectDb = require('./db/connect');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')
const blogRoute = require('./routes/blogRoute');
const newsletterRoute = require('./routes/newsletterRoute');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path')



const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
// middlewares
app.get('/api-docs', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'api.rest'));
  });
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
// app.use(limiter);
app.use(cors());

app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json());
app.use(fileUpload({ useTempFiles: true}))
// routes
app.use( userRoute)
app.use('/product', productRoute)
app.use(blogRoute)
app.use(newsletterRoute)
app.use(orderRoute)

app.get('/', (req, res) => {
    res.status(200).json('<h1> store api <a href="/api/v1/sennheiser">products</a></h1>')
})

  
// error middlewares'
app.use(notFound)

app.use(errorHandler)

// routes


// connect to database
const port = process.env.PORT || 3000

const startDb = async() => {
    try {
        connectDb(process.env.MONGO_URI_LOCAL)
        app.listen(port, console.log('listening on port ' + port))
    } catch (error) {
        console.log(error);
    }
}

startDb()


