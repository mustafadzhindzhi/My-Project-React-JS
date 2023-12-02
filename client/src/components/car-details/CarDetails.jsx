


export default function CarDetails() {
  return (
    <div>
      <div className="car-details">
        <div className="car-image">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide"><img src="assets/images/audi a4 1.jpeg" alt="Car Image" /></div>
              <div className="swiper-slide"><img src="assets/images/audi a4 2.jpeg" alt="Car Image" /></div>
              <div className="swiper-slide"><img src="assets/images/audi a4 3.jpeg" alt="Car Image" /></div>
            </div>
            <div className="swiper-button-next" style={{right: '5px', color: 'white'}} />
            <div className="swiper-button-prev" style={{left: '30px', color: 'white'}} />
          </div>
        </div>
        <div className="car-info">
          <h2>Audi A4</h2>
          <p>Price: $7800</p>
          <p>Brand: Audi</p>
          <p>Model: A4</p>
          <p>Fuel: Gasoline</p>
          <p>Transmission: Automatic</p>
          <p>Comfort: Leather seats, climate control, sunroof</p>
          <p>Rating: <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span></p>
          <div className="buttons">
            <button className="like-button">Like</button>
            <button className="like-button">Edit</button>
            <button className="like-button">Delete</button>
          </div>
        </div>
      </div>
      <div className="car-description">
        <h2>Car Description</h2>
        <p>This Audi A4 is a premium sedan with excellent features...</p>
      </div>
      <section className="car-description">
        <h3>Description</h3>
        <p>This is a detailed description of the car. It provides information about the car's features, performance, and more. You can add any additional details you want to highlight about the car here.</p>
      </section>
    </div>
  );
}
