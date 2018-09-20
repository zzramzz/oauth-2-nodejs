const { User } = require('../models/user_model');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    console.log("inside dashboard")
    res.send(user)
})
module.exports = router;