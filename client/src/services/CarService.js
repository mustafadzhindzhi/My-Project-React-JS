import * as request from '../lib/request.js';

const baseUrl = 'http://localhost:3030/data/cars';
const CAR_BRANDS_URL = 'http://localhost:3030/data/carbrands';


//all cars
export const getAll = async () => {
  const result = await request.get(baseUrl);

  return Object.values(result);
}

//one car
export const getOne = async (carId) => {
  try {
    const result = await request.get(`${baseUrl}/${carId}`);

    return result;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
};

//model-brands
const getCarBrands = async () => {
  try {
    const response = await fetch(CAR_BRANDS_URL);
    if (!response.ok) {
      console.error('Error fetching car brands:', response.status, response.statusText);
      throw new Error(`Failed to fetch car brands. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching car brands data:', error);
    throw error;
  }
};

export { getCarBrands };

//create
export const create = async (carData) => {
  const result = await request.post(baseUrl, carData);

  return result;
}

//edit 
export const edit = async (carId, carData) => {
  const result = await request.put(`${baseUrl}/${carId}`, carData);

  return result;
};

//remove
export const remove = async (carId) => request.remove(`${baseUrl}/${carId}`);

//like
export const likeCar = async (carId, userId, authToken) => {
  try {
    const allCars = await getAll();
    const carToUpdate = allCars.find((car) => car._id === carId);
    
    if (!carToUpdate) {
      throw new Error(`Car with ID ${carId} not found`);
    }

    carToUpdate.likes += 1;

    const updatedCar = await fetch(`http://localhost:3030/data/cars/${carId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'X-Authorization': authToken
      },
      body: JSON.stringify(carToUpdate)
    })

    const updatedCars = allCars.map((car) =>
      car.id === carId ? updatedCar : car
    );

    return updatedCars;
  } catch (error) {
    console.error('Error liking car:', error);
    throw new Error(`Error liking car: ${error.message}`);
  }
};

//sorting
export const getAllSorted = async (sortOption) => {
  try {
    let sortByParam = '';

    if (sortOption === 'priceAscending') {
      sortByParam = 'price';
    } else if (sortOption === 'priceDescending') {
      sortByParam = 'price desc';
    } else if (sortOption === 'brandModelAscending') {
      sortByParam = 'brand,model';
    } else if (sortOption === 'brandModelDescending') {
      sortByParam = 'brand desc,model desc';
    } else if (sortOption === 'newest') {
      sortByParam = '_createdOn desc';
    } else if (sortOption === 'oldest') {
      sortByParam = '_createdOn asc';
    }

    const response = await fetch(`${baseUrl}?sortBy=${encodeURIComponent(sortByParam)}`);
    
    if (!response.ok) {
      console.error('Error fetching sorted cars:', response.status, response.statusText);
      throw new Error(`Failed to fetch sorted cars. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching sorted cars data:', error);
    throw error;
  }
};

export const getNewest = async () => {
  try {
    const response = await fetch(`${baseUrl}?sortBy=_createdOn desc`);
    if (!response.ok) {
      throw new Error(`Failed to fetch newest cars. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching newest cars data:', error);
    throw error;
  }
};

export const getOldest = async () => {
  try {
    const response = await fetch(`${baseUrl}?sortBy=_createdOn asc`);
    if (!response.ok) {
      throw new Error(`Failed to fetch oldest cars. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching oldest cars data:', error);
    throw error;
  }
};




