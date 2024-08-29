import axios from 'axios';

const url = 'http://localhost:5000/api';

export const getUsers = () => axios.get(`${url}/users`);
export const addUsers = (user) => axios.post(`${url}/users`, user);
export const deleteUsers = (id) => axios.delete(`${url}/users/${id}`);
export const exportUsers = (userIds) => axios.post(`${url}/users/export`, { userIds }, { responseType: 'blob' });