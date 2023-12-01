export const formInitialState = {
  carNumber: "",
  kilometers: "",
};

export const resetForm = (setFormData) => {
  setFormData(formInitialState);
};

export const handleInputChange = (event, setFormData, setCarNumberError, setKilometersError) => {
  const { name, value } = event.target;

  setFormData((state) => ({
    ...state,
    [name]: value,
  }));

  if (name === 'carNumber') {
    if (/^[A-Z]{0,2}$|^[A-Z]{1,2}\d{0,4}$|^[A-Z]{1,2}\d{4}[A-Z]{0,2}$/.test(value)) {
      setCarNumberError("");
    } else {
      setCarNumberError("Car number is not in the correct format");
    }
  }

  if (name === 'kilometers') {
    if (/^\d+$/.test(value)) {
      setKilometersError("");
    } else {
      setKilometersError("Kilometers must be digits");
    }
  }
};

export const submitForm = (formData, setFormSubmitted, setCarNumberError, setKilometersError, setFormData) => {
  if (!isValidCarNumber(formData.carNumber)) {
    setCarNumberError("Car number is not in the correct format");
    return;
  }

  if (!isValidKilometers(formData.kilometers)) {
    setKilometersError("Kilometers must be digits");
    return;
  };

  setKilometersError("");
  setCarNumberError("");

  setTimeout(() => {
    setFormSubmitted(true);
    resetForm(setFormData);
  }, 1000);
};

export const isValidCarNumber = (carNumber) => {
  const carNumberRegex = /^[A-Z]{1,2}\d{4}[A-Z]{2}$/;
  return carNumberRegex.test(carNumber);
};

export const isValidKilometers = (kilometers) => {
  return /^\d+$/.test(kilometers);
};