import * as request from '../lib/request.js';

const baseUrl = 'http://localhost:3030/data/cars';
const CAR_BRANDS_URL = 'http://localhost:3030/data/carbrands';  


//all cars
export const getAll = async () => {
    const result = await request.get(baseUrl);

    return Object.values(result);
}

//one car
export const getOne = async(carId) => {
    const result = await request.get(`${baseUrl}/${carId}`);

    return result;
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
export const create = async(carData) =>{
    const result = await request.post(baseUrl, carData);

    return result;
}

//edit 
export const edit = async(carId, carData) => {
    const result = await request.put(`${baseUrl}/${carId}`, carData);

    return result;
};

//remove
export const remove = async(carId) => request.remove(`${baseUrl}/${carId}`);

//getNewest
export const getNewest = async() => {
    const query = encodeURIComponent(`offset=0&pageSize=10`);
    const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc&${query}`);

    return result;
};
