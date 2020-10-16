import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import { media } from 'utils';

import ParallaxContainer from 'containers/ParallaxContainer';
import SectionTemplate from 'templates/SectionTemplate';
import Paragraph from 'components/Paragraph/Paragraph';
import Button from 'components/Button/Button';

const StyledParallaxContainer = styled(ParallaxContainer)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const AboutWrapper = styled(motion.div)`
  margin: 0 auto;
  width: 80%;
  display: flex;
  align-items: center;

  ${media.tablet`
  width:100%;
  `}

  ${media.mobileL`
  margin: 0;
  `}
`;

const AboutTextWrapper = styled.div`
  flex: 0 0 66.666%;
  max-width: 66.666%;

  ${media.tablet`
  max-width:100%;
  flex: 1 0 100%;
  `}
`;

const AboutText = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  line-height: 1.2;
  min-height: 231px;

  & strong {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.red};
  }

  ${media.mobileL`
  min-width: none;
  font-size: ${({ theme }) => theme.fontSize.m};
  `}
`;

const ImageWrapper = styled(ParallaxContainer)`
  flex: 0 0 33.333%;
  max-width: 33.333%;

  ${media.tablet`
  flex: 0 0 0;
  display:none;`}
`;

const StyledImg = styled(Img)`
  width: 95%;
  margin: 0 auto;
  max-width: 100%;
  box-shadow: ${({ theme }) => theme.boxShadow.xLarge};
`;

const AboutSection = () => {
  const typedEl = useRef();

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "about-image.jpeg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);

  useEffect(() => {
    const options = {
      strings: [
        'learn <strong>new skills</strong>. 👀',
        'create 💻 <strong>experiences.</strong>',
        'discover <strong>new things</strong>.',
        'create 🔥 <strong>websites</strong>.',
        'create 🚀 <strong>apps</strong>.',
      ],
      typeSpeed: 75,
      backSpeed: 50,
      startDelay: 1000,
      backDelay: 2000,
      smartBackspace: true,
      showCursor: false,
      shuffle: true,
      loop: true,
      loopCount: Infinity,
    };
    const typed = new Typed(typedEl.current, options);
    return () => typed.destroy();
  });

  return (
    <SectionTemplate>
      <StyledParallaxContainer translateRange={[5, -5]}>
        {({ translateX, translateY }) => (
          <AboutWrapper style={{ translateX, translateY }}>
            <AboutTextWrapper>
              <AboutText>
                hi, my name is <strong>Michał Tułowiecki</strong>,
                <br />
                <br />
                wanna-be <strong>web developer</strong>,
                <br />
                <strong>cybersecurity</strong> student
                <br />
                and <strong>coffee</strong> geek.
                <br />
                I love to <span ref={typedEl} />
              </AboutText>
              <Paragraph gray semiBold>
                based in Warsaw, currently looking for a job
              </Paragraph>
              <Button name="contact">contact me!</Button>
            </AboutTextWrapper>
            <ImageWrapper
              rotateXRange={[-10, 10]}
              rotateYRange={[-15, 15]}
              whileHover={{ scale: 1.15 }}
            >
              {({ rotateX, rotateY }) => (
                <motion.div style={{ rotateX, rotateY }}>
                  <StyledImg fluid={data.file.childImageSharp.fluid} />
                </motion.div>
              )}
            </ImageWrapper>
          </AboutWrapper>
        )}
      </StyledParallaxContainer>
    </SectionTemplate>
  );
};

export default AboutSection;
