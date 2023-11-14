import React, { useState } from "react";

const formInitialState = {
    carNumber: "",
    kilometers: "",
};

function SendForm() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState(formInitialState);
    const [error, setError] = useState("");

    const resetForm = () => {
        setFormData(formInitialState);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.carNumber || !formData.kilometers) {
            setError("Both fields are required");
            return;
        }

        setError("");

        setTimeout(() => {
            setFormSubmitted(true);
            console.log("Form Data:", formData);
            resetForm();
        }, 1000);
    };

    return(
        <section className="container">
            {formSubmitted ? (
                <>
                <h1>We will buy your car</h1>
                <p>
                  Submitting an offer does not obligate you to sell your vehicle.
                </p>
                <div className="info">
                  <div className="carInfo">
                    <div className="carInfoCard">
                      <h2>All we need is a little information about the car</h2>
                      <p>Start by filling out the vehicle information</p>
                      <form className="carCard" onSubmit={handleSubmit}>
                        <div className="input-group">
                          <label htmlFor="carNumber">Car Number</label>
                          <div className="input-addon">
                            <span className="flag-icon">🇪🇺</span>
                            <input type="text" id="carNumber" name="carNumber" placeholder="Enter car number" value={formData.carNumber} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="input-group">
                          <label htmlFor="kilometers">Kilometers</label>
                          <input type="text" id="kilometers" name="kilometers" placeholder="Enter kilometers" value={formData.kilometers} onChange={handleChange}/>
                        </div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button id="go" type="submit">Send</button>
                        <h1>Thanks, we will call you back!</h1>
                      </form>
                    </div>
                  </div>
                  <div className="someInfo">
                    <h2>What cars we buy?</h2>
                    <p>As a rule, we buy cars with a price below 30,000 euros, driven no more than 200,000 km and no more than 2010 model year. You can also offer an older, lightly driven or otherwise particularly good car.
                      You can instantly get an estimated price for certain Volkswagen cars.</p>
                    <h2>You can even get an estimate of the car's price right away</h2>
                    <p>The wait is over. You can get an estimated car price for certain Volkswagen models even immediately, and for cars from other brands we will give you an estimated price as soon as possible. The price estimate is influenced by, for example, the model year of the car being sold, service history and mileage.</p>
                  </div>
                </div>
                <div className="anotherInfo">
                  <h2>Selling a car with us is easy</h2>
                  <p>1. Enter your vehicle information : Start by entering your vehicle registration number and other information in the attached form.</p>
                  <p>2. We will make you the best offer based on the information you provide: The more detailed you are about your car information, the better offer we will be able to give.</p>
                  <p>3. Make a decision to sell : Once you receive the offer, you can decide if you want to sell your car to us.</p>
                  <p>4. Arrange the delivery of the car : After you accept the offer, we will arrange the delivery of the car. After inspecting the vehicle, we will pay you the agreed amount. Congratulations, your vehicle is now in the possession of a new owner.</p>
                  <p>5. Find the new car of your dreams : You can also get a new car at the same time from our selection that offers thousands of quality options. We want to make every step of driving as easy as possible for you. </p>
                </div>
                </>
            ) : (
            <>
        <h1>We will buy your car</h1>
        <p>
          Submitting an offer does not obligate you to sell your vehicle.
        </p>
        <div className="info">
          <div className="carInfo">
            <div className="carInfoCard">
              <h2>All we need is a little information about the car</h2>
              <p>Start by filling out the vehicle information</p>
              <form className="carCard" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="carNumber">Car Number</label>
                  <div className="input-addon">
                    <span className="flag-icon">🇪🇺</span>
                    <input type="text" id="carNumber" name="carNumber" placeholder="Enter car number" value={formData.carNumber} onChange={handleChange}/>
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="kilometers">Kilometers</label>
                  <input type="text" id="kilometers" name="kilometers" placeholder="Enter kilometers" value={formData.kilometers} onChange={handleChange}/>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button id="go" type="submit">Send</button>
              </form>
            </div>
          </div>
          <div className="someInfo">
            <h2>What cars we buy?</h2>
            <p>As a rule, we buy cars with a price below 30,000 euros, driven no more than 200,000 km and no more than 2010 model year. You can also offer an older, lightly driven or otherwise particularly good car.
              You can instantly get an estimated price for certain Volkswagen cars.</p>
            <h2>You can even get an estimate of the car's price right away</h2>
            <p>The wait is over. You can get an estimated car price for certain Volkswagen models even immediately, and for cars from other brands we will give you an estimated price as soon as possible. The price estimate is influenced by, for example, the model year of the car being sold, service history and mileage.</p>
          </div>
        </div>
        <div className="anotherInfo">
          <h2>Selling a car with us is easy</h2>
          <p>1. Enter your vehicle information : Start by entering your vehicle registration number and other information in the attached form.</p>
          <p>2. We will make you the best offer based on the information you provide: The more detailed you are about your car information, the better offer we will be able to give.</p>
          <p>3. Make a decision to sell : Once you receive the offer, you can decide if you want to sell your car to us.</p>
          <p>4. Arrange the delivery of the car : After you accept the offer, we will arrange the delivery of the car. After inspecting the vehicle, we will pay you the agreed amount. Congratulations, your vehicle is now in the possession of a new owner.</p>
          <p>5. Find the new car of your dreams : You can also get a new car at the same time from our selection that offers thousands of quality options. We want to make every step of driving as easy as possible for you. </p>
        </div>
        </>
        )}
      </section>
    )
};

export default SendForm;