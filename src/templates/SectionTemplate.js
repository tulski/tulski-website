import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from 'utils';

const Wrapper = styled.div`
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

const SectionTemplate = ({ className, children }) => (
  <Wrapper className={className}>{children}</Wrapper>
);

SectionTemplate.propTypes = {
  className: PropTypes.node,
  children: PropTypes.node.isRequired,
};

SectionTemplate.defaultProps = {
  className: null,
};

export default SectionTemplate;
