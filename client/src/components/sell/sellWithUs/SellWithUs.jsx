import React, { useRef } from "react";
import Hero2 from './Hero2.jsx';
import SendForm from './SendForm.jsx';

function SellWithUs() {
  const formRef = useRef();

  const handleTakeOfferClick = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Hero2 onTakeOfferClick={handleTakeOfferClick} />
      <SendForm ref={formRef} />
    </>
  );
}

export default SellWithUs;
