/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BLOCK_COLORS } from '../constants';

const breathShadow = keyframes`
    0% {
        box-shadow: none;
    }
    100% {
        box-shadow: 0px 0px 50px 5px ${props => props.$color + '80'};
    }
`;

const StyledBlock = styled.div`
  border: 1px solid ${props => props.$color};
  box-shadow: 0px 0px 50px 5px ${props => props.$color + '80'};
  animation: ${breathShadow} 1.5s infinite alternate-reverse;
  animation-delay: ${() => -2 * Math.random()}s;
  cursor: pointer;

  transition: 0.5s;
  &:hover {
    background: ${props => props.$color + '4d'};
  }
  &:active {
    animation: none;
    background-color: ${props => props.$color};
    box-shadow: 0px 0px 50px 7px ${props => props.$color};
    transition: 0s;
  }
  & > * {
    height: 100%;
  }
  .block__all-correct-style {
    transition: 0.5s;
    background: ${props => props.$color};
  }
  .block__incorrect-style {
    transition: 0.5s;
    background: #ff5353;
  }
`;

const Block = ({ blockId, handleClickBlock }) => {
  return (
    <StyledBlock
      $color={BLOCK_COLORS[blockId]}
      onClick={() => {
        handleClickBlock(blockId);
      }}
    >
      <div id={`block-${blockId}`} />
    </StyledBlock>
  );
};

export default React.memo(Block);
