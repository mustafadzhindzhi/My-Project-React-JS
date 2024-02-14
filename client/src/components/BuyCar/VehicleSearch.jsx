import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import Results from "./Results";
import * as carService from "../../services/CarService.js";

const VehicleSearch = () => {
  const [cars, setCars] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    brand: "",
    model: "",
    minPrice: 0,
    maxPrice: 100000,
    transmission: "",
    fuel: "",
    comforts: [],
  });

  useEffect(() => {
    carService
      .getAll()
      .then((result) => setCars(result))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSearch = (criteria) => {  
    const newSearchCriteria = {
      brand: criteria.brand || "",
      model: criteria.model || "",
      minPrice: criteria.minPrice || 0,
      maxPrice: criteria.maxPrice || 100000,
      transmission: criteria.transmission || "",
      fuel: criteria.fuel || "",
      comforts: criteria.comforts || [],
    };
  
    setSearchCriteria(newSearchCriteria);
  };
  
  useEffect(() => {
    const filtered = cars.filter((car) => {
      const brandMatch =
        !searchCriteria.brand ||
        searchCriteria.brand === "" ||
        car.brand === searchCriteria.brand;

      const modelMatch =
        !searchCriteria.model || car.model === searchCriteria.model;

      const priceMatch =
        (searchCriteria.minPrice === 0 || car.price >= searchCriteria.minPrice) &&
        (searchCriteria.maxPrice === 0 || car.price <= searchCriteria.maxPrice);

      const transmissionMatch =
        !searchCriteria.transmission ||
        car.transmission.trim().toLowerCase() ===
          searchCriteria.transmission.trim().toLowerCase();

      const fuelMatch =
        !searchCriteria.fuel ||
        car.fuel.trim().toLowerCase() === searchCriteria.fuel.trim().toLowerCase();

      const comfortsMatch =
        searchCriteria.comforts.length === 0 ||
        searchCriteria.comforts.every((comfort) =>
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
  }, [searchCriteria, cars]); 

  return (
    <div className="vehicleSearch">
      <div className="search-container">
        <SearchForm
          searchCriteria={{ ...searchCriteria, cars: filteredProducts }}
          onSearch={handleSearch}
        />
      </div>
      <Results
        filteredProducts={filteredProducts}
        searchCriteria={searchCriteria}
      />
    </div>
  );
};

export default VehicleSearch;
