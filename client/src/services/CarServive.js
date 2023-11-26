import * as request from '../lib/request.js';

const baseUrl = 'http://localhost:3030/data/cars'; //i need to add my cars in server.js

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