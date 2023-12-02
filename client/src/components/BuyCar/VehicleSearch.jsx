import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import Results from "./Results";

import * as carService from '../../services/CarService.js';

const VehicleSearch = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    carService.getAll()
      .then((result) => setCars(result))
      .catch(err => {
        console.error(err);
      });
  }, []);

  const [filteredProducts, setFilteredProducts] = useState(cars);
  const [searchCriteria, setSearchCriteria] = useState({
    brand: "",
    model: "",
    minPrice: 0,
    maxPrice: 100000,
    transmission: "",
    fuel: "",
    comforts: [],
  });

  const handleSearch = (criteria) => {
    const newSearchCriteria = {
      ...searchCriteria,
      ...criteria,
    };

    setSearchCriteria(newSearchCriteria);

    const filtered = cars.filter((car) => {
      const brandMatch =
        !newSearchCriteria.brand ||
        newSearchCriteria.brand === "" ||
        car.brand === newSearchCriteria.brand;

      const modelMatch =
        !newSearchCriteria.model || car.model === newSearchCriteria.model;

      const priceMatch =
        (newSearchCriteria.minPrice === 0 ||
          car.price >= newSearchCriteria.minPrice) &&
        (newSearchCriteria.maxPrice === 0 ||
          car.price <= newSearchCriteria.maxPrice);

      const transmissionMatch =
        !newSearchCriteria.transmission ||
        car.transmission.trim().toLowerCase() ===
        newSearchCriteria.transmission.trim().toLowerCase();

      const fuelMatch =
        !newSearchCriteria.fuel ||
        car.fuel.trim().toLowerCase() ===
        newSearchCriteria.fuel.trim().toLowerCase();

      const comfortsMatch =
        newSearchCriteria.comforts.length === 0 ||
        newSearchCriteria.comforts.every((comfort) =>
          car.comforts.includes(comfort)
        );

      return (
        brandMatch &&
        modelMatch &&
        priceMatch &&
        transmissionMatch &&
        fuelMatch &&
        comfortsMatch
      );
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="vehicleSearch">
      <div className="search-container">
        <SearchForm
          searchCriteria={{ ...searchCriteria, cars: filteredProducts }}
          onSearch={handleSearch}
        />
        <Results products={filteredProducts} />
      </div>
    </div>
  );
};

export default VehicleSearch;

