import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const flameMovement = keyframes`
  50% {
    transform: scale(0.98,1.0) translate(0, 2px) rotate(-1deg);
  }
`;

const flameDisappear = keyframes`
  0%{
    transform: translate(0) rotate(180deg);
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-10px, -40px) rotate(180deg);
    opacity: 0;
  }
`;

export const FireWrapper = styled.div`
  height: auto;
  left: 50%;
  position: absolute;
  bottom: -50px;
  transform: translateX(-50%);
  z-index: 4;

  .mo-fire svg {
    width: 100%;
    height: auto;
    position: relative;
    right: 40px;
  }

  .flame {
    animation-name: ${flameDisappear};
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    opacity: 0.5;
    transform-origin: 45% 45% 0;
  }
  .flame.one {
    animation-delay: 1s;
    animation-duration: 3s;
  }
  .flame.two {
    animation-duration: 5s;
    animation-delay: 1s;
  }

  .flame-main {
    animation-name: ${flameMovement};
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  .flame-main.one {
    animation-duration: 2.2s;
    animation-delay: 1s;
  }
  .flame-main.two {
    animation-duration: 2s;
    animation-delay: 1s;
  }
  .flame-main.three {
    animation-duration: 2.1s;
    animation-delay: 3s;
  }
  .flame-main.four {
    animation-duration: 3.2s;
    animation-delay: 4s;
  }
  .flame-main.five {
    animation-duration: 2.5s;
    animation-delay: 5s;
  }
`;
