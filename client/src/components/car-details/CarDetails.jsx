import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as carService from "../../services/CarService.js";
import AuthContext from "../../contexts/authContext.jsx";

export default function CarDetails() {
  const navigate = useNavigate();
  const { email, userId } = useContext(AuthContext);
  const [car, setCar] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const { carId } = useParams();

  useEffect(() => {
    if (!carId) {
      console.error("Invalid carId:", carId);
      navigate('/error');
      return;
    }

    carService.getOne(carId)
      .then((carData) => {
        console.log("Fetched car data:", carData);
        setCar(carData);
        setLikeCount(carData.likes);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
        navigate('/error');
      });
  }, [carId, navigate]);

  const mockCars = [
    { id: '3987279d-0ad4-4afb-8ca9-5b256ae3b298', likes: 0 },
  ];

  const handleLike = () => {
    const likedCar = mockCars.find((car) => car.id === carId);

    if (likedCar) {
      likedCar.likes += 1;
      setLikeCount(likedCar.likes);
      setLiked(true);
    } else {
      console.error("Car not found in mock data");
    }
  };

  
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
          {userId === car._ownerId ? (
            <>
              <button className="like-button">Edit</button>
              <button className="like-button">Delete</button>
            </>
          ) : (
            <>
              <button
                className={`like-button ${liked ? 'liked' : ''}`}
                onClick={handleLike}
                disabled={liked}
              >
                {liked ? 'Liked' : 'Like'}
              </button>
              <span>Likes: {likeCount}</span>
            </>
          )}
        </div>
      </div>
      </div>
      <div className="car-description">
        <h2>Car Description</h2>
        <p>{car.description}</p>
      </div>
    </div>
  );
}
