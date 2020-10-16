import React from 'react';
import styled from 'styled-components';
import { media } from 'utils';

import SectionTemplate from 'templates/SectionTemplate';
import SectionHeading from 'components/SectionHeading/SectionHeading';
import Matrix from 'components/Matrix/Matrix';
import Paragraph from 'components/Paragraph/Paragraph';
import Link from 'components/Link/Link';

const StyledSectionTemplate = styled(SectionTemplate)`
  grid-template: auto 1fr / 45fr 55fr;
  grid-row-gap: 3rem;

  ${media.mobileL`
  grid-template: auto 1fr / 1fr;
  `}
`;

const ContactsWrapper = styled.div`
  display: grid;
  grid-template: repeat(5fr) / 1fr 1fr;
  align-items: end;
  grid-column-gap: 1.75rem;
  transform: translateY(-3rem);
`;

const BigParagraph = styled(Paragraph)`
  margin: 1rem 0;
  grid-column: span 2;
  font-size: ${({ theme }) => theme.fontSize.l};
`;

const LightParagraph = styled(Paragraph)`
  margin: 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.light};
`;

const ContactSection = () => (
  <StyledSectionTemplate>
    <SectionHeading>contact.</SectionHeading>
    <Matrix />
    <ContactsWrapper>
      <BigParagraph as={Link} href="mailto: me@tulski.com">
        me@tulski.dev
      </BigParagraph>
      <BigParagraph as={Link} href="tel:+48538777372">
        +48 538 777 372
      </BigParagraph>
      <LightParagraph>connect me on</LightParagraph>
      <Link href="https://github.com/mtulowiecki">Github</Link>
      <Link href="https://www.linkedin.com/in/tulski/">LinekIn</Link>
      <Link href="https://www.instagram.com/to_tulo/">Instagram</Link>
    </ContactsWrapper>
  </StyledSectionTemplate>
);

export default ContactSection;
