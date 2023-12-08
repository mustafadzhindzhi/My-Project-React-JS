const CarSearchService = {
    filterCars: (cars, formData) => {
      const newFilteredCars = cars.filter((car) => {
        const carBrand = car.brand.toLowerCase();
        const carModel = car.model.toLowerCase();
        const selectedBrand = formData.brand.toLowerCase();
        const selectedModel = formData.model.toLowerCase();
  
        const brandMatches = selectedBrand ? carBrand.includes(selectedBrand) : true;
        const modelMatches = selectedModel ? carModel.includes(selectedModel) : true;
        const transmissionMatches = formData.transmission
          ? car.transmission.trim().toLowerCase() === formData.transmission.trim().toLowerCase()
          : true;
        const fuelMatches = formData.fuel ? car.fuel.toLowerCase() === formData.fuel.toLowerCase() : true;
  
        return brandMatches && modelMatches && transmissionMatches && fuelMatches;
      });
  
      return newFilteredCars;
    },
  
    handleFormChange: (formData, name, value, type) => {
      let newCategory = formData.category;
  
      let newValue = value;
  
      if (type === "range") {
        newValue = parseInt(value, 10);
      }
  
      return {
        ...formData,
        [name]: newValue,
        category: newCategory,
      };
    },
  
    handleSliderChange: (formData, event) => {
      const { name, value } = event.target;
      const intValue = parseInt(value, 10);
  
      return {
        ...formData,
        [name]: intValue,
        minPrice: name === "minRange" ? intValue : formData.minPrice,
        maxPrice: name === "maxRange" ? intValue : formData.maxPrice,
      };
    },
  
    handleComfortChange: (formData, event) => {
      const { name, value } = event.target;
  
      const newComforts = [...formData.comforts];
  
      if (newComforts.includes(value)) {
        const index = newComforts.indexOf(value);
        if (index !== -1) {
          newComforts.splice(index, 1);
        }
      } else {
        newComforts.push(value);
      }
  
      return {
        ...formData,
        comforts: newComforts,
      };
    },
  
    transformSearchCriteria: (formData) => {
        const transformedFormData = {
            brand: formData.selectedBrandModel && formData.selectedBrandModel.brand || "",
            model: formData.selectedBrandModel && formData.selectedBrandModel.model || "",
            transmission: formData.transmission || "",
            fuel: formData.fuel || "",
            comforts: formData.comforts || [],
        };
    
        if (formData.minRange && formData.minRange !== 0) {
            transformedFormData.minPrice = formData.minRange;
        }
    
        if (formData.maxRange && formData.maxRange !== 0) {
            transformedFormData.maxPrice = formData.maxRange;
        }
    
        return transformedFormData;
    },
    
    handleBrandChange: (event, setFormData, setSelectedBrandModel, carBrands) => {
      const newBrand = event.target.value;
  
      setSelectedBrandModel((prev) => ({ ...prev, brand: newBrand }));
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        brand: newBrand,
        model: "",
      }));
  
      if (!carBrands[1][newBrand]?.includes(setSelectedBrandModel.model)) {
        setSelectedBrandModel((prev) => ({ ...prev, model: "" }));
      }
    },
  
    handleModelChange: (event, setFormData, setSelectedBrandModel) => {
      const newModel = event.target.value;
  
      setSelectedBrandModel((prev) => ({ ...prev, model: newModel }));
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        model: newModel,
      }));
    },
  };
  
  export default CarSearchService;
  