const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const NewsModel = mongoose.model('News', newsSchema);

module.exports = NewsModel;
