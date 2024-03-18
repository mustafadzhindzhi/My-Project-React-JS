import React, { useState, useEffect } from "react";
import * as carService from "../../services/CarService.js";
import useSearchForm from "../../utils/searchFormValidations.js";

const SearchForm = ({ onSearch }) => {
  const [selectedBrandModel, setSelectedBrandModel] = useState({
    brand: '',
    model: '',
  });

  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [comfortsVisible, setComfortsVisible] = useState(false);
  const [isSearchFormVisible, setSearchFormVisible] = useState(false);

  const {
    formData,
    handleChange,
    handleSliderChange,
    handleComfortChange,
    handleFormSubmit,
    handleSearchClick,
    handleBrandChange,
    handleModelChange,
  } = useSearchForm(onSearch, setSelectedBrandModel, carBrands);

  const toggleComforts = () => {
    setComfortsVisible(prevVisible => !prevVisible);
  };

  const handleToggleSearchForm = () => {
    setSearchFormVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await carService.getCarBrands();
        const uniqueBrands = [...new Set(data.brands)];
        setCarBrands(uniqueBrands);
        setCarModels(data.modelsByBrand);
      } catch (err) {
        console.log("Error fetching car brands:", err);
      }
    };
    fetchBrands();
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setSearchFormVisible(window.innerWidth >= 768);
    };
  
    window.addEventListener("resize", handleResize);
  
    handleResize();
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="search-toggle-mobile">
        <button
          className="show-search-form"
          id="show-search-form"
          onClick={handleToggleSearchForm}
        >
          {isSearchFormVisible ? "Hide Search" : "Show Search"}
        </button>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .searchForm {
            display: ${isSearchFormVisible ? "block" : "none"};
          }
        }

        @media (min-width: 768px) {
          .searchForm {
            display: block;
          }
        }
      `}</style>
      <div
        className={`searchForm ${isSearchFormVisible ? "visible" : "hidden"}`}
      >
        <h2>Search car</h2>
        <div className="vehicleFormSearch">
          <form
            name="car-form"
            className="form"
            onSubmit={handleFormSubmit}
          >
            <fieldset className="brand-fieldset">
              <label htmlFor="brand">Brand:</label>
              <select
                id="brand"
                name="brand"
                onChange={handleBrandChange}
                value={selectedBrandModel.brand}
              >
                <option value="">---</option>
                {carBrands.length > 0 &&
                  carBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
              </select>
            </fieldset>
            <fieldset className="model-fieldset">
              <label htmlFor="model">Model:</label>
              <select
                id="model"
                name="model"
                onChange={handleModelChange}
                value={selectedBrandModel.model}
              >
                <option value="">---</option>
                {selectedBrandModel.brand &&
                  carModels[selectedBrandModel.brand]?.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
              </select>
            </fieldset>
            <div className="wrapper">
              <h2
                style={{
                  fontSize: "1.3vw",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                Price Range
              </h2>
              <p>Enter or Select min and max price</p>
              <div className="price-input">
                <div className="field">
                  <span>Min</span>
                  <input
                    type="number"
                    value={formData.minRange}
                    className="min-input"
                    name="minRange"
                    readOnly
                  />
                </div>
                <div className="separator">-</div>
                <div className="field">
                  <span>Max</span>
                  <input
                    type="number"
                    value={formData.maxRange}
                    className="max-input"
                    name="maxRange"
                    readOnly
                    max="100000"
                  />
                </div>
              </div>
              <div className="slider">
                <div className="progress"></div>
              </div>
              <div className="range-input">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={formData.minRange}
                  step="1000"
                  className="min-range"
                  name="minRange"
                  onChange={handleSliderChange}
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={formData.maxRange}
                  step="1000"
                  className="max-range"
                  name="maxRange"
                  onChange={handleSliderChange}
                />
              </div>
            </div>
            <fieldset className="brand-fieldset">
              <label htmlFor="transmission">Transmission:</label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
              >
                <option value="">---</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </fieldset>
            <fieldset className="brand-fieldset">
              <label htmlFor="fuel">Fuel:</label>
              <select
                id="fuel"
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
              >
                <option value="">---</option>
                <option value="Diesel">Diesel</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
                <option value="Gas">Gas</option>
              </select>
            </fieldset>
            <fieldset className="comfort-fieldset">
              <div className="comfort-toggle" onClick={toggleComforts}>
                <button type="button" id="toggle-comforts">
                  Comforts{" "}
                  <span
                    className={`arrow ${
                      comfortsVisible ? "arrow-up" : "arrow-down"
                    }`}
                  ></span>
                </button>
              </div>
              <div className={`comfort-list ${comfortsVisible ? "visible" : "hidden"}`}>

                {[
                  "Leather seats",
                  "Climate control",
                  "Auto/Start Stop Function",
                  "Bluetooth",
                  "Steptronic, Tiptronic",
                  "Bordcomputer",
                ].map((comfort, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="comforts"
                      value={comfort}
                      checked={formData.comforts.includes(comfort)}
                      onChange={handleComfortChange}
                    />
                    {comfort}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="show-results">
              <button onClick={handleSearchClick}>Show Results</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchForm;
