import React, { useEffect } from "react";

const MyCarWebsite = () => {
  useEffect(() => {
    let mySwiper;

    function initializeSwiper() {
      mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        effect: "slide",
        speed: 1000,
        autoplay: {
          delay: 6000,
        },
      });
    }

    initializeSwiper();

    mySwiper.el.addEventListener("mouseover", () => {
      mySwiper.autoplay.stop();
    });

    mySwiper.el.addEventListener("mouseout", () => {
      mySwiper.autoplay.start();
    });
  }, []);

  return (
    <div id="first-hero">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img src="/images/volvo1.jpeg" alt="Car Image" />
            <div className="slide-text">
              <h3>THE BEST CHOICE OF YOUR LIFE</h3>
              <h4>
                With us you make the best choice in your life. And you can be
                sure of your choice.
              </h4>
            </div>
          </div>
          <div className="swiper-slide">
            <img
              src="/images/LM22_17D_Touring_SF_nb_8R0A5927_3qtr_rear_2_epk_srgb_2-1280x854.png"
              alt="Car Image"
            />
            <div className="slide-text">
              <h3>YOU ARE ON THE RIGHT PLACE</h3>
              <h4>
                With us you make the best choice in your life. And you can be
                sure of your choice.
              </h4>
            </div>
          </div>
          <div className="swiper-slide">
            <img src="/images/Home-Carousel-1.png" alt="Car Image" />
            <div className="slide-text">
              <h3>THINK SMART</h3>
              <h4>
                With us you make the best choice in your life. And you can be
                sure of your choice.
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCarWebsite;
