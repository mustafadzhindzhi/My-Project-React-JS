import React from "react";

const Hero2 = ({ onTakeOfferClick }) => {
  const handleTakeOfferClick = () => {
    if (onTakeOfferClick) {
      onTakeOfferClick();
    }
  };

  return (
    <section id="hero4">
      <div className="hero4-background">
      <h4>Sell your car with US!</h4>
      <h2>Response within 24 hours</h2>
      <h1>Contact us 24/7</h1>
      <p>We buy your car, the transaction is smooth, fast and open</p>
      <button onClick={handleTakeOfferClick}>Take the Offer</button>
      </div>
    </section>
  );
};

export default Hero2;
