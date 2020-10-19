import React from 'react';
import styled, { css } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { media } from 'utils';

import SectionTemplate from 'templates/SectionTemplate';
import SectionHeading from 'components/SectionHeading/SectionHeading';
import Paragraph from 'components/Paragraph/Paragraph';
import Link from 'components/Link/Link';

const StyledSectionTemplate = styled(SectionTemplate)`
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;

  ${media.tablet`
  padding: 2rem 0;
  `}
`;

const ProjectsWrapper = styled.div`
  display: grid;
  grid-template: repeat(2, 1fr) / 64fr 36fr;
  grid-gap: 5rem;

  ${media.tablet`
  height:100%;
  width:100%;
  grid-gap: 0;
  grid-template: 1fr / repeat(5, auto);
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;

  &::before, &::after {
    content:'';
    width:25vw;
  }
  `}

  ${media.mobileL`
    &::before, &::after {
      content:'';
      width:16.666vw;
  }
  `}
`;

const ProjectWrapper = styled.div`
  margin: 0;
  display: flex;
  scrollbar-width: none;

  &:nth-child(1) {
    grid-row: span 2;
  }

  ${media.tablet`
    padding: 3rem;
    height:100%;
    width:50vw;
    flex-direction: column;
    align-items: center;
    scroll-snap-align:  center;
  `}

  ${media.mobileL`
    justify-content:center;
    width:66.666vw;
    padding: 1rem
  `}
`;

const ProjectTextWrapper = styled.div`
  flex: 0 1 55%;
  max-width: 19rem;

  ${({ justify }) =>
    justify &&
    css`
      text-align: justify;
    `}

  ${media.tablet`
    flex: 0 0 33.333%;
    max-width: none;
  `}

  ${media.mobileL`
    flex: 0 0 5%;
  `}
`;

const StyledParagraph = styled(Paragraph)`
  ${media.mobileL`
    display:none;
  `}
`;

const StyledImgWrapper = styled.div`
  padding: 0 3rem 0 0;
  flex: 1 0 45%;

  ${media.tablet`
    width: 70%;
    flex: 0 0 66.666%;
    padding: 0 0 3rem;
  `}

  ${media.mobileL`
    padding: 0 0 1rem;
  `}
`;

const StyledImg = styled(Img)`
  margin: 0 auto;

  img {
    box-shadow: ${({ theme }) => theme.boxShadow.xLarge};
  }
`;

const WorkSection = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { regex: "/projects/" } }) {
        nodes {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
          name
        }
      }
    }
  `);

  const [tulokuFile] = data.allFile.nodes.filter(
    ({ name }) => name === 'tuloku',
  );
  const [tulartFile] = data.allFile.nodes.filter(
    ({ name }) => name === 'tulart',
  );
  const [tulowieckaFile] = data.allFile.nodes.filter(
    ({ name }) => name === 'tulowiecka',
  );

  return (
    <StyledSectionTemplate id="projects">
      <SectionHeading>
        work.<strong>work.</strong>work.<strong>work.</strong>
        work.
      </SectionHeading>
      <ProjectsWrapper>
        <ProjectWrapper>
          <StyledImgWrapper>
            <StyledImg
              fluid={tulokuFile.childImageSharp.fluid}
              imgStyle={{ objectFit: 'contain' }}
            />
          </StyledImgWrapper>
          <ProjectTextWrapper justify>
            <div>
              <Link small href="https://tuloku.netlify.app/">
                live demo
              </Link>{' '}
              –{' '}
              <Link small href="https://github.com/tulski/tuloku">
                repository
              </Link>
            </div>
            <StyledParagraph semiBold>
              Progressive Web App made out of love to sudoku. Complete react
              game with redux dynamic modules and framer-motion animations.
              Simple, minimalist design.
            </StyledParagraph>
          </ProjectTextWrapper>
        </ProjectWrapper>
        <ProjectWrapper>
          <StyledImgWrapper>
            <StyledImg
              fluid={tulowieckaFile.childImageSharp.fluid}
              imgStyle={{ objectFit: 'contain' }}
            />
          </StyledImgWrapper>
          <ProjectTextWrapper>
            <div>
              <Link small href="https://tulowiecka.pl">
                live demo
              </Link>{' '}
              –{' '}
              <Link small href="https://github.com/tulski/tulowiecka-website">
                repository
              </Link>
            </div>
            <StyledParagraph semiBold>
              Simple buissnes landing page
            </StyledParagraph>
          </ProjectTextWrapper>
        </ProjectWrapper>
        <ProjectWrapper>
          <StyledImgWrapper>
            <StyledImg
              fluid={tulartFile.childImageSharp.fluid}
              imgStyle={{ objectFit: 'contain' }}
            />
          </StyledImgWrapper>
          <ProjectTextWrapper>
            <div>
              <Link small href="https://tulart.tulski.com/">
                live demo
              </Link>{' '}
              –{' '}
              <Link small href="https://github.com/tulski/tulart-website">
                repository
              </Link>
            </div>
            <StyledParagraph semiBold>eCommerce website</StyledParagraph>
          </ProjectTextWrapper>
        </ProjectWrapper>
      </ProjectsWrapper>
    </StyledSectionTemplate>
  );
};

export default WorkSection;
