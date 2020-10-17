import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Link } from 'react-scroll';
import { media } from 'utils';

const StyledSvg = styled(motion.svg).attrs({
  viewBox: '0 0 14 8',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
})`
  position: absolute;
  left: calc(50% - 1.5rem);
  bottom: 2rem;
  width: 3rem;
  stroke: ${({ theme }) => theme.secondary};
  cursor: pointer;

  ${media.mobileL`
    left: calc(50% - 1.25rem);
    bottom: 6rem;
    width: 2.5rem;
  `}
`;

const SwipeArrow = ({ scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, [0, 0.1666], [1, 0]);
  const transition = {
    duration: 2,
    repeat: Infinity,
    type: 'spring',
  };

  return (
    <Link to="aboutMe" containerId="root" smooth>
      <StyledSvg
        animate={{ y: ['-20%', '20%', '-20%'] }}
        transition={transition}
        style={{ opacity }}
      >
        <path d="M13 1L7 7L1 1" strokeLinecap="round" strokeLinejoin="round" />
      </StyledSvg>
    </Link>
  );
};

SwipeArrow.propTypes = {
  scrollYProgress: PropTypes.instanceOf(MotionValue).isRequired,
};

export default SwipeArrow;
