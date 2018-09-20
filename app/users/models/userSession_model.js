const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    refreshToken: {
        type: String
    }

})

const userSession = mongoose.model('userSession', sessionSchema);
module.exports = userSession;