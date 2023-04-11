const express = require('express');
const router = express.Router();

const character = require('./characters')
const favorites = require('./favorites')
const login = require('./login')

router.use("/character", character)
router.use("/favorite", favorites)
router.use("/login", login)

module.exports = router