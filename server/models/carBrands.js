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

async function initializeData() {
  const count = await CarBrandsModel.countDocuments();
  if (count === 0) {
    await CarBrandsModel.insertMany(data);
  }
}

initializeData();

module.exports = CarBrandsModel;
