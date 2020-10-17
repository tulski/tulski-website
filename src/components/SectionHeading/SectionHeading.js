import styled from 'styled-components';
import { media } from 'utils';

const SectionHeading = styled.h3`
  margin: 2rem 0;
  grid-column: span 2;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontSize.extraBold};

  & strong {
    color: ${({ theme }) => theme.red};
    font-weight: ${({ theme }) => theme.fontSize.extraBold};
  }

  ${media.mobileL`
  font-size: ${({ theme }) => theme.fontSize.l};
  `}

  ${media.mobileL`
  margin: 3rem 0 2rem`}
`;

export default SectionHeading;
