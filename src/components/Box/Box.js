import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { motion, useMotionValue, transform, MotionValue } from 'framer-motion';

const StyledBox = styled(motion.div)`
  position: absolute;
  height: ${({ boxSize }) => boxSize}px;
  width: ${({ boxSize }) => boxSize}px;
  border-radius: ${({ boxSize }) => boxSize * 0.33}px;
`;

const Box = ({ x, y, row, column, boxSize, containerSize, theme }) => {
  const top = column * boxSize;
  const left = row * boxSize;

  const angle = useMotionValue(0);
  const scale = useMotionValue(0);
  const borderRadius = useMotionValue(0);
  const background = useMotionValue('');

  useEffect(() => {
    function calcAngle(cursorTop, cursorLeft) {
      const calculatedAngle =
        Math.atan2(cursorTop, cursorLeft) * (180 / Math.PI);
      return calculatedAngle < 0
        ? -(calculatedAngle + 540)
        : -(calculatedAngle + 180);
    }

    function updateProps() {
      const updatedAngle = calcAngle(x.get(), y.get());
      angle.set(updatedAngle);

      const proximity = Math.max(
        Math.abs(left - x.get()),
        Math.abs(top - y.get()),
      );
      const newColor = transform(
        proximity,
        [0, containerSize - boxSize],
        [theme.yellow, theme.red],
      );
      const newScale = transform(
        proximity,
        [0, containerSize - boxSize],
        [0.8, 0.5],
      );
      const newBorderRadius = transform(
        proximity,
        [0, containerSize - boxSize],
        [boxSize * 0.11, boxSize * 0.33],
      );
      background.set(newColor);
      scale.set(newScale);
      borderRadius.set(newBorderRadius);
    }

    const unsubscribeX = x.onChange(updateProps);
    const unsubscribeY = y.onChange(updateProps);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [
    angle,
    background,
    borderRadius,
    boxSize,
    containerSize,
    left,
    scale,
    theme.red,
    theme.yellow,
    top,
    x,
    y,
  ]);

  return (
    <StyledBox
      boxSize={boxSize}
      style={{
        top,
        left,
        background,
        scale,
        borderRadius,
      }}
      rotate={angle}
    />
  );
};

Box.propTypes = {
  x: PropTypes.instanceOf(MotionValue).isRequired,
  y: PropTypes.instanceOf(MotionValue).isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  boxSize: PropTypes.number.isRequired,
  containerSize: PropTypes.number.isRequired,
  theme: PropTypes.shape({
    yellow: PropTypes.string.isRequired,
    red: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTheme(Box);
