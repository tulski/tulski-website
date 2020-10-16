import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { media } from 'utils';

import Box from 'components/Box/Box';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.secondary};
  transform: translate(-2rem, 2rem);
  overflow: hidden;

  ${media.mobileL`
  display: none;
  `}
`;

const Container = styled.div`
  position: relative;
  width: 60%;

  &:after {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const Magnet = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ boxSize }) => boxSize}px;
  width: ${({ boxSize }) => boxSize}px;
  border-radius: ${({ boxSize }) => boxSize * 0.33}px;
  border: 0.25rem solid ${({ theme }) => theme.primary};
`;

const Matrix = () => {
  const [containerSize, setContainerSize] = useState(420);
  const containerRef = useRef(null);
  const rows = [0, 1, 2, 3, 4, 5];
  const columns = rows;
  const boxSize = containerSize / rows.length;

  const transition = { duration: 3, loop: Infinity, ease: 'easeOut' };

  const x = useMotionValue(-boxSize);
  const y = useMotionValue(-boxSize);
  const animation = useAnimation();

  useEffect(() => {
    setContainerSize(containerRef.current.getBoundingClientRect().height);
  }, []);

  const loopAnimation = useCallback(
    () =>
      animation.start({
        x: [-boxSize, containerSize, containerSize, -boxSize, -boxSize],
        y: [-boxSize, -boxSize, containerSize, containerSize, -boxSize],
        rotate: [0, 0, 90, 90, 180, 180, 270, 270, 360],
        transition,
      }),
    [animation, containerSize, transition, boxSize],
  );

  const stopAnimation = useCallback(() => animation.stop(), [animation]);

  const restartAnimation = async () => {
    await animation.start({
      x: -boxSize,
      y: -boxSize,
      rotate: 0,
    });
    await loopAnimation();
  };

  const handleMouseMove = (event) => {
    x.set(
      event.pageX -
        containerRef.current.getBoundingClientRect().x -
        boxSize / 2,
    );
    y.set(
      event.pageY -
        containerRef.current.getBoundingClientRect().y -
        boxSize / 2,
    );
  };

  useEffect(() => {
    loopAnimation();
    return () => stopAnimation();
  }, [loopAnimation, stopAnimation]);

  return (
    <Wrapper
      onMouseEnter={stopAnimation}
      onMouseLeave={restartAnimation}
      onMouseMove={handleMouseMove}
    >
      <Container ref={containerRef}>
        {rows.map((row, rowIndex) =>
          columns.map((column, columnIndex) => (
            <Box
              x={x}
              y={y}
              row={rowIndex}
              column={columnIndex}
              key={`${row}${column}`}
              containerSize={containerSize}
              boxSize={boxSize}
            />
          )),
        )}
        <Magnet
          style={{
            x,
            y,
            scale: 0.5,
          }}
          animate={animation}
          boxSize={boxSize}
        />
      </Container>
    </Wrapper>
  );
};

export default Matrix;
