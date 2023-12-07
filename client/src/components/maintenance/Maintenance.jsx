import { Link } from "react-router-dom";
import Hero from "./Hero.jsx";
import HeaderB from "./HeaderB.jsx";
import MaintenanceForm from "./MaintenanceForm.jsx";
import Banners from "./Banners.jsx";

export default function Maintenance() {
  

  return (
    <div>
      <Hero/>
      <HeaderB/>
      <MaintenanceForm/>
      <Banners/>
    </div>
  );
}
