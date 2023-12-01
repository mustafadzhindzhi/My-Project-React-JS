import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import * as carService from "../../../services/CarService.js"

export default function SellYourCar() {
  const navigate = useNavigate();

  const createCarSubmitHandler = async(e) => {
    e.preventDefault();

    const carData = Object.fromEntries(new FormData(e.currentTarget));

    try{
      await carService.create(carData);
      navigate('/BuyCar')
    }catch(err) {
      console.log(err);
    }
  }
  const brands = ['---', 'Audi', 'BMW', 'Mercedes', 'Suzuki', 'Toyota'];
  
  const modelsByBrand = {
    Audi: ['A4', 'A5', 'A6', 'A7'],
    BMW: ['X1', 'X3', 'X5', 'X7'],
    Mercedes: ['C 180', 'C 220', 'C 320', 'GLK'],
    Suzuki: ['Kizashi', 'Jimny', 'Vitara'],
    Toyota: ['4Runner', 'Land Cruiser', 'Avensis', 'CH-R'],
  };

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setSelectedModel('');
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  return (
    <div className="create-container">
      <div className="background-image" />
      <div className="product-form-container" onSubmit={createCarSubmitHandler}>
        <div className="form-info">
          <h2>Sell Your Car</h2>
          <p>
            Fill out the details below to list your car for sale on our website.
            Make sure to provide accurate information to attract potential
            buyers.
          </p>
        </div>
        <div className="form-group form-group-left">
        <label htmlFor="brand">Brand:</label>
        <select id="brand" onChange={handleBrandChange} value={selectedBrand}>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group form-group-left">
        <label htmlFor="model">Model:</label>
        <select id="model" onChange={handleModelChange} value={selectedModel}>
          <option value="">---</option>
          {modelsByBrand[selectedBrand]?.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
        <div className="form-group form-group-left">
          <label htmlFor="fuel">Fuel:</label>
          <select id="brand">
            <option value>---</option>
            <option value="automatic">Diesel</option>
            <option value="manual">Gasoline</option>
            <option value="semi-Automatic">Hybrid</option>
            <option value="semi-Automatic">Electric</option>
            <option value="semi-Automatic">Gas</option>
          </select>{" "}
        </div>
        <div className="form-group form-group-left">
          <label htmlFor="transmission">Transmission:</label>
          <select id="transmission">
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
        <div className="form-group form-group-right" style={{ backgroundColor: "none" }}>
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
                  id="comfort1"
                  name="comfort"
                  defaultValue="comfort1"
                />{" "}
                Leather seats
              </label>
              <label>
                <input
                  type="checkbox"
                  id="comfort2"
                  name="comfort"
                  defaultValue="comfort2"
                />{" "}
                Climate control
              </label>
              <label>
                <input
                  type="checkbox"
                  id="comfort3"
                  name="comfort"
                  defaultValue="comfort3"
                />{" "}
                Auto/Start Stop Function
              </label>
              <label>
                <input
                  type="checkbox"
                  id="comfort4"
                  name="comfort"
                  defaultValue="comfort4"
                />{" "}
                Bluetooth
              </label>
              <label>
                <input
                  type="checkbox"
                  id="comfort5"
                  name="comfort"
                  defaultValue="comfort5"
                />
                Steptronic, Tiptronic
              </label>
              <label>
                <input
                  type="checkbox"
                  id="comfort6"
                  name="comfort"
                  defaultValue="comfort6"
                />
                Bordcomputer
              </label>
            </div>
          </fieldset>
        </div>
        <div className="form-group">
          <label htmlFor="transmission">Type:</label>
          <select id="transmission">
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
          <label htmlFor="product-image">Product Images (up to 3):</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="link to image"
          />
          <input
            type="text"
            id="image"
            name="image"
            placeholder="link to image"
          />
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
      </div>
    </div>
  );
}