import Hero from "./Hero.jsx";
import HeaderB from "./HeaderB.jsx";
import MaintenanceForm from "./MaintenanceForm.jsx";
import Banners from "./Banners.jsx";
import { useRef } from "react";

export default function Maintenance() {
  const formRef = useRef();

  const handleTakeOfferClick = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Hero onTakeOfferClick={handleTakeOfferClick} />
      <HeaderB/>
      <MaintenanceForm ref={formRef} />
      <Banners/>
    </div>
  );
}
