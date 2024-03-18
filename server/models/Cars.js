const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    _ownerId: String,
    brand: String,
    model: String,
    price: Number,
    transmission: String,
    fuel: String,
    comforts: [String],
    category: String,
    image: String,
    phoneNumber: String,
    description: String,
    _createdOn: Number,
    rating: Number
});

const CarsModel = mongoose.model("Cars", carSchema);

module.exports = CarsModel;
