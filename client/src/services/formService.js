// formService.js
export const formInitialState = {
    carNumber: "",
    kilometers: "",
  };
  
  export const resetForm = (setFormData) => {
    setFormData(formInitialState);
  };
  
// export const handleInputChange = (event, setFormData, setShowLetterWarning, setError) => {
//     const { name, value } = event.target;
  
//     setFormData((state) => ({
//       ...state,
//       [name]: value,
//     }));
  
//     if (name === 'carNumber') {
//       if (/^[A-Z]$/.test(value)) {
//         setShowLetterWarning(false);
//         setError('');
//       } else if (/^[A-Z]{2}\d{0,4}$/.test(value)) {
//         setShowLetterWarning(false);
//         setError('');
//       } else if (/^[A-Z]{2}\d{4}[A-Z]{0,2}$/.test(value)) {
//         setShowLetterWarning(true);
//         setError('');
//       } else {
//         setShowLetterWarning(true);
//         setError('Car number is not in the correct format');
//       }
//     }
//   };
  

export const handleInputChange = (event, setFormData, setShowLetterWarning, setError) => {
    const { name, value } = event.target;
  
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  
    if (name === 'carNumber') {
      if (/^[A-Z]{0,2}$|^[A-Z]{1,2}\d{0,4}$|^[A-Z]{1,2}\d{4}[A-Z]{0,2}$/.test(value)) {
        setShowLetterWarning(true);
        setError(""); 
      } else {
        setShowLetterWarning(false);
        setError("Car number is not in the correct format");
      }
    }
  };
  export const submitForm = (formData, setFormSubmitted, setError, setFormData) => {
    if (!isValidCarNumber(formData.carNumber)) {
      setError("Car number is not in the correct format");
      return;
    }
  
    setError("");
  
    setTimeout(() => {
      setFormSubmitted(true);
      resetForm(setFormData);
    }, 1000);
  };
  
  const isValidCarNumber = (carNumber) => {
const carNumberRegex = /^[A-Z]{1,2}\d{4}[A-Z]{2}$/;
  
    return carNumberRegex.test(carNumber);
  };
  