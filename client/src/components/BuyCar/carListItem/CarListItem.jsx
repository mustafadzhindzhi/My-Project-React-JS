import { Link } from "react-router-dom";

export default function CarListItem ({
    _id,
    brand,
    model,
    price,
    transmission,
    fuel,
    comforts,
    category,
    image,
    description,
}) {
    return (
        <div className="products-container">
        {sortedProducts.map((car, index) => (
           <div className="product" key={index}>
            <div className="image-container">
              <img src={car.image} alt={car.brand} />
            </div>
            <div className="des">
              <span>{car.brand} {car.model}</span>
              <h5>{car.description}</h5>
              <div className="star">
                {Array.from({ length: 5 }).map((_, index) => (
                  <i key={index} className="fas fa-star"></i>
                ))}
              </div>
              <h4>${car.price}</h4>
              <a href={car.detailsLink}>
                <button className="button-style">Show Details</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    )
}