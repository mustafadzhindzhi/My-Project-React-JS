import React, { useState, useEffect } from "react";
import * as carService from "../../services/CarService.js";

const SearchForm = ({ searchCriteria, onSearch }) => {
  const initialFormData = {
    category: "",
    brand: "",
    model: "",
    minPrice: 0,
    maxPrice: 0,
    minRange: 0,
    maxRange: 0,
    transmission: "",
    fuel: "",
    comforts: [],
  };

  const [carBrands, setCarBrand] = useState([[], {}]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [comfortsVisible, setComfortsVisible] = useState(false);
  const [selectedBrandModel, setSelectedBrandModel] = useState({
    brand: "",
    model: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await carService.getCarBrands();
        setCarBrand(data);
      } catch (err) {
        console.log("Error fetching car brands date:", err);
      }
    };
    fetchBrands();
  }, []);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    let newCategory = formData.category;

    if (name === "category") {
      newCategory = formData.category === value ? "" : value;
    }

    let newValue = value;

    if (type === "range") {
      newValue = parseInt(value, 10);
    }

    const newFormData = {
      ...formData,
      [name]: newValue,
      category: newCategory,
    };

    if (name === "brand") {
      setSelectedBrand(newValue);
      setSelectedModel("");
      newFormData.model = "";
    }

    if (name === "model") {
      setSelectedModel(newValue);
    }

    setFormData(newFormData);

    const checkbox = event.target.closest(".check");
    if (checkbox) {
      checkbox.classList.toggle("selected", newCategory === value);
    }
  };

  const handleSliderChange = (event) => {
    const { name, value } = event.target;
    const intValue = parseInt(value, 10);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: intValue,
      minPrice: name === "minRange" ? intValue : prevFormData.minPrice,
      maxPrice: name === "maxRange" ? intValue : prevFormData.maxPrice,
    }));
  };

  const handleCategoryClick = (event, category) => {
    event.preventDefault();
    const newCategory = formData.category === category ? "" : category;
    setFormData({ ...formData, category: newCategory });
  };

  const handleComfortChange = (event) => {
    const { name, value } = event.target;

    const newComforts = [...formData.comforts];

    if (newComforts.includes(value)) {
      const index = newComforts.indexOf(value);
      if (index !== -1) {
        newComforts.splice(index, 1);
      }
    } else {
      newComforts.push(value);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      comforts: newComforts,
    }));
  };

  const toggleComforts = () => {
    setComfortsVisible((prev) => !prev);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearch(formData);
  };

 const handleSearchClick = () => {
  const transformedFormData = {
    brand: selectedBrandModel.brand,
    model: selectedBrandModel.model,
    transmission: formData.transmission,
    fuel: formData.fuel,
    comforts: formData.comforts,
  };

  if (formData.minRange !== 0) {
    transformedFormData.minPrice = formData.minRange;
  }

  if (formData.maxRange !== 0) {
    transformedFormData.maxPrice = formData.maxRange;
  }

  console.log("Chosen search criteria:", transformedFormData);

  onSearch(transformedFormData);
};
  

  const handleBrandChange = (event) => {
    const newBrand = event.target.value;
    console.log("New Brand:", newBrand);
    setSelectedBrandModel((prev) => ({ ...prev, brand: newBrand }));

    if (!carBrands[1][newBrand]?.includes(selectedBrandModel.model)) {
      setSelectedBrandModel((prev) => ({ ...prev, model: "" }));
    }
  };
  const handleModelChange = (event) => {
    const newModel = event.target.value;
  console.log("New Model:", newModel);
  setSelectedBrandModel((prev) => ({ ...prev, model: newModel }));
  };
  

  // useEffect(() => {
  //   if (searchCriteria && searchCriteria.cars) {
  //     const newFilteredCars = searchCriteria.cars.filter((car) => {
  //       const carBrand = car.brand.toLowerCase();
  //       const carModel = car.model.toLowerCase();
  //       const selectedBrand = formData.brand.toLowerCase();
  //       const selectedModel = formData.model.toLowerCase();

  //       const brandMatches = selectedBrand
  //         ? carBrand.includes(selectedBrand)
  //         : true;
  //       const modelMatches = selectedModel
  //         ? carModel.includes(selectedModel)
  //         : true;
  //       const transmissionMatches = formData.transmission
  //         ? car.transmission.trim().toLowerCase() ===
  //           formData.transmission.trim().toLowerCase()
  //         : true;
  //       const fuelMatches = formData.fuel
  //         ? car.fuel.toLowerCase() === formData.fuel.toLowerCase()
  //         : true;

  //       return (
  //         brandMatches && modelMatches && transmissionMatches && fuelMatches
  //       );
  //     });

  //     setFilteredCars(newFilteredCars);
  //   }
  // }, [searchCriteria, formData]);

  return (
    <>
      <div className="searchForm">
        <h2>Search car</h2>
        <div className="vehicleFormSearch">
          <form name="car-form" className="form" onSubmit={handleFormSubmit}>
            <fieldset className="fieldset_fieldset1">
              {["New", "Used", "For parts"].map((category) => (
                <label
                  key={category}
                  className={`check ${
                    formData.category === category ? "selected" : ""
                  }`}
                  onClick={(event) => handleCategoryClick(event, category)}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={formData.category === category}
                    onChange={() => {}} 
                  />
                  <span className="checkBoxTag">{category}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className="brand-fieldset">
        <label htmlFor="brand">Brand:</label>
        <select
          id="brand"
          onChange={handleBrandChange}
          value={selectedBrandModel.brand}
        >
          <option value="">---</option>
          {carBrands[0].length > 0 &&
            carBrands[0].map((brand) => (
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
          onChange={handleModelChange}
          value={selectedBrandModel.model}
        >
          <option value="">---</option>
          {carBrands[1][selectedBrandModel.brand]?.map((model) => (
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
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
                <option value="semi-Automatic">Semi-Automatic</option>
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
                <option value="diesel">Diesel</option>
                <option value="gasoline">Gasoline</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
                <option value="gas">Gas</option>
              </select>
            </fieldset>
            <fieldset className="comfort-fieldset">
              <div className="comfort-toggle" onClick={toggleComforts}>
                <button id="toggle-comforts">
                  Comforts{" "}
                  <span
                    className={`arrow ${
                      comfortsVisible ? "arrow-up" : "arrow-down"
                    }`}
                  ></span>
                </button>
              </div>
              <div
                className={`comfort-list ${
                  comfortsVisible ? "visible" : "hidden"
                }`}
              >
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
