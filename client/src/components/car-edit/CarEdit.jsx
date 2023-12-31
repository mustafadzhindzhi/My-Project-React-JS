import { useNavigate, useParams } from "react-router-dom";

import * as carService from "../../services/CarService.js";
import { useEffect, useState } from "react";

export default function CarEdit() {
  const navigate = useNavigate();
  const { carId } = useParams();
  const [car, setCar] = useState({
    brand: "defaultBrand",
    model: "",
    fuel: "",
    transmission: "",
    price: "",
    description: "",
    comforts: [],
  });

  const [carBrands, setCarBrands] = useState([[], {}]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [showComforts, setShowComforts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carData = await carService.getOne(carId);

        setSelectedBrand(carData.brand || "");
        setSelectedModel(carData.model || "");

        setCar((prevCar) => ({
          ...prevCar,
          ...carData,
          comforts: carData.comforts || [],
        }));

        const brandsData = await carService.getCarBrands();
        setCarBrands(brandsData);
      } catch (err) {
        console.error("Error fetching car data:", err);
      }
    };

    fetchData();
  }, [carId]);

  const editCarSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const values = Object.fromEntries(formData);

      setCar((prevCar) => ({
        ...prevCar,
        ...values,
        brand: prevCar.brand,
        model: prevCar.model,
        comforts: prevCar.comforts || [],
      }));

      await carService.edit(carId, { ...values, comforts: car.comforts });
      navigate("/BuyCar");
    } catch (err) {
      console.error("Error editing car:", err);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "brand") {
      setSelectedBrand(value);
      setSelectedModel("");
    } else if (name === "model") {
      setSelectedModel(value);
    }

    setCar((currentCar) => ({
      ...currentCar,
      [name]: value,
    }));
  };

  const handleComfortChange = (event) => {
    const comfort = event.target.value;
    const isChecked = event.target.checked;

    setCar((prevCar) => {
      const prevComforts = prevCar.comforts || [];

      if (isChecked) {
        return { ...prevCar, comforts: [...prevComforts, comfort] };
      } else {
        const updatedComforts = prevComforts.filter((c) => c !== comfort);
        return { ...prevCar, comforts: updatedComforts };
      }
    });
  };

  const toggleComforts = () => {
    setShowComforts((prevShowComforts) => !prevShowComforts);
  };

  return (
    <div className="create-container">
      <div className="background-image" />
      <form className="createform" onSubmit={editCarSubmitHandler}>
        <div className="product-form-container">
          <div className="form-info">
            <h2>Sell Your Car</h2>
            <p>Change what is needed! Be wise!</p>
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="brand">Brand:</label>
            <select
              name="brand"
              id="brand"
              onChange={onChange}
              value={selectedBrand}
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
              name="model"
              id="model"
              onChange={onChange}
              value={car.model || ""}
              disabled={!car.brand}
            >
              <option value="">---</option>
              {car.brand &&
                carBrands[1][car.brand]?.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="fuel">Fuel:</label>
            <select id="fuel" name="fuel" onChange={onChange} value={car.fuel}>
              <option value>---</option>
              <option value="Diesel">Diesel</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
              <option value="Gas">Gas</option>
            </select>{" "}
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="transmission">Transmission:</label>
            <select
              id="transmission"
              name="transmission"
              onChange={onChange}
              value={car.transmission}
            >
              <option value>---</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="write your price here"
              onChange={onChange}
              value={car.price}
            />
          </div>
          <div
            className="form-group form-group-right"
            style={{ backgroundColor: "none" }}
          >
            <fieldset className="comfort-fieldset">
              <div className="comfort-toggle">
                <div id="toggle-comforts" onClick={toggleComforts}>
                  Comforts{" "}
                  <span className={`arrow ${showComforts ? "up" : "down"}`}>
                    ▼
                  </span>
                </div>
              </div>
              <div className={`comfort-list ${showComforts ? 'visible' : 'hidden'}`}>
                <label>
                  <input
                    type="checkbox"
                    id="Leather seats"
                    name="Leather seats"
                    defaultValue="Leather seats"
                    onChange={handleComfortChange}
                    checked={car.comforts.includes("Leather seats")}
                  />
                  Leather seats
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="Climate control"
                    name="Climate control"
                    defaultValue="Climate control"
                    onChange={handleComfortChange}
                    checked={car.comforts.includes("Climate control")}
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
                    checked={car.comforts.includes("Auto/Start Stop System")}
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
                    checked={car.comforts.includes("Bluetooth")}
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
                    checked={car.comforts.includes("Steptronic, Tiptronic")}
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
                    checked={car.comforts.includes("Bordcomputer")}
                  />
                  Bordcomputer
                </label>
              </div>
            </fieldset>
          </div>
          <div className="form-group">
            <label htmlFor="product-image">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="description for the car"
              onChange={onChange}
              value={car.description}
            />
          </div>
          <div className="form-group form-group-left">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="write your price here"
              onChange={onChange}
              value={car.phoneNumber}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product-image">Product Image:</label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="link to image"
              onChange={onChange}
              value={car.image}
            />
            <div id="image-preview-container" />
          </div>
          <button className="publish-button" type="submit" value="Edit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
