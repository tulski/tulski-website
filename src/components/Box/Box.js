import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { motion, useMotionValue, transform } from 'framer-motion';

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
    function calcAngle(top, left, cursorTop, cursorLeft) {
      let angle =
        Math.atan2(cursorTop - left, cursorLeft - top) * (180 / Math.PI);
      return angle < 0 ? -(angle + 540) : -(angle + 180);
    }

    function updateProps() {
      const updatedAngle = calcAngle(top, left, x.get(), y.get());
      angle.set(updatedAngle);

      const proximity = Math.max(
        Math.abs(left - x.get()),
        Math.abs(top - y.get())
      );
      const newColor = transform(
        proximity,
        [0, containerSize - boxSize],
        [theme.yellow, theme.red]
      );
      const newScale = transform(
        proximity,
        [0, containerSize - boxSize],
        [0.8, 0.5]
      );
      const newBorderRadius = transform(
        proximity,
        [0, containerSize - boxSize],
        [boxSize * 0.11, boxSize * 0.33]
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
  }, []);

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
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  boxSize: PropTypes.number.isRequired,
  containerSize: PropTypes.number.isRequired,
  theme: PropTypes.number.isRequired,
};

export default withTheme(Box);
