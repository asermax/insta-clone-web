import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useLogin } from '~/data/user';

const Container = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-shadow: 0 0 0.125rem 0.0625rem rgba(0, 0, 0, 0.34);

  h1 {
    margin: 0;
  }

  > * + * {
    margin-top: 1rem;
  }
`;

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, loginSuccess, loginError] = useLogin(username, password);
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    login();
  }, [login]);

  useEffect(() => {
    if (loginSuccess) {
      router.push('/');
    }
  }, [loginSuccess, router]);

  return (
    <Container>
      <LoginForm onSubmit={onSubmit}>
        <h1>
          InstaClone
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          disabled={username.trim() === '' || password.trim() === ''}
        >
          Login
        </button>
        {loginError != null ? loginError : null}
      </LoginForm>
    </Container>
  );
};

export default Login;
