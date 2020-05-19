require('dotenv').config();

const router = require('express').Router();
const nodemailer = require("nodemailer");
const path = require("path");

router.post("/sendMail", async (req, res) => {
    console.log(req.body);
    let transport = nodemailer.createTransport({
        // service: 'gmail',
        auth: {
            user: 'gustavnode123@gmail.com',
            pass: 'Password123123!'
        },
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
    });
    await transport.sendMail({
        from: process.env.MAIL,
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.message,
        html: req.body.message
    }, (err, data) => {
        if (err) {
            console.log("Fail", err)
        } else {
            console.log("Success: ", data)
        }
    });
    return res.sendFile(path.resolve("public/profile.html"))
});

module.exports = router;
