import styled, { css } from 'styled-components';
import { media } from 'utils';

const Paragraph = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  ${({ gray, theme }) =>
    gray &&
    css`
      margin: 2rem 0 3rem;
      color: ${theme.secondary60};
    `}

  ${({ semiBold, theme }) =>
    semiBold &&
    css`
      font-weight: ${theme.fontWeight.semiBold};
    `}


    ${media.mobileL`
    font-size: ${({ theme }) => theme.fontSize.s};
    `}
`;

export default Paragraph;
