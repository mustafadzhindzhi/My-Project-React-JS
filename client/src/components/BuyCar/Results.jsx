import React, { useState, useEffect } from "react";
import CarListItem from "./carListItem/CarListItem.jsx";

const Results = ({ filteredProducts }) => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [numDisplayedProducts, setNumDisplayedProducts] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const productsToDisplay = filteredProducts !== undefined ? filteredProducts : [];

    setSortedProducts([...productsToDisplay]);
    setNumDisplayedProducts(productsToDisplay.length);
    setTotalProducts(productsToDisplay.length);
  }, [filteredProducts]);

  useEffect(() => {
    if (sortOption !== "") {
      const sortedProductCopy = [...sortedProducts];
  
      switch (sortOption) {
        case "priceAscending":
          sortedProductCopy.sort((a, b) => a.price - b.price);
          break;
        case "priceDescending":
          sortedProductCopy.sort((a, b) => b.price - a.price);
          break;
        case "AZ":
          sortedProductCopy.sort((a, b) => a.brand.localeCompare(b.brand));
          break;
        case "ZA":
          sortedProductCopy.sort((a, b) => b.brand.localeCompare(a.brand));
          break;
      }
      setSortedProducts(sortedProductCopy);
    }
  }, [sortOption]);

  const productElements = Array.isArray(filteredProducts)
    ? filteredProducts.map((car) => (
        <CarListItem
          key={car._id}
          brand={car.brand}
          model={car.model}
          price={car.price}
          image={car.image}
          description={car.description}
          _id={car._id}
        />
      ))
    : null;

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
  };

  return (
    <div className="results">
      <div className="topBar">
        <div className="categoryName">
          <label>
            {numDisplayedProducts} products of {totalProducts}
          </label>
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
          </select>
        </fieldset>
      </div>
      <div className="products-container">{productElements}</div>
    </div>
  );
};

export default Results;
