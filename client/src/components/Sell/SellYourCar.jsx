export default function SellYourCar() {
  return (
    <div className="create-container">
      <div className="background-image" />
      <div className="product-form-container">
        <div className="form-info">
          <h2>Sell Your Car</h2>
          <p>
            Fill out the details below to list your car for sale on our website.
            Make sure to provide accurate information to attract potential
            buyers.
          </p>
        </div>
        <div className="form-group form-group-left">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="write your price here"
          />
        </div>
        <div className="form-group form-group-left">
          <label htmlFor="brand">Brand:</label>
          <select id="brand">
            <option value>---</option>
            <option value="audi">Audi</option>
            <option value="bmw">BMW</option>
            <option value="mercedes">Mercedes</option>
            <option value="suzuki">Suzuki</option>
            <option value="toyota">Toyota</option>
          </select>
        </div>
        <div className="form-group form-group-left">
          <label htmlFor="model">Model:</label>
          <select id="model">
            <option value>---</option>
          </select>{" "}
        </div>
        <div className="form-group form-group-left">
          <label htmlFor="fuel">Fuel:</label>
          <select id="brand">
            <option value>---</option>
            <option value="automatic">Diesel</option>
            <option value="manual">Gasoline</option>
            <option value="semi-Automatic">Hybrid</option>
            <option value="semi-Automatic">Electric</option>
            <option value="semi-Automatic">Gas</option>
          </select>{" "}
        </div>
        <div className="form-group form-group-left">
          <label htmlFor="transmission">Transmission:</label>
          <select id="transmission">
            <option value>---</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
            <option value="semi-Automatic">Semi-Automatic</option>
          </select>
        </div>
        <div className="form-group form-group-right" style={{ backgroundColor: "none" }}>
          <fieldset className="comfort-fieldset">
            <div className="comfort-toggle">
              <button id="toggle-comforts">
                Comforts <span className="arrow">▼</span>
              </button>
            </div>
            <div className="comfort-list">
              <label>
                <input
                  type="checkbox"
                  id="comfort1"
                  name="comfort"
                  defaultValue="comfort1"
                />{" "}
                Leather seats
              </label>
              <label>
                <input
                  type="checkbox"
                  id="comfort2"
                  name="comfort"
                  defaultValue="comfort2"
                />{" "}
                Climate control
              </label>
              <label>
                <input
                  type="checkbox"
                  id="comfort3"
                  name="comfort"
                  defaultValue="comfort3"
                />{" "}
                Auto/Start Stop Function
              </label>
              <label>
                <input
                  type="checkbox"
                  id="comfort4"
                  name="comfort"
                  defaultValue="comfort4"
                />{" "}
                Bluetooth
              </label>
              <label>
                <input
                  type="checkbox"
                  id="comfort5"
                  name="comfort"
                  defaultValue="comfort5"
                />
                Steptronic, Tiptronic
              </label>
              <label>
                <input
                  type="checkbox"
                  id="comfort6"
                  name="comfort"
                  defaultValue="comfort6"
                />
                Bordcomputer
              </label>
            </div>
          </fieldset>
        </div>
        <div className="form-group">
          <label htmlFor="transmission">Type:</label>
          <select id="transmission">
            <option value>---</option>
            <option value="new">New</option>
            <option value="manual">Used</option>
            <option value="for-parts">For parts</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="product-image">Product Images (up to 3):</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="link to image"
          />
          <input
            type="number"
            id="price"
            name="price"
            placeholder="link to image"
          />
          <input
            type="number"
            id="price"
            name="price"
            placeholder="link to image"
          />
          <div id="image-preview-container" />
        </div>
        <button className="publish-button" type="submit">
          Publish
        </button>
      </div>
    </div>
  );
}
