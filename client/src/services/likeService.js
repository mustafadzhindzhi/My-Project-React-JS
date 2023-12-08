import * as request from '../lib/request.js';

const baseUrl = 'http://localhost:3030/data/likes';

export const getAllLikesForCar = async (carId) => {
    return await request.get(`${baseUrl}?where=carId%3D%22${carId}%22&distincs=_ownerId&count`);
};

export const addLike = async (data) => {
    return await request.post(baseUrl, data);
};

export const unLike = async(likeId) => {
    await request.remove(`${baseUrl}/${likeId}`)
}

export const checkCarLiked = async (carId, userId) => {
    return await request.get(`${baseUrl}?where=carId%3D%22${carId}%22%20and%20_ownerId%3D%22${userId}%22%count`);
};

export const getAllLikes = async (carId) => {
    const query = new URLSearchParams({
        where: `carId="${carId}"`,
        load: `owner=_ownerId:users`
    });

    return await request.post(`${baseUrl}?${query}`);
};
