const Newsletter = require('../models/newsletterModel');
const asyncWrapper = require('../middlewares/asyncWrapper');

const newsletterEmails = asyncWrapper(async(req, res) => {
    const { email } = req.body;
    if(!req.body) {
        return res.status(400).json({ error: 'please enter an email'})
    }
    const newsletterEmails = await Newsletter.create({email})
    res.status(200).json({ status: "succes", message: "newsletter created succesfully", newsletterEmails})
})

const getAllNewsletterEmails = asyncWrapper(async(req, res) => {
    const newsletterEmails = await Newsletter.find({});
    if(!newsletterEmails) {
        return res.status(400).json({ error: 'no emails for news letter currently'})
    }
    res.status(200).json({status: "succes", nbHits: newsletterEmails.length, newsletterEmails })
})

const getSingleNewsletterEmail = asyncWrapper(async(req, res) => {
    const { emailId } = req.params;
    const newsletterEmail = await Newsletter.findOne({ _id: emailId})
    if(!newsletterEmail) {
        return res.status(400).json({ error: 'no email with id ' + newsletterEmail + ' found'})
    }
    res.status(200).json({ status: "succes", newsletterEmail})
})

const deleteNewsletterEmail = asyncWrapper(async(req, res) => {
    const { emailId } = req.params;
    const newsletterEmail = await Newsletter.findByIdAndDelete({ emailId})
    if(!newsletterEmail) {
        return res.status(400).json({ error: 'no email with id ' + newsletterEmail + ' found'})
    }
    res.status(200).json({status: "success", message: 'email deleted'})
})

module.exports = {
    newsletterEmails,
    getAllNewsletterEmails,
    getSingleNewsletterEmail,
    deleteNewsletterEmail
}