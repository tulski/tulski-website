import styled from 'styled-components';
import { media } from 'utils';

const Button = styled.button`
  border: none;
  padding: 0.5rem 1.625rem;
  border-radius: 2.5rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.m};
  background-color: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.primary};

  ${media.mobileL`
  font-size: ${({ theme }) => theme.fontSize.s};
  `}
`;

export default Button;
