import React, { useState } from "react";
import * as formService from '../../../services/formService.js';

function SendForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(formService.formInitialState);
  const [carNumberError, setCarNumberError] = useState("");
  const [kilometersError, setKilometersError] = useState("");
  const [isCarNumberCorrect, setIsCarNumberCorrect] = useState(false);
  const [isKilometersCorrect, setIsKilometersCorrect] = useState(false);
  const [areBothInputsEmpty, setAreBothInputsEmpty] = useState(false);

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
  
    setAreBothInputsEmpty(formData.carNumber === "" && formData.kilometers === "");
  
    if (
      isCarNumberCorrect &&
      isKilometersCorrect &&
      !areBothInputsEmpty
    ) {
      // If all validations pass, submit the form
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
  

  return (
    <section className="sellUs">
      {formSubmitted ? (
        <>
        <h1>We will buy your car</h1>
        <p>Submitting an offer does not obligate you to sell your vehicle.</p>
        <div className="info">
          <div className="formInfo">
            <div className="formInfoCard">
              <h2>All we need is a little information about the car</h2>
              <p>Start by filling out the vehicle information</p>
              <form className="carCard" onSubmit={handleSubmit}>
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

                <button
                  id="send-btn"
                  type="submit"
                >
                  Send
                </button>
                <h1>Thank we will call you back</h1>
                {areBothInputsEmpty && (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    Both fields are required.
                  </p>
                )}
              </form>
            </div>
          </div>
          <div className="contentInfo">
            <h2>What cars we buy?</h2>
            <p>
              As a rule, we buy cars with a price below 30,000 euros, driven
              no more than 200,000 km and no more than 2010 model year. You
              can also offer an older, lightly driven or otherwise
              particularly good car. You can instantly get an estimated price
              for certain Volkswagen cars.
            </p>
            <h2>
              You can even get an estimate of the car's price right away
            </h2>
            <p>
              The wait is over. You can get an estimated car price for certain
              Volkswagen models even immediately, and for cars from other
              brands we will give you an estimated price as soon as possible.
              The price estimate is influenced by, for example, the model year
              of the car being sold, service history and mileage.
            </p>
          </div>
        </div>
        <div className="anotherInfo">
          <h2>Selling a car with us is easy</h2>
          <p>
            1. Enter your vehicle information : Start by entering your vehicle
            registration number and other information in the attached form.
            <br /> <br />
            2. We will make you the best offer based on the information you
            provide: The more detailed you are about your car information, the
            better offer we will be able to give.
            <br /> <br />
            3. Make a decision to sell : Once you receive the offer, you can
            decide if you want to sell your car to us.
            <br /> <br />
            4. Arrange the delivery of the car : After you accept the offer,
            we will arrange the delivery of the car. After inspecting the
            vehicle, we will pay you the agreed amount. Congratulations, your
            vehicle is now in the possession of a new owner.
            <br /> <br />
            5. Find the new car of your dreams : You can also get a new car at
            the same time from our selection that offers thousands of quality
            options. We want to make every step of driving as easy as possible
            for you.{" "}
          </p>
        </div>
      </>
      ) : (
        <>
          <h1>We will buy your car</h1>
          <p>Submitting an offer does not obligate you to sell your vehicle.</p>
          <div className="info">
            <div className="formInfo">
              <div className="formInfoCard">
                <h2>All we need is a little information about the car</h2>
                <p>Start by filling out the vehicle information</p>
                <form className="carCard" onSubmit={handleSubmit}>
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

                  <button
                    id="send-btn"
                    type="submit"
                  >
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
            <div className="contentInfo">
              <h2>What cars we buy?</h2>
              <p>
                As a rule, we buy cars with a price below 30,000 euros, driven
                no more than 200,000 km and no more than 2010 model year. You
                can also offer an older, lightly driven or otherwise
                particularly good car. You can instantly get an estimated price
                for certain Volkswagen cars.
              </p>
              <h2>
                You can even get an estimate of the car's price right away
              </h2>
              <p>
                The wait is over. You can get an estimated car price for certain
                Volkswagen models even immediately, and for cars from other
                brands we will give you an estimated price as soon as possible.
                The price estimate is influenced by, for example, the model year
                of the car being sold, service history and mileage.
              </p>
            </div>
          </div>
          <div className="anotherInfo">
            <h2>Selling a car with us is easy</h2>
            <p>
              1. Enter your vehicle information : Start by entering your vehicle
              registration number and other information in the attached form.
              <br /> <br />
              2. We will make you the best offer based on the information you
              provide: The more detailed you are about your car information, the
              better offer we will be able to give.
              <br /> <br />
              3. Make a decision to sell : Once you receive the offer, you can
              decide if you want to sell your car to us.
              <br /> <br />
              4. Arrange the delivery of the car : After you accept the offer,
              we will arrange the delivery of the car. After inspecting the
              vehicle, we will pay you the agreed amount. Congratulations, your
              vehicle is now in the possession of a new owner.
              <br /> <br />
              5. Find the new car of your dreams : You can also get a new car at
              the same time from our selection that offers thousands of quality
              options. We want to make every step of driving as easy as possible
              for you.{" "}
            </p>
          </div>
        </>
      )}
    </section>
  );
}

export default SendForm;