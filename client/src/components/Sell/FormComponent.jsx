// FormComponent.jsx
import React from "react";

const FormComponent = ({ formData, handleChange, handleSubmit, error }) => (
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
      </div>
    </div>
    <div className="group-input">
      <label htmlFor="kilometers">Kilometers</label>
      <div className="addon-input2">
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
      </div>
    </div>
    {error && <p style={{ color: "red" }}>{error}</p>}
    <button id="go" type="submit">
      Send
    </button>
    <h1>Thanks, we will call you back!</h1>
  </form>
);

export default FormComponent;
