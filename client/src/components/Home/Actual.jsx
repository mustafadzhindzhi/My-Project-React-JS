// import React, { useState, useEffect } from 'react';


const Actual = () => {

 /* const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await fetch('your_api_endpoint');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNewsClick = (index) => {
    setSelectedNews(news[index]);
  };

     <h1>{selectedNews.title}</h1>
  */

  
    return (
        <div className="actual">
        <div className="background-image" />
        <div className="content">
          <div className="info">
            <h1>Actual</h1>
            <h4>Last actual news and offers</h4>
          </div>
          <div className="news">
            <div className="mycar">
              <h1>About My Car</h1>
              <img src="src/assets/images/carshop-nottingham-sytner-car-supermarket-89-scaled.jpeg" alt="" />
              <h3>My Car - №1 car dealership for 2023 year!</h3>
              <p>Welcome to My Car, where we transcend the traditional dealership experience. We're not just in the business of selling cars, we're in the business of helping you find the perfect vehicle to complement your unique lifestyle. With our unwavering commitment to top-notch quality, a genuine passion for automobiles, and a relentless dedication to providing outstanding service, we strive to make your car-buying journey an absolute delight.</p>
            </div>
            <div className="lastnews">
              <div className="new">
                <img src="src/assets/images/bmw x5.jpeg" alt="" />
                <h3>The new BMW x5 M is now here!</h3>
                <p>Everything you should to know before buy it</p>
              </div>
              <div className="new">
                <img src="src/assets/images/Best-electric-car-collage-22.jpeg" alt="" />
                <h3>Only Electrical cars and no crazy sound. Is this the future?</h3>
                <p>We hope this is not the reality</p>
              </div>
              <div className="new">
                <img src="src/assets/images/toyotaa.png" alt="" />
                <h3>Is this the best offroad jeep for 2023? Or it's just a myth</h3>
                <p>The competition is great</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Actual;