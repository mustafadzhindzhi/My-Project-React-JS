import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as carService from "../../services/CarService.js";
import * as likeService from "../../services/likeService.js";
import AuthContext from "../../contexts/authContext.jsx";
import Path from "../../../paths.js";
import { pathToUrl } from "../../utils/pathUtils.js";

export default function CarDetails() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [car, setCar] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const { carId } = useParams();
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (!carId) {
      console.error("Invalid carId:", carId);
      navigate("/error");
      return;
    }

    carService
      .getOne(carId)
      .then((carData) => {
        setCar(carData);
        setLikeCount(carData.likes);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
        navigate("/error");
      });
  }, [carId, navigate]);

  const handleLike = async () => {
    try {
      if (!carId || !userId) {
        console.error("Invalid carId or userId");
        return;
      }
      const token = localStorage.getItem("accessToken");
      await likeService.addLike({ carId, userId, token });
      const updatedLikeCount = await likeService.getAllLikesForCar(carId);
      setLikeCount(updatedLikeCount);

      setLiked(true);
    } catch (error) {
      console.error("Error liking car:", error);
    }
  };

  useEffect(() => {
    const storedRatings =
      JSON.parse(localStorage.getItem(`carRatings_${carId}`)) || [];
    setRatings(storedRatings);

    const newAverageRating =
      storedRatings.reduce((sum, rating) => sum + rating, 0) /
        storedRatings.length || 0;

    setAverageRating(Math.round(newAverageRating * 10) / 10);
  }, [carId]);

  const handleRatingChange = (newRating) => {
    if (newRating >= 1 && newRating <= 5) {
      const newRatings = [...ratings, newRating];
      setRatings(newRatings);

      localStorage.setItem(`carRatings_${carId}`, JSON.stringify(newRatings));

      const newAverageRating =
        newRatings.reduce((sum, rating) => sum + rating, 0) /
          newRatings.length || 0;

      setAverageRating(Math.round(newAverageRating * 10) / 10);
    }
  };

  const deleteButtonClickHandler = async () => {
    const hasConfirmed = window.confirm(
      `Are you sure you want to delete ${car.brand} ${car.model}`
    );

    if (hasConfirmed) {
      await carService.remove(carId);

      navigate("/BuyCar");
    }
  };

  return (
    <div>
      <div className="car-details">
        <div className="car-image">
          <img src={car.image} alt={car.brand} />
        </div>
        <div className="car-info">
          <h2>
            {car.brand} {car.model}
          </h2>
          <p name="price" id="price">
            Price: ${car.price}
          </p>
          <p name="brand" id="brand">
            Brand: {car.brand}
          </p>
          <p name="model" id="model">
            Model: {car.model}
          </p>
          <p name="fuel" id="fuel">
            Fuel: {car.fuel}
          </p>
          <p name="transmission" id="transmission">
            Transmission: {car.transmission}
          </p>
          <p name="comforts" id="comforts">
            Comfort:{" "}
            {car.comforts &&
              car.comforts.map((comfort, index) => (
                <span key={index}>{comfort} </span>
              ))}
          </p>
          <p>Rating:</p>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= averageRating ? "star filled" : "star"}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
            <span className="average-rating">{averageRating.toFixed(1)}</span>
          </div>
          <div className="buttons">
            {userId === car._ownerId ? (
              <>
                <Link to={pathToUrl(Path.CarEdit, { carId })}>
                  <button className="like-button">Edit</button>
                </Link>
                <button
                  className="like-button"
                  onClick={deleteButtonClickHandler}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  className={`like-button ${liked ? "liked" : ""}`}
                  onClick={handleLike}
                  disabled={liked}
                >
                  {liked ? "Liked" : "Like"}
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
      <div className="car-description">
        <h2>Information</h2>
        <p>Phone Number: +359 00000000</p>
        <p></p>
      </div>
    </div>
  );
}
