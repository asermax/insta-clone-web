import styled from 'styled-components';

export const Button = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: #0095f6;
  font-weight: 700;
  text-decoration: none;

  &:disabled {
    opacity: 0.3;
  }
`;
