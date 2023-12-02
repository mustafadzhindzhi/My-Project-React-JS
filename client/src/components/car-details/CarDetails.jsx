import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as carService from "../../services/CarService.js";
import AuthContext from "../../contexts/authContext.jsx";

export default function CarDetails() {
  const navigate = useNavigate();
  const { email, userId } = useContext(AuthContext);
  const [car, setCar] = useState({});
  const { carId } = useParams();

  useEffect(() => {
    carService.getOne(carId)
      .then((carData) => {
        setCar(carData); 
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  }, [carId, navigate]);
  
  return (
    <div>
      <div>
      {Object.keys(car).length === 0 && <p>Loading..</p>}
      </div>
      <div className="car-details">
        <div className="car-image">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <img src={car.image} alt={car.brand} />
              </div>
              <div className="swiper-slide">
                <img src="/public/images/audi a4 1.jpeg" alt="Car Image" />
              </div>
              <div className="swiper-slide">
                <img src="assets/images/audi a4 3.jpeg" alt="Car Image" />
              </div>
            </div>
            <div
              className="swiper-button-next"
              style={{ right: "5px", color: "white" }}
            />
            <div
              className="swiper-button-prev"
              style={{ left: "30px", color: "white" }}
            />
          </div>
        </div>
        <div className="car-info">
          <h2>{car.brand} {car.model}</h2>
          <p>Price: ${car.price}</p>
          <p>Brand: {car.brand}</p>
          <p>Model: {car.model}</p>
          <p>Fuel: {car.fuel}</p>
          <p>Transmission: {car.transmission}</p>
          <p>Comfort: {car.comforts}</p>
          <p>
            Rating: <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </p>
          <div className="buttons">
            <button className="like-button">Like</button>
            {userId === car._ownerId && <>
              <button className="like-button">Edit</button>
            <button className="like-button">Delete</button>
            </>}
          </div>
        </div>
      </div>
      <div className="car-description">
        <h2>Car Description</h2>
        <p>This Audi A4 is a premium sedan with excellent features...</p>
      </div>
      <section className="car-description">
        <h3>Description</h3>
        <p>
          This is a detailed description of the car. It provides information
          about the car's features, performance, and more. You can add any
          additional details you want to highlight about the car here.
        </p>
      </section>
    </div>
  );
}
