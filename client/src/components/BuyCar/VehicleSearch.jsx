import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import Results from "./Results";
import { getAllCars } from "../../services/CarService.js";
import { filterCars } from "../../utils/carFilters.js";

const VehicleSearch = () => {
  const [cars, setCars] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    brand: "",
    model: "",
    minPrice: 0,
    maxPrice: 100000,
    transmission: "",
    fuel: "",
    comforts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  const filteredCars = filterCars(cars, searchCriteria); 

  return (
    <div className="vehicleSearch">
      <div className="search-container">
        <SearchForm searchCriteria={searchCriteria} onSearch={handleSearch} />
      </div>
      <Results cars={filteredCars} loading={loading} />
    </div>
  );
};

export default VehicleSearch;
