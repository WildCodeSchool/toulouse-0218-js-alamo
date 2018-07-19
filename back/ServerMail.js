const express = require('express')
const bodyParser = require('body-parser')
const sendEmail = require('./Mailer')


app.use(bodyParser.json())

app.post('/send-email', (req, res) => {
const { subject, content } = req.body

})
