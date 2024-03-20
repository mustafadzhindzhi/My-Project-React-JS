import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as carService from "../../services/CarService.js"; // Import carService
import AuthContext from "../../contexts/authContext.jsx";
import Path from "../../../paths.js";
import { pathToUrl } from "../../utils/pathUtils.js";

const CarDetails = () => {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [car, setCar] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const { _id } = useParams();
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [likeId, setLikeId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch car details
        const carData = await carService.getOneCar(_id);
        setCar(carData);

        // Fetch likes for the car
        const likes = await carService.getAllLikes(_id);
        setLikeCount(likes.length);

        // Check if the current user has already liked the car
        const foundLike = likes.find((like) => like.userId === userId);
        if (foundLike) {
          setLikeId(foundLike._id);
          setLiked(true);
        }

        const storedRatings = JSON.parse(localStorage.getItem(`carRatings_${_id}`)) || [];
        setRatings(storedRatings);
        const newAverageRating = storedRatings.reduce((sum, rating) => sum + rating, 0) / storedRatings.length || 0;
        setAverageRating(Math.round(newAverageRating * 10) / 10);
      } catch (error) {
        console.error("Error fetching car data:", error);
        navigate("/error");
      }
    };

    fetchData();
  }, [_id, navigate, userId]);

  const handleLike = async () => {
    try {
      if (!likeId) {
        const result = await carService.addLike({ carId: _id, userId });
        setLikeCount((prevLike) => prevLike + 1);
        setLikeId(result._id);
        setLiked(true);
      } else {
        await carService.unLike(likeId);
        setLikeCount((prevLike) => prevLike - 1);
        setLikeId("");
        setLiked(false);
      }
    } catch (err) {
      console.log('Error liking car:', err);
    }
  };

  const handleRatingChange = (newRating) => {
    if (newRating >= 1 && newRating <= 5) {
      const newRatings = [...ratings, newRating];
      setRatings(newRatings);
      localStorage.setItem(`carRatings_${_id}`, JSON.stringify(newRatings));
      const newAverageRating = newRatings.reduce((sum, rating) => sum + rating, 0) / newRatings.length || 0;
      setAverageRating(Math.round(newAverageRating * 10) / 10);
    }
  };

  const deleteButtonClickHandler = async () => {
    const hasConfirmed = window.confirm(`Are you sure you want to delete ${car.brand} ${car.model}`);
    if (hasConfirmed) {
      await carService.remove(_id);
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
          { userId && userId !== car._ownerId && 
          <>
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
          </>}
          <div className="buttons">
            {userId === car._ownerId ? (
              <>
                <Link to={pathToUrl(Path.CarEdit, { carId: _id })}>
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
              userId && userId !== car._ownerId && (
                <>
                  <button
                    className={`like-button ${liked ? "liked" : ""}`}
                    onClick={liked ? handleUnlike : handleLike}
                  >
                    {liked ? "Unlike" : "Like"}
                  </button>
                  <span>Likes: {likeCount}</span>
                </>
              )
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
        <h4>Phone Number: {car.phoneNumber && <a href={`tel:${car.phoneNumber.replace(/\D/g, "")}`}>{car.phoneNumber}</a>}</h4>
        <p></p>
      </div>
    </div>
  );
};

export default CarDetails;
