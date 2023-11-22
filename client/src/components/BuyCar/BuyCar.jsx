import React from "react";
import { Helmet } from "react-helmet";
import VehicleSearch from "./VehicleSearch.jsx";

function Buy() {
  return (
    <div>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <VehicleSearch />
    </div>
  );
}

export default Buy;