import { Link } from "react-router-dom";
import Path from "../../../../paths.js";

export default function CarListItem({
  _id,
  brand,
  model,
  price,
  image,
  description,
}) {

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
        {/* <div className="star">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={star <= averageRating ? "fas fa-star" : "far fa-star"}
              onClick={() => {}}
            />
          ))}
        </div> */}
        <h4>${price}</h4>
        <Link to={`${Path.Buy}/${_id}`}>
          <button className="button-style">Show Details</button>
        </Link>
      </div>
    </div>
  );
}
