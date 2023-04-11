const express = require('express');
const router = express.Router();

const {login} = require('./../controlers/login')

router.get("/", login)

module.exports = router