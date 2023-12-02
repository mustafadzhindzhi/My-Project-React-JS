import React, { useState, useEffect } from "react";

import * as carService from "../../services/CarService.js";
import CarListItem from "./carListItem/CarListItem.jsx";

const Results = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [sortOption, setSortOption] = useState("");
  const [numDisplayedProducts, setNumDisplayedProducts] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    carService.getAll()
      .then((result) => {
        setProducts(result);
        setSortedProducts(result);
        setNumDisplayedProducts(result.length);
        setTotalProducts(result.length);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (sortOption !== "") {
      const sortedProductCopy = [...products];

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
        // default:
        //   setSortedProducts([...products]);
      }
      setSortedProducts(sortedProductCopy);
    }
  }, [products, sortOption]);

  const productsToDisplay = sortedProducts.length > 0 ? sortedProducts : products;

  const productElements = productsToDisplay.map((product) => {
    return (
      <CarListItem
        key={product._id}
        brand={product.brand}
        model={product.model}
        price={product.price}
        image={product.image}
        description={product.description}
      />
    );
  });

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
            <option value="oldest">Oldest</option>
            <option value="newest">Newest</option>
          </select>
        </fieldset>
      </div>
      <div className="products-container">{productElements}</div>
    </div>
  );
};

export default Results;