const mongoose = require('mongoose');
const data = require('../data/carBrands.js');

const carBrandsSchema = new mongoose.Schema({
  brands: [String],
  modelsByBrand: {
    Audi: [String],
    Suzuki: [String],
    BMW: [String],
    Opel: [String],
    Toyota: [String],
    Mercedes: [String],
    Honda: [String],
    Volvo: [String]
  }
});

const CarBrandsModel = mongoose.model('CarBrand', carBrandsSchema);
CarBrandsModel.insertMany(data)

module.exports = CarBrandsModel;
