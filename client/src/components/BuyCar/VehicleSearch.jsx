// import React, { useEffect, useState } from "react";
// import SearchForm from "./SearchForm";
// import Results from "./Results";

// import * as carService from '../../services/CarService.js'

// const VehicleSearch = () => {
//   const [products, setProducts] = useState([
//     // My product data (example)
//     {
//       id: 1,
//       brand: "Audi",
//       model: "A4",
//       price: 7800,
//       transmission: "Automatic",
//       fuel: "Diesel",
//       comforts: ["Leather seats", "Climate control"],
//       category: "New",
//       image:
//         "https://upload.wikimedia.org/wikipedia/commons/d/dc/Audi_A4_40_TFSI_B9_FL_Ibis_White_%281%29_%28cropped%29.jpg",
//       description: "Best machine ever",
//     },
//     {
//       id: 2,
//       brand: "Suzuki",
//       model: "Jimny",
//       price: 65000,
//       transmission: "Automatic",
//       fuel: "Gasoline",
//       comforts: ["Leather seats", "Bluetooth"],
//       image:
//         "https://upload.wikimedia.org/wikipedia/commons/1/13/2019_Suzuki_Jimny_SZ5_4X4_Automatic_1.5.jpg",
//       description: "The best jeep ever",
//     },
//     {
//       id: 3,
//       brand: "Mercedes",
//       model: "GLK",
//       price: 65000,
//       transmission: "Automatic",
//       fuel: "Diesel",
//       comforts: ["Leather seats", "Bluetooth"],
//       image:
//         "https://upload.wikimedia.org/wikipedia/commons/6/66/Mercedes-Benz_GLK_220_CDI_4MATIC_Sport-Paket_AMG_%28X_204%2C_Facelift%29_%E2%80%93_Frontansicht%2C_24._August_2014%2C_D%C3%BCsseldorf.jpg",
//       description: "Really nice car",
//     },
//     {
//       id: 3,
//       brand: "BMW",
//       model: "X3",
//       price: 65000,
//       transmission: "Automatic",
//       fuel: "Hybrid",
//       comforts: ["Leather seats", "Bluetooth"],
//       image:
//         "https://images.prismic.io/carwow/a2aecfe0-8f02-49cd-a7db-af8f7650674b_Front+%C2%BE+moving.jpg",
//       description:
//         "Avant Business Advanced 40 TFSI 150 kW MHEV quattro S tronic **B&O, Webasto, Matrix LED **",
//     },
//   ]);

//   const [cars,setCars] = useState([]);
//   useEffect(() => {
//     carService.getAll()
//     .then((result) => setCars(result))
//     .catch(err => {
//       console.log(err);
//     }) 
//   }, []);

//   console.log(cars);

//   const [filteredProducts, setFilteredProducts] = useState(products);
//   const [searchCriteria, setSearchCriteria] = useState({
//     brand: "",
//     model: "",
//     minPrice: 0,
//     maxPrice: 100000,
//     transmission: "",
//     fuel: "",
//     comforts: [],
//   });

//   const handleSearch = (criteria) => {

//     const newSearchCriteria = {
//       ...searchCriteria,
//       ...criteria,
//     };

//     setSearchCriteria(newSearchCriteria);

//     const filtered = products.filter((product) => {
//       const brandMatch =
//         !newSearchCriteria.brand ||
//         newSearchCriteria.brand === "" ||
//         product.brand === newSearchCriteria.brand;

//       const modelMatch =
//         !newSearchCriteria.model || product.model === newSearchCriteria.model;

//       const priceMatch =
//         (newSearchCriteria.minPrice === 0 ||
//           product.price >= newSearchCriteria.minPrice) &&
//         (newSearchCriteria.maxPrice === 0 ||
//           product.price <= newSearchCriteria.maxPrice);

//       const transmissionMatch =
//         !newSearchCriteria.transmission ||
//         product.transmission.trim().toLowerCase() ===
//           newSearchCriteria.transmission.trim().toLowerCase();

//       const fuelMatch =
//         !newSearchCriteria.fuel ||
//         product.fuel.trim().toLowerCase() ===
//           newSearchCriteria.fuel.trim().toLowerCase();

//       const comfortsMatch =
//         newSearchCriteria.comforts.length === 0 ||
//         newSearchCriteria.comforts.every((comfort) =>
//           product.comforts.includes(comfort)
//         );

//       const categoryMatch =
//         !newSearchCriteria.category ||
//         product.category === newSearchCriteria.category;

//       return (
//         brandMatch &&
//         modelMatch &&
//         priceMatch &&
//         transmissionMatch &&
//         fuelMatch &&
//         comfortsMatch &&
//         categoryMatch
//       );
//     });

//     setFilteredProducts(filtered);
//   };

//   return (
//     <div className="vehicleSearch">
//       <div className="search-container">
//         <SearchForm
//           searchCriteria={{ ...searchCriteria, cars: filteredProducts }}
//           onSearch={handleSearch}
//         />
//         <Results products={filteredProducts} />
//       </div>
//     </div>
//   );
// };

// export default VehicleSearch;

import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import Results from "./Results";

import * as carService from '../../services/CarService.js';

const VehicleSearch = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    carService.getAll()
      .then((result) => setCars(result))
      .catch(err => {
        console.error(err);
      });
  }, []);

  console.log(cars);

  const [filteredProducts, setFilteredProducts] = useState(cars);
  const [searchCriteria, setSearchCriteria] = useState({
    brand: "",
    model: "",
    minPrice: 0,
    maxPrice: 100000,
    transmission: "",
    fuel: "",
    comforts: [],
  });

  const handleSearch = (criteria) => {
    const newSearchCriteria = {
      ...searchCriteria,
      ...criteria,
    };

    setSearchCriteria(newSearchCriteria);

    const filtered = cars.filter((car) => {
      const brandMatch =
        !newSearchCriteria.brand ||
        newSearchCriteria.brand === "" ||
        car.brand === newSearchCriteria.brand;

      const modelMatch =
        !newSearchCriteria.model || car.model === newSearchCriteria.model;

      const priceMatch =
        (newSearchCriteria.minPrice === 0 ||
          car.price >= newSearchCriteria.minPrice) &&
        (newSearchCriteria.maxPrice === 0 ||
          car.price <= newSearchCriteria.maxPrice);

      const transmissionMatch =
        !newSearchCriteria.transmission ||
        car.transmission.trim().toLowerCase() ===
        newSearchCriteria.transmission.trim().toLowerCase();

      const fuelMatch =
        !newSearchCriteria.fuel ||
        car.fuel.trim().toLowerCase() ===
        newSearchCriteria.fuel.trim().toLowerCase();

      const comfortsMatch =
        newSearchCriteria.comforts.length === 0 ||
        newSearchCriteria.comforts.every((comfort) =>
          car.comforts.includes(comfort)
        );

      return (
        brandMatch &&
        modelMatch &&
        priceMatch &&
        transmissionMatch &&
        fuelMatch &&
        comfortsMatch
      );
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="vehicleSearch">
      <div className="search-container">
        <SearchForm
          searchCriteria={{ ...searchCriteria, cars: filteredProducts }}
          onSearch={handleSearch}
        />
        <Results products={filteredProducts} />
      </div>
    </div>
  );
};

export default VehicleSearch;

