export function filterCars(cars, searchCriteria) {
    return cars.filter((car) => {
      const brandMatch =
        !searchCriteria.brand ||
        searchCriteria.brand === "" ||
        car.brand === searchCriteria.brand;
  
      const modelMatch = !searchCriteria.model || car.model === searchCriteria.model;
  
      const priceMatch =
        (searchCriteria.minPrice === 0 || car.price >= searchCriteria.minPrice) &&
        (searchCriteria.maxPrice === 0 || car.price <= searchCriteria.maxPrice);
  
      const transmissionMatch =
        !searchCriteria.transmission ||
        car.transmission.trim().toLowerCase() === searchCriteria.transmission.trim().toLowerCase();
  
      const fuelMatch =
        !searchCriteria.fuel ||
        car.fuel.trim().toLowerCase() === searchCriteria.fuel.trim().toLowerCase();
  
      const comfortsMatch =
        searchCriteria.comforts.length === 0 ||
        searchCriteria.comforts.every((comfort) => car.comforts.includes(comfort)); // <-- Remove extra ')' here
  
      return (
        brandMatch &&
        modelMatch &&
        priceMatch &&
        transmissionMatch &&
        fuelMatch &&
        comfortsMatch
      );
    })}  