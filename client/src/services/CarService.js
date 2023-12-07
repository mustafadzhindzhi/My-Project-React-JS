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

//getNewest
export const getNewest = async () => {
  const query = encodeURIComponent(`offset=0&pageSize=10`);
  const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc&${query}`);

  return result;
};

//like
export const likeCar = async (carId, userId, authToken) => {
  try {
    const allCars = await getAll();
    const carToUpdate = allCars.find((car) => car._id === carId);

    console.log('Car to update:', carToUpdate);

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


//stars
export const submitRating = async (carId, userId, rating) => {
  try {
    const payload = { userId, rating };

    const response = await request.post(`${baseUrl}/${carId}/rate`, payload);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error submitting rating:', response.status, errorData.message);
      throw new Error(`Failed to submit rating. Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error submitting rating:', error);
    throw error;
  }
};

//average rating star
export const getAverageRating = async (carId) => {
  try {
    const response = await request.get(`${baseUrl}/${carId}/averageRating`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching average rating:', response.status, errorData.message);
      throw new Error(`Failed to fetch average rating. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.averageRating;
  } catch (error) {
    console.error('Error fetching average rating:', error);
    throw error;
  }
}