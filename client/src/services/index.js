import axios from 'axios';

let url = 'http://localhost:4000';

export const getUsers = () => {
  return axios.get(`${url}/users/`);
};

export const getOneUser = (id) => {
  return axios.get(`${url}/users/${id}`);
};

export const addUser = (data) => {
  return axios.post(`${url}/users/create`, data);
};

export const editUser = (data, id) => {
  return axios.put(`${url}/users/${id}`, data);
};

export const deleteUser = (id) => {
  return axios.delete(`${url}/users/${id}`);
};
