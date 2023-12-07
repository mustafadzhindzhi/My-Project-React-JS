import * as formService from "../../services/formService.js";
import React, { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { Link } from "react-router-dom";

const MaintenanceForm = forwardRef((props, ref) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(formService.formInitialState);
  const [carNumberError, setCarNumberError] = useState("");
  const [kilometersError, setKilometersError] = useState("");
  const [isCarNumberCorrect, setIsCarNumberCorrect] = useState(false);
  const [isKilometersCorrect, setIsKilometersCorrect] = useState(false);
  const [areBothInputsEmpty, setAreBothInputsEmpty] = useState(false);

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }));

  const containerRef = useRef();

  const handleChange = (event) => {
    formService.handleInputChange(
      event,
      setFormData,
      setCarNumberError,
      setKilometersError
    );

    if (event.target.name === "carNumber") {
      const isCorrect = formService.isValidCarNumber(event.target.value);
      setIsCarNumberCorrect(isCorrect);
    }

    if (event.target.name === "kilometers") {
      const isCorrect = formService.isValidKilometers(event.target.value);
      setIsKilometersCorrect(isCorrect);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setAreBothInputsEmpty(
      formData.carNumber === "" && formData.kilometers === ""
    );

    if (isCarNumberCorrect && isKilometersCorrect && !areBothInputsEmpty) {
      formService.submitForm(
        formData,
        setFormSubmitted,
        setCarNumberError,
        setKilometersError,
        setFormData
      );
    } else {
      setFormSubmitted(false);
      setCarNumberError("");
      setKilometersError("");
      setIsCarNumberCorrect(false);
      setIsKilometersCorrect(false);
    }
  };

    return(
        <section className="container" ref={containerRef}>
        {formSubmitted ? (
          <>
            <h1>See the prices and book a service appointment</h1>
            <div className="info">
              <div className="carInfo2">
                <div className="carInfoCard2">
                  <h2>Book support online</h2>
                  <form className="carCard2" onSubmit={handleSubmit}>
                    <div className="group-input">
                      <label htmlFor="carNumber">Car Number</label>
                      <div className="addon-input">
                        <span className="flag-icon">
                          <img src="/public/images/license-plate.png" alt="" />
                        </span>
                        <input
                          type="text"
                          id="carNumber"
                          name="carNumber"
                          placeholder="Enter car number"
                          value={formData.carNumber}
                          onChange={handleChange}
                        />
                        {isCarNumberCorrect && (
                          <p
                            style={{
                              color: "green",
                              marginLeft: "10px",
                              marginBlock: "5px",
                            }}
                          >
                            Correct car number!
                          </p>
                        )}
                        {!isCarNumberCorrect && carNumberError && (
                          <p
                            style={{
                              color: "red",
                              marginLeft: "10px",
                              marginBlock: "5px",
                            }}
                          >
                            {carNumberError}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="group-input">
                      <label htmlFor="kilometers">Kilometers</label>
                      <div className="addon-input">
                        <span className="flag-icon">
                          <img
                            src="/public/images/odometer-for-kilometers-and-speed-control.png"
                            alt=""
                          />
                        </span>
                        <input
                          type="text"
                          id="kilometers"
                          name="kilometers"
                          placeholder="Enter kilometers"
                          value={formData.kilometers}
                          onChange={handleChange}
                        />
                        {isKilometersCorrect && (
                          <p
                            style={{
                              color: "green",
                              marginLeft: "10px",
                              marginBlock: "5px",
                            }}
                          >
                            Correct kilometers!
                          </p>
                        )}
                        {!isKilometersCorrect && kilometersError && (
                          <p
                            style={{
                              color: "red",
                              marginLeft: "10px",
                              marginBlock: "5px",
                            }}
                          >
                            {kilometersError}
                          </p>
                        )}
                      </div>
                    </div>
                    <button id="send-btn" type="submit">
                      Send
                    </button>
                    <h1>Thanks we will call you back</h1>
                    {areBothInputsEmpty && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        Both fields are required.
                      </p>
                    )}
                  </form>
                </div>
              </div>
              <div className="someInfo">
                <h2>
                  MyCar brand support ensures the continuation of your journey -
                  now and in the future.
                </h2>
                <img src="/images/1520211675081.jpeg" alt="" />
                <h2>Need help?</h2>
                <p>
                  Our office in Sofia is currently busy. You should also check
                  availability elsewhere.
                </p>
                <p>Contacts for the nearest MyCar office</p>
                <Link to="/contacts">
                  <button>Contact Us</button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>See the prices and book a service appointment</h1>
            <div className="info">
              <div className="carInfo2">
                <div className="carInfoCard2">
                  <h2>Book support online</h2>
                  <form className="carCard2" onSubmit={handleSubmit}>
                    <div className="group-input">
                      <label htmlFor="carNumber">Car Number</label>
                      <div className="addon-input">
                        <span className="flag-icon">
                          <img src="/public/images/license-plate.png" alt="" />
                        </span>
                        <input
                          type="text"
                          id="carNumber"
                          name="carNumber"
                          placeholder="Enter car number"
                          value={formData.carNumber}
                          onChange={handleChange}
                        />
                        {isCarNumberCorrect && (
                          <p
                            style={{
                              color: "green",
                              marginLeft: "10px",
                              marginBlock: "5px",
                            }}
                          >
                            Correct car number!
                          </p>
                        )}
                        {!isCarNumberCorrect && carNumberError && (
                          <p
                            style={{
                              color: "red",
                              marginLeft: "10px",
                              marginBlock: "5px",
                            }}
                          >
                            {carNumberError}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="group-input">
                      <label htmlFor="kilometers">Kilometers</label>
                      <div className="addon-input">
                        <span className="flag-icon">
                          <img
                            src="/public/images/odometer-for-kilometers-and-speed-control.png"
                            alt=""
                          />
                        </span>
                        <input
                          type="text"
                          id="kilometers"
                          name="kilometers"
                          placeholder="Enter kilometers"
                          value={formData.kilometers}
                          onChange={handleChange}
                        />
                        {isKilometersCorrect && (
                          <p
                            style={{
                              color: "green",
                              marginLeft: "10px",
                              marginBlock: "5px",
                            }}
                          >
                            Correct kilometers!
                          </p>
                        )}
                        {!isKilometersCorrect && kilometersError && (
                          <p
                            style={{
                              color: "red",
                              marginLeft: "10px",
                              marginBlock: "5px",
                            }}
                          >
                            {kilometersError}
                          </p>
                        )}
                      </div>
                    </div>
                    <button id="send-btn" type="submit">
                      Send
                    </button>
                    {areBothInputsEmpty && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        Both fields are required.
                      </p>
                    )}
                  </form>
                </div>
              </div>
              <div className="someInfo">
                <h2>
                  MyCar brand support ensures the continuation of your journey -
                  now and in the future.
                </h2>
                <img src="/images/1520211675081.jpeg" alt="" />
                <h2>Need help?</h2>
                <p>
                  Our office in Sofia is currently busy. You should also check
                  availability elsewhere.
                </p>
                <p>Contacts for the nearest MyCar office</p>
                <Link to="/contacts">
                  <button>Contact Us</button>
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    )
})

export default MaintenanceForm;