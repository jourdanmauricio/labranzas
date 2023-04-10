import { TypeWithKey } from '@/models';

// https://www.youtube.com/watch?v=axtI0lURwAw

export const validateApiError = (status: any) => {
  const codeMatcher: TypeWithKey<string> = {
    404: 'Not found',
    401: 'Unauthorized',
    // ERR_NETWORK: 'Error en la conexión',
    // ERR_BAD_REQUEST: 'Error en la conexión',
  };

  return codeMatcher[status];
};
