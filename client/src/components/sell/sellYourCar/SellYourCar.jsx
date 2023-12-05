import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as carService from "../../../services/CarService.js";

export default function SellYourCar() {
  const navigate = useNavigate();
  const [carBrands, setCarBrands] = useState([[], {}]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedComforts, setSelectedComforts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await carService.getCarBrands();
        setCarBrands(data);
      } catch (err) {
        console.error("Error fetching car brands data:", err);
      }
    };

    fetchData();
  }, []);

  const createCarSubmitHandler = async (e) => {
    e.preventDefault();
  
    const requiredFields = [
      "brand",
      "model",
      "fuel",
      "transmission",
      "price",
      "type",
      "description",
    ];
    const isAnyFieldEmpty = requiredFields.some(
      (field) => !e.currentTarget[field]?.value
    );
  
    if (isAnyFieldEmpty) {
      const errorMessage =
        "All fields are required. Please fill out all required fields.";
      setErrorMessage(errorMessage);
      return;
    }
  
    const formData = new FormData(e.currentTarget);
  
    const imageUrls = Array.from(formData.getAll("image"));
  
    const carData = {
      ...Object.fromEntries(formData),
      brand: selectedBrand,
      model: selectedModel,
      comforts: selectedComforts,
      image: imageUrls,
      likes: 0,
      fuel: formData.get("fuel"),  // Set the "fuel" property
      transmission: formData.get("transmission"),  // Set the "transmission" property
    };
  
    try {
      await carService.create(carData);
      navigate("/BuyCar");
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setSelectedModel("");
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleComfortChange = (event) => {
    const comfort = event.target.value;
    setSelectedComforts((prevComforts) => {
      if (prevComforts.includes(comfort)) {
        return prevComforts.filter((c) => c !== comfort);
      } else {
        return [...prevComforts, comfort];
      }
    });
  };

  return (
    <div className="create-container">
      <div className="background-image" />
      <form className="createform" onSubmit={createCarSubmitHandler}>
        <div className="product-form-container">
          <div className="form-info">
            <h2>Sell Your Car</h2>
            <p>
              Fill out the details below to list your car for sale on our
              website. Make sure to provide accurate information to attract
              potential buyers.
            </p>
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="brand">Brand:</label>
            <select
              id="brand"
              onChange={handleBrandChange}
              value={selectedBrand}
              name="brand"
            >
              <option value="">---</option>
              {carBrands[0].length > 0 &&
                carBrands[0].map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="model">Model:</label>
            <select
              id="model"
              onChange={handleModelChange}
              value={selectedModel}
              name="model"
            >
              <option value="">---</option>
              {carBrands[1][selectedBrand]?.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="fuel">Fuel:</label>
            <select id="fuel" name="fuel">
              <option value>---</option>
              <option value="diesel">Diesel</option>
              <option value="gasoline">Gasoline</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
              <option value="Gas">Gas</option>
            </select>{" "}
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="transmission">Transmission:</label>
            <select id="transmission" name="transmission">
              <option value>---</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="write your price here"
            />
          </div>
          <div
            className="form-group form-group-right"
            style={{ backgroundColor: "none" }}
          >
            <fieldset className="comfort-fieldset">
              <div className="comfort-toggle">
                <button id="toggle-comforts">
                  Comforts <span className="arrow">▼</span>
                </button>
              </div>
              <div className="comfort-list">
                <label>
                  <input
                    type="checkbox"
                    id="Leather seats"
                    name="Leather seats"
                    defaultValue="Leather seats"
                    onChange={handleComfortChange}
                  />{" "}
                  Leather seats
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="Climate control"
                    name="Climate control"
                    defaultValue="Climate control"
                    onChange={handleComfortChange}
                  />{" "}
                  Climate control
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="Auto/Start Stop System"
                    name="Auto/Start Stop System"
                    defaultValue="Auto/Start Stop System"
                    onChange={handleComfortChange}
                  />{" "}
                  Auto/Start Stop System
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="Bluetooth"
                    name="Bluetooth"
                    defaultValue="Bluetooth"
                    onChange={handleComfortChange}
                  />{" "}
                  Bluetooth
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="Steptronic, Tiptronic"
                    name="Steptronic, Tiptronic"
                    defaultValue="Steptronic, Tiptronic"
                    onChange={handleComfortChange}
                  />
                  Steptronic, Tiptronic
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="Bordcomputer"
                    name="Bordcomputer"
                    defaultValue="Bordcomputer"
                    onChange={handleComfortChange}
                  />
                  Bordcomputer
                </label>
              </div>
            </fieldset>
          </div>
          <div className="form-group">
            <label htmlFor="transmission">Type:</label>
            <select id="type" name="type">
              <option value>---</option>
              <option value="new">New</option>
              <option value="manual">Used</option>
              <option value="for-parts">For parts</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="product-image">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="description for the car"
            />
          </div>
          <div className="form-group">
            <label htmlFor="product-image">Product Images:</label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="link to image"
            />
            <div id="image-preview-container" />
          </div>
          <button className="publish-button" type="submit" value="Publish">
            Publish
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}