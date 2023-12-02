import { Link } from "react-router-dom";

export default function CarListItem ({
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
        <img src={image} alt={brand} />
      </div>
      <div className="des">
        <span>{brand} {model}</span>
        <h5>{description}</h5>
        <div className="star">
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
        </div>
        <h4>${price}</h4>
        <Link to={`/cars/${_id}`}>
          <button className="button-style">Show Details</button>
        </Link>
      </div>
    </div>
  );
}