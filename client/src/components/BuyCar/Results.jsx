import React from "react";
import CarListItem from "./carListItem/CarListItem.jsx";
import sortCars from "../../utils/sortCars.js";
import { useState } from "react";

const Results = ({ cars, loading }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
    const sortedCars = sortCars(cars, option);
    setCars(sortedCars);
  };

  let productElements;
  if (loading) {
    productElements = <p>Loading...</p>;
  } else if (cars.length > 0) {
    productElements = cars.map((car) => (
      <CarListItem
        key={car._id}
        brand={car.brand}
        model={car.model}
        price={car.price}
        image={car.image}
        description={car.description}
        _id={car._id}
      />
    ));
  } else {
    productElements = (
      <p
        style={{
          fontSize: "1.5em",
          fontWeight: "bold",
          margin: "10px 0",
          textAlign: "center",
          color: "red",
        }}
      >
        No cars found.
      </p>
    );
  }

  return (
    <div className="results">
      <div className="topBar">
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
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </fieldset>
      </div>
      <div className="products-container">{productElements}</div>
    </div>
  );
};

export default Results;
