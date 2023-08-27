const express = require('express')
const router = express.Router()
const path = require('path')

//^ means at the beginning of string only, $ means the end, this means we only look for /, which is our root
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router