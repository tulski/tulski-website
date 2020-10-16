import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSpring, useMotionValue, transform } from 'framer-motion';

const ParallaxContainer = ({
  translateRange,
  rotateXRange,
  rotateYRange,
  className,
  children,
}) => {
  const containerEl = useRef();

  const x = useSpring(0, { stiffness: 400, mass: 0.5 });
  const y = useSpring(0, { stiffness: 400, mass: 0.5 });
  const translateX = useMotionValue(0);
  const translateY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function handleMouseMove(event) {
    x.set(event.clientX - containerEl.current.getBoundingClientRect().left);
    y.set(event.clientY - containerEl.current.getBoundingClientRect().top);
  }

  function handleMouseLeave() {
    x.set(containerEl.current.getBoundingClientRect().width / 2);
    y.set(containerEl.current.getBoundingClientRect().height / 2);
  }

  useEffect(() => {
    function updateProps() {
      const currentEl = containerEl.current;
      if (translateRange) {
        translateX.set(
          transform(
            x.get(),
            [0, currentEl.getBoundingClientRect().width],
            translateRange,
          ),
        );
        translateY.set(
          transform(
            y.get(),
            [0, currentEl.getBoundingClientRect().height],
            translateRange,
          ),
        );
      }
      if (rotateXRange) {
        rotateX.set(
          transform(
            y.get(),
            [0, currentEl.getBoundingClientRect().height],
            rotateXRange,
          ),
        );
      }
      if (rotateYRange) {
        rotateY.set(
          transform(
            x.get(),
            [0, currentEl.getBoundingClientRect().width],
            rotateYRange,
          ),
        );
      }
    }

    const unsubscribeX = x.onChange(updateProps);
    const unsubscribeY = y.onChange(updateProps);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  });

  return (
    <div
      className={className}
      ref={containerEl}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children({
        translateX,
        translateY,
        rotateX,
        rotateY,
      })}
    </div>
  );
};

ParallaxContainer.propTypes = {
  translateRange: PropTypes.arrayOf(
    PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  ),
  rotateXRange: PropTypes.arrayOf(
    PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  ),
  rotateYRange: PropTypes.arrayOf(
    PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  ),
  className: PropTypes.string,
  children: PropTypes.func.isRequired,
};

ParallaxContainer.defaultProps = {
  translateRange: false,
  rotateXRange: false,
  rotateYRange: false,
  className: '',
};

export default ParallaxContainer;
