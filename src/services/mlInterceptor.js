import axios from 'axios';
// import { store } from '../store';
// import { getUserMl } from '../store/userMl';

export const axiosMl = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_PATH_ML,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosMl.interceptors.request.use(
//   async (config) => {
//     const state = store.getState();
//     const token = state.userMl.userMl.access_token;
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

axiosMl.interceptors.response.use(
  function (response) {
    return response;
  },
  function async(err) {
    // const originalConfig = err.config;

    // if (err.response.status === 401 && !originalConfig._retry) {
    //   originalConfig._retry = true;
    //   store.dispatch(getUserMl());
    //   return axiosMl(originalConfig);
    // }
    // const errorMessage = validateApiError(error.response.status);
    const message = err.response.status
      ? `${err.response.status}: ${err.response.data.message}`
      : 'Verificar !!! localInteceptor';

    return Promise.reject(message);
  }
);
