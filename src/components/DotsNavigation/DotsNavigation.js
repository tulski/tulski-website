import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { media } from 'utils';

const StyledAside = styled.aside`
  width: min-content;
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 200;

  ${media.tablet`
    top: 2rem;
    left:50%;
    transform: translateX(-50%);
    display:flex;
  `}

  ${media.mobileL`
    display:none;
  `}
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 0.5rem;
  cursor: pointer;
`;

const Dot = styled(motion.div)`
  display: block;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.secondary};
`;

const DotsNavigation = ({ scrollYProgress }) => {
  const homeTransform = useTransform(scrollYProgress, [0, 0.3333], [1, 0.5]);
  const aboutMeTransform = useTransform(
    scrollYProgress,
    [0, 0.3333, 0.6666],
    [0.5, 1, 0.5],
  );
  const projectsTransform = useTransform(
    scrollYProgress,
    [0.3333, 0.6666, 1],
    [0.5, 1, 0.5],
  );
  const contactTransform = useTransform(scrollYProgress, [0.6666, 1], [0.5, 1]);
  return (
    <StyledAside>
      <StyledLink to="home" containerId="root" smooth>
        <Dot style={{ scale: homeTransform, opacity: homeTransform }} />
      </StyledLink>
      <StyledLink to="aboutMe" containerId="root" smooth>
        <Dot style={{ scale: aboutMeTransform, opacity: aboutMeTransform }} />
      </StyledLink>
      <StyledLink to="projects" containerId="root" smooth>
        <Dot style={{ scale: projectsTransform, opacity: projectsTransform }} />
      </StyledLink>
      <StyledLink to="contact" containerId="root" smooth>
        <Dot style={{ scale: contactTransform, opacity: contactTransform }} />
      </StyledLink>
    </StyledAside>
  );
};

DotsNavigation.propTypes = {
  scrollYProgress: PropTypes.instanceOf(MotionValue).isRequired,
};

export default DotsNavigation;
