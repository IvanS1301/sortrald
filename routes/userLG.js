const express = require('express')

// controller functions
const { signupUserLG, loginUserLG, logoutUserLG } = require('../controllers/userLGController')

const router = express.Router()

// Import the requireAuth middleware
const requireAuth = require('../middleware/requireAuth')

// login route
router.post('/login', loginUserLG)

// signup route
router.post('/signup', signupUserLG)

router.post('/logout', requireAuth, logoutUserLG)

module.exports = router