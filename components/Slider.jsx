import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Images = styled.div`
  position: relative;
  width: 37.5rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &.right-enter {
      position: absolute;
      left: 37.5rem;
    }

    &.right-enter-active {
      left: 0;
      transition: left 300ms ease-out;
    }

    &.right-exit {
      position: absolute;
      left: 0;
    }

    &.right-exit-active {
      left: -37.5rem;
      transition: left 300ms ease-out;
    }

    &.left-enter {
      position: absolute;
      left: -37.5rem;
    }

    &.left-enter-active {
      left: 0;
      transition: left 300ms ease-out;
    }

    &.left-exit {
      position: absolute;
      left: 0;
    }

    &.left-exit-active {
      left: 37.5rem;
      transition: left 300ms ease-out;
    }
  }
`;

const SwitchImageButton = styled.button`
  position: absolute;
  top: calc(50% - 1rem);
  width: 2rem;
  height: 2rem;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.0625rem solid #dbdbdb;
  border-radius: 2rem;
  background-color: rgba(245, 245, 245, 0.8);
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 800;

  ${({ left }) => (left ? 'left: 1rem' : '')};
  ${({ right }) => (right ? 'right: 1rem' : '')};
`;

export const Slider = ({ images, className }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [movementDirection, setMovementDirection] = useState(null);

  const nextImage = useCallback(() => {
    setMovementDirection('right');
    setTimeout(() => setCurrentImage((current) => current + 1));
  }, [setMovementDirection, setCurrentImage]);

  const previousImage = useCallback(() => {
    setMovementDirection('left');
    setTimeout(() => setCurrentImage((current) => current - 1));
  }, [setMovementDirection, setCurrentImage]);

  return (
    <Images className={className}>
      {currentImage > 0 ? (
        <SwitchImageButton
          onClick={previousImage}
          left
        >
          &lt;
        </SwitchImageButton>
      ) : null}
      {images != null ? (
        <TransitionGroup
          component={null}
        >
          <CSSTransition
            key={currentImage}
            classNames={movementDirection}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            <img
              src={images[currentImage].file}
              alt={images[currentImage].description}
            />
          </CSSTransition>
        </TransitionGroup>
      ) : null}
      {images != null && currentImage < images.length - 1 ? (
        <SwitchImageButton
          onClick={nextImage}
          right
        >
          &gt;
        </SwitchImageButton>
      ) : null}
    </Images>
  );
};

Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    file: PropTypes.string,
    description: PropTypes.string,
  })),
  className: PropTypes.string,
};

Slider.defaultProps = {
  images: null,
  className: null,
};
