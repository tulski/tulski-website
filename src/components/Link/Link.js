import styled, { css } from 'styled-components';

const Link = styled.a`
  grid-column: 2;
  margin: 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: inherit;
  text-decoration: underline;

  ${({ small, theme }) =>
    small &&
    css`
      font-size: ${theme.fontSize.s};
      color: ${theme.secondary60};
    `}
`;

export default Link;
