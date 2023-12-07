import React, { useState, useEffect } from "react";
import CarListItem from "./carListItem/CarListItem.jsx";
import { getAllSorted } from "../../services/CarService.js";

const Results = ({ filteredProducts }) => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [numDisplayedProducts, setNumDisplayedProducts] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productsToDisplay =
      filteredProducts !== undefined ? filteredProducts : [];

    setSortedProducts([...productsToDisplay]);
    setNumDisplayedProducts(productsToDisplay.length);
    setTotalProducts(productsToDisplay.length);
  }, [filteredProducts]);

  useEffect(() => {
    if (sortOption !== "") {
      setLoading(true);

      const propList = sortOption.split(",");
      const sortByParam = propList
        .map((prop) => encodeURIComponent(prop))
        .join(",");

      getAllSorted(sortByParam)
        .then((data) => {
          setSortedProducts(data);
          setNumDisplayedProducts(data.length);
          setTotalProducts(data.length);
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching sorted data:", error);
          setLoading(false);
          setError("Error fetching sorted data. Please try again.");
        });
    }
  }, [sortOption]);

  const productElements = Array.isArray(sortedProducts)
    ? sortedProducts.map((car) => (
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

    if (option === "") {
      setSortOption("");
    } else {
      // Split the option into an array
      const propList = option.split(" ");

      // Format the array into a string
      const sortByParam = propList
        .map((prop) => encodeURIComponent(prop))
        .join("%20");

      setSortOption(sortByParam);
    }
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
            <option value="brandModelAscending">Brand and model: A-Z</option>
            <option value="brandModelDescending">Brand and model: Z-A</option>
          </select>
        </fieldset>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="products-container">{productElements}</div>
    </div>
  );
};

export default Results;
