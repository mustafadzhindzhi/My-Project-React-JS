import React, { useState, useEffect } from "react";
import { fetchNewsData } from "../../services/newsService";

const Actual = () => {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNewsData(); // Ensure this function is defined
        setNews(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleNewsClick = (id) => {
    const selectedNewsItem = news.find((item) => item._id === id);
    setSelectedNews(selectedNewsItem);
  };

  return (
    <div className="actual">
      <div className="background-image2" />
      <div className="content">
        <div className="info">
          <h1>Actual</h1>
          <h4>Last actual news and offers</h4>
        </div>
        <div className="news">
          <div className="mycar-container">
            <div className="mycar">
              <h1>About My Car</h1>
              <img
                src="/images/carshop-nottingham-sytner-car-supermarket-89-scaled.jpeg"
                alt=""
              />
              <h3>My Car - №1 car dealership for 2023 year!</h3>
              <p>
                Welcome to My Car, where we transcend the traditional dealership
                experience. We're not just in the business of selling cars,
                we're in the business of helping you find the perfect vehicle to
                complement your unique lifestyle. With our unwavering commitment
                to top-notch quality, a genuine passion for automobiles, and a
                relentless dedication to providing outstanding service, we
                strive to make your car-buying journey an absolute delight.
              </p>
            </div>
          </div>
          <div className="lastnews-container">
            {news.map((item) => (
              <div
                className="new"
                key={item._id}
                onClick={() => handleNewsClick(item._id)}
              >
                <img src={item.image} alt="" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mycar">
          {selectedNews && (
            <>
              <h1>{selectedNews.title}</h1>
              <p>{selectedNews.description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Actual;
