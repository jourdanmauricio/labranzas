import axios from 'axios';
// import { validateApiError } from '../lib/validate-api-error';

export const localInterceptor = () => {
  const updateHeader = (request) => {
    const newHeaders = {
      // 'Authorization': `Bearer ${token}`;
      'Content-Type': 'application/json',
    };
    request.headers = newHeaders;
    return request;
  };

  axios.interceptors.request.use((request) => {
    // if (request.url?.includes('ejemplo')) {
    //   return request;
    // }
    return updateHeader(request);
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      console.log('Error', err);
      // const errorMessage = validateApiError(error.response.status);
      const message = err.response.status
        ? `${err.response.status}: ${err.response.data.message}`
        : 'Verificar !!! localInteceptor';

      return Promise.reject(message);
    }
  );
};
