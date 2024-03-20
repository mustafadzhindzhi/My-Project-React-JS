const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cars',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, {timestamps: true});

const LikeModel = mongoose.model('Like', likeSchema);

module.exports = LikeModel