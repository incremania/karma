const express = require('express');
const router = express.Router();
const {
    newsletterEmails,
    getAllNewsletterEmails,
    getSingleNewsletterEmail,
    deleteNewsletterEmail
} = require('../controllers/newsletterControllers')


router
.post('/newsletter', newsletterEmails)
.get('/newsletter/all', getAllNewsletterEmails)
.get('/newsletter/:emailId', getSingleNewsletterEmail)
.delete('/newsletter/:emailId', deleteNewsletterEmail)

module.exports = router