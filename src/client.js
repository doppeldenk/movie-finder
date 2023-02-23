import axios from 'axios';

const apiKey = 'd2e9bfa0'; // TODO: this is super unsafe and for testing purposes, this should be stored somewhere secure

const instance = axios.create({
  baseURL: `http://www.omdbapi.com/?apikey=${apiKey}`,
});

instance.interceptors.response.use(
  response => response,
  error => {
    alert('An error has occurred, check console for more info'); // TODO: make prettier error messages
    console.log(error);
  }
);

export const searchMoviesByTitle = async (s, page) => {
  const response = await instance.get('', {
    params: {
      s,
      page,
    }
  });
  return response.data;
};

export const getMovieById = async i => {
  const response = await instance.get('', {
    params: { i }
  });
  return response.data;
};

