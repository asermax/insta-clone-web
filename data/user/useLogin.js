import { useCallback, useState } from 'react';
import { queryCache } from 'react-query';
import { post } from '../api';

export const useLogin = (username, password) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(() => {
    const doLogin = async () => {
      const [data, status] = await post('users/login/', { username, password });

      if (status === 200) {
        setSuccess(true);
        queryCache.setQueryData(['users', 'me'], () => data);
      } else {
        setError(data.detail);
      }
    };
    doLogin();
  }, [username, password, setSuccess, setError]);

  return [login, success, error];
};
