import React, { useState, useEffect } from 'react';

// import * as carService from '../../services/CarService.js';
// import CarListItem from ''

const Results = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    // Sort the products when the products prop changes
    setSortedProducts([...products]);
  }, [products]);


  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    // Sort the products based on the selected option
    switch (option) {
      case 'priceAscending':
        setSortedProducts([...products].sort((a, b) => a.price - b.price));
        break;
      case 'priceDescending':
        setSortedProducts([...products].sort((a, b) => b.price - a.price));
        break;
      case 'AZ':
        setSortedProducts([...products].sort((a, b) => a.brand.localeCompare(b.brand)));
        break;
      case 'ZA':
        setSortedProducts([...products].sort((a, b) => b.brand.localeCompare(a.brand)));
        break;
      default:
        setSortedProducts([...products]);
    }
  };

  const numDisplayedProducts = sortedProducts.length; 
  const totalProducts = products.length; 

  return (
    <div className="results">
      <div className="topBar">
        <div className="categoryName">
          <label>{numDisplayedProducts} products of {totalProducts}</label>
        </div>
        <fieldset className="sortFieldset">
          <label htmlFor="sorting" className="sortLabel">
            Sort:
          </label>
          <select id="sortCar" value={sortOption} onChange={handleSortChange}>
            <option value="">---</option>
            <option value="priceAscending">Price Ascending</option>
            <option value="priceDescending">Price Descending</option>
            <option value="AZ">Brand and model: A-Z</option>
            <option value="ZA">Brand and model: Z-A</option>
            <option value="oldest">Oldest</option>
            <option value="newest">Newest</option>
          </select>
        </fieldset>
      </div>
      <div className="products-container">
        {sortedProducts.map((car, index) => (
           <div className="product" key={index}>
            <div className="image-container">
              <img src={car.image} alt={car.brand} />
            </div>
            <div className="des">
              <span>{car.brand} {car.model}</span>
              <h5>{car.description}</h5>
              <div className="star">
                {Array.from({ length: 5 }).map((_, index) => (
                  <i key={index} className="fas fa-star"></i>
                ))}
              </div>
              <h4>${car.price}</h4>
              <a href={car.detailsLink}>
                <button className="button-style">Show Details</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;


