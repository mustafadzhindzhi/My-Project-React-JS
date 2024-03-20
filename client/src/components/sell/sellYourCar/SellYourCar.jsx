import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as carService from "../../../services/CarService.js";

const SellYourCar = () => {
  const navigate = useNavigate();
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    fuel: "",
    transmission: "",
    price: "",
    description: "",
    phoneNumber: "",
    image: "",
    comforts: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await carService.getCarBrands();
        setCarBrands(data.brands);
        setCarModels(data.modelsByBrand); 
      } catch (err) {
        console.error("Error fetching car brands data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleComfortChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      comforts: checked
        ? [...prevData.comforts, value]
        : prevData.comforts.filter((comfort) => comfort !== value),
    }));
  };

  const createCarSubmitHandler = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "brand",
      "model",
      "fuel",
      "transmission",
      "price",
      "description",
      "phoneNumber",
    ];

    const isAnyFieldEmpty = requiredFields.some(
      (field) => !formData[field]?.trim()
    );

    if (isAnyFieldEmpty) {
      const errorMessage =
        "All fields are required. Please fill out all required fields.";
      setErrorMessage(errorMessage);
      return;
    }

    try {
      await carService.addCar(formData);
      navigate("/BuyCar");
    } catch (err) {
      console.error(err);
      setErrorMessage("Error occurred while submitting the form.");
    }
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
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            >
              <option value="">---</option>
              {carBrands.map((brand) => (
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
              name="model"
              value={formData.model}
              onChange={handleChange}
            >
              <option value="">---</option>
              {formData.brand &&
                carModels[formData.brand]?.map((model, index) => (
                  <option key={`${model}-${index}`} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group form-group-left">
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
          </div>
          <div className="form-group form-group-left">
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
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="write your price here"
            />
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="description for the car"
            />
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="phoneNumber">Your phone number:</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Write your phone number here"
            />
          </div>
          <div className="form-group form-group-right">
            <fieldset className="comfort-fieldset">
              <div className="comfort-toggle">
                <button id="toggle-comforts2">
                  Comforts <span className="arrow">▼</span>
                </button>
              </div>
              <div className="comfort-list">
                {[
                  "Leather seats",
                  "Climate control",
                  "Auto/Start Stop System",
                  "Bluetooth",
                  "Steptronic, Tiptronic",
                  "Bordcomputer",
                ].map((comfort, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      id={comfort}
                      name={comfort}
                      value={comfort}
                      checked={formData.comforts.includes(comfort)}
                      onChange={handleComfortChange}
                    />
                    {comfort}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="form-group">
            <label htmlFor="product-image">Product Images:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="link to image"
            />
            <div id="image-preview-container" />
          </div>
          <button className="publish-button" type="submit">
            Publish
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default SellYourCar;
