import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import Results from "./Results";
import { getAllCars } from "../../services/CarService.js";
import { filterCars } from "../../utils/carFilters.js";
import sortCars from "../../utils/sortCars.js";

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
  const [sortOption, setSortOption] = useState("");

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

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Filter the cars based on search criteria
  const filteredCars = filterCars(cars, searchCriteria);

  // Sort the filtered cars based on sort option
  const sortedCars = sortCars(filteredCars, sortOption);

  return (
    <div className="vehicleSearch">
      <div className="search-container">
        <SearchForm searchCriteria={searchCriteria} onSearch={handleSearch} />
      </div>
      <Results
        cars={sortedCars} 
        loading={loading}
        onSortChange={handleSortChange} 
      />
    </div>
  );
};

export default VehicleSearch;
