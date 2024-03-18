import CarSearchService from "../services/CarSearchService.js";
import { useState } from "react";

const useSearchForm = (onSearch, setSelectedBrandModel, carBrands) => {
  const [formData, setFormData] = useState(
    CarSearchService.getInitialFormData()
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(CarSearchService.handleFormChange(formData, name, value));
  };

  const handleSliderChange = (event) => {
    setFormData(CarSearchService.handleSliderChange(formData, event));
  };

  const handleComfortChange = (event) => {
    setFormData(CarSearchService.handleComfortChange(formData, event));
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearch(formData);
  };

  const handleSearchClick = () => {
    const transformedFormData =
      CarSearchService.transformSearchCriteria(formData);
    onSearch(transformedFormData);
  };

  const handleBrandChange = (event) => {
    CarSearchService.handleBrandChange(
      event,
      setFormData,
      setSelectedBrandModel,
      carBrands
    );
  };

  const handleModelChange = (event) => {
    CarSearchService.handleModelChange(
      event,
      setFormData,
      setSelectedBrandModel
    );
  };

  return {
    formData,
    handleChange,
    handleSliderChange,
    handleComfortChange,
    handleFormSubmit,
    handleSearchClick,
    handleBrandChange,
    handleModelChange,
  };
};

export default useSearchForm;
