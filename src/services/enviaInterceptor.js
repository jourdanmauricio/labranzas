import axios from 'axios';

export const axiosEnvia = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENVIA_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosEnvia.interceptors.request.use(
  async (config) => {
    const token = process.env.NEXT_PUBLIC_TOKEN_ENVIA;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosEnvia.interceptors.response.use(
  function (response) {
    return response;
  },
  function async(err) {
    const message = err.response.status
      ? `${err.response.status}: ${err.response.data.message}`
      : 'Verificar !!! localInteceptor';

    return Promise.reject(message);
  }
);
