export default function Hero({ onTakeOfferClick }) {
    const handleTakeOfferClick = () => {
      if (onTakeOfferClick) {
        onTakeOfferClick();
      }
    };
  
    return (
      <section id="hero">
        <div className="hero-background">
        <h4>Feel free to trust US!</h4>
        <h2>Brand support for over 5 years now from €199</h2>
        <button onClick={handleTakeOfferClick}>Book a maintenance</button>
        </div>
      </section>
    );
  }
  