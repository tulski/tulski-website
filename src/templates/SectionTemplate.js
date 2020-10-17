import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Element } from 'react-scroll';
import { media } from 'utils';

const Wrapper = styled(Element)`
  scroll-snap-align: start;
  padding: 2rem;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;

  ${media.mobileL`
  padding: 1rem;
  `}
`;

const SectionTemplate = ({ id, className, children }) => (
  <Wrapper id={id} name={id} className={className}>
    {children}
  </Wrapper>
);

SectionTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

SectionTemplate.defaultProps = {
  className: null,
};

export default SectionTemplate;
