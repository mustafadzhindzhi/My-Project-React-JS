import { Link } from "react-router-dom";
import Path from "../../../../paths.js";
import { useState, useEffect } from "react";
import { submitRating, getAverageRating } from "../../../services/CarService.js";

export default function CarListItem({
  _id,
  brand,
  model,
  price,
  image,
  description,
}) {

  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchAverageRating = async() => {
      try {
        const data = await getAverageRating(_id);
        setAverageRating(data.averageRating);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };
    
    fetchAverageRating();
  }, [_id]);

  const handleRatingSubmit = async (rating) => {
    const userId = '35c62d76-8152-4626-8712-eeb96381bea8';

    try {
      await submitRating(_id, userId, rating);
      fetchAverageRating();
      console.log('Successfully submitted rating for the car!');
    } catch (error) {
      console.error('Failed to submit rating:', error);
    }
  };

  return (
    <div className="product">
      <div className="image-container">
        <img src={image} alt={`${brand} ${model}`} />
      </div>
      <div className="des">
        <span name="brand">
          {brand} {model}
        </span>
        <h5>{description}</h5>
        <div className="star">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={star <= averageRating ? "fas fa-star" : "far fa-star"}
              onClick={() => handleRatingSubmit(star)}
            />
          ))}
        </div>
        <h4>${price}</h4>
        <Link to={`${Path.Buy}/${_id}`}>
          <button className="button-style">Show Details</button>
        </Link>
      </div>
    </div>
  );
}
