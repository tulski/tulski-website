import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from 'utils';

import moon from 'assets/svgs/moon.svg';
import clouds from 'assets/svgs/clouds.svg';
import stars from 'assets/svgs/stars.svg';

const Toggle = styled(motion.div)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  padding: 0.125rem;
  height: 2rem;
  width: 3.75rem;
  border-radius: 1.875rem;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-repeat: no-repeat;
  background-size: 30% 30%;
  background-position: 70% 50%;
  z-index: 100;

  ${media.mobileL`
    height:1.5rem;
    width: 2.75rem;
    top: 1rem;
    right: 1rem;
  `}
`;

const Circle = styled(motion.span)`
  display: block;
  margin: 0;
  height: 100%;
  width: 50%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.yellow};
  background-repeat: no-repeat;
  background-size: 110% 110%;
  background-position: 50% 50%;
`;

const ThemeToggle = ({ themeMode, toggleThemeMode }) => {
  const toggleVariants = {
    light: {
      backgroundColor: '#63A4FF',
      backgroundImage: `url(${clouds})`,
      backgroundPosition: '70% 50%',
    },
    dark: {
      backgroundColor: '#00274F',
      backgroundImage: `url(${stars})`,
      backgroundPosition: '30% 50%',
    },
  };
  const circleVariants = {
    light: {
      x: 0,
      backgroundColor: '#FAC900',
      backgroundImage: 'none',
      boxShadow:
        '2px 2px 5px rgba(250, 217, 0, 0.25), -2px -2px 4px rgba(250, 217, 0, 0.25)',
      rotate: -180,
    },
    dark: {
      x: '100%',
      backgroundColor: '#D3D3D3',
      backgroundImage: `url(${moon})`,
      boxShadow: 'none',
      rotate: 0,
    },
  };
  const transition = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <Toggle
      onClick={toggleThemeMode}
      initial={themeMode === 'dark' ? 'dark' : 'light'}
      animate={themeMode === 'dark' ? 'dark' : 'light'}
      variants={toggleVariants}
      transition={transition}
    >
      <Circle
        initial={themeMode === 'dark' ? 'dark' : 'light'}
        animate={themeMode === 'dark' ? 'dark' : 'light'}
        variants={circleVariants}
        transition={transition}
      />
    </Toggle>
  );
};

ThemeToggle.propTypes = {
  themeMode: PropTypes.string.isRequired,
  toggleThemeMode: PropTypes.func.isRequired,
};

export default ThemeToggle;
