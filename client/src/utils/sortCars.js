const sortCars = (cars, option) => {
    let sortedCars = [...cars];
  
    switch (option) {
      case "priceAscending":
        sortedCars.sort((a, b) => a.price - b.price);
        break;
      case "priceDescending":
        sortedCars.sort((a, b) => b.price - a.price);
        break;
      case "brandModelAscending":
        sortedCars.sort((a, b) => {
          if (a.brand === b.brand) {
            return a.model.localeCompare(b.model);
          }
          return a.brand.localeCompare(b.brand);
        });
        break;
      case "brandModelDescending":
        sortedCars.sort((a, b) => {
          if (a.brand === b.brand) {
            return b.model.localeCompare(a.model);
          }
          return b.brand.localeCompare(a.brand);
        });
        break;
      case "newest":
        sortedCars.sort((a, b) => b._createdOn - a._createdOn);
        break;
      case "oldest":
        sortedCars.sort((a, b) => a._createdOn - b._createdOn);
        break;
      default:
        break;
    }
  
    return sortedCars;
  };
  
  export default sortCars;
  