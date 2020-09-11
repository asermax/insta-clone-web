import { useCallback, useState } from 'react';
import { post } from '../api';

export const useLogin = (username, password) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(() => {
    const doLogin = async () => {
      const [data, status] = await post('users/login/', { username, password });

      if (status === 200) {
        setSuccess(true);
      } else {
        setError(data.detail);
      }
    };
    doLogin();
  }, [username, password, setSuccess, setError]);

  return [login, success, error];
};
