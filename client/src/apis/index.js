import axios from 'axios';

const URL = 'http://localhost:8081';

export const register = payload =>
  axios.post(`${URL}/Auth/register`, {payload});
export const login = payload => axios.post(`${URL}/Auth/login`, {payload});

export const getPost = () => axios.get(`${URL}/Post`);
export const getPostbyID = payload => axios.get(`${URL}/Post/${payload}`);
export const creatPost = payload => axios.post(`${URL}/Post`, {payload});
export const deletePost = payload => axios.delete(`${URL}/Post/${payload}`);

export const updatePost = payload => {
  const input = payload.input;
  const postId = payload.postId;
  return axios.put(`${URL}/Post/${postId}`, {input});
};

export const createComment = payload => {
  const input = payload.input;
  const postId = payload.postId;
  return axios.post(`${URL}/Comment/${postId}`, {input});
};
export const deleteComment = payload =>
  axios.delete(`${URL}/Comment/${payload}`);
export const getComments = payload => axios.get(`${URL}/Comment/${payload}`);
export const getResComment = payload =>
  axios.get(`${URL}/Comment/Noti/${payload}`);

export const addVote = payload => axios.post(`${URL}/Vote/addVote`, {payload});
export const getVoteByUserID = payload => axios.get(`${URL}/Vote/${payload}`);
