/* eslint-disable react/prop-types */
import React from 'react';
import styled, { css } from 'styled-components';
import { PAGE_PADDING, MAX_CONTENT_WIDTH } from '../constants';
import Block from './Block';

const blockSize = css`
  width: calc(100vw - ${PAGE_PADDING * 2}px);
  height: calc(100vw - ${PAGE_PADDING * 2}px);
  max-width: ${MAX_CONTENT_WIDTH - (PAGE_PADDING * 2)}px;
  max-height: ${MAX_CONTENT_WIDTH - (PAGE_PADDING * 2)}px;
`;

const Mask = styled.div`
  ${blockSize}
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StartButton = styled.button`
  border: 2px solid #fff;
  background: #0000009d;
  color: #fff;
  border-radius: 50px;
  padding: 8px 20px;
  width: 150px;
  height: 60px;
  font-size: 32px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #161616;
    background: #FFF;
    transition: all 0.2s ease-in-out;
  }
`;

const Container = styled.div`
  position: relative;
`;

const GridContainer = styled.div`
  ${blockSize}
  display: grid;
  grid-template-columns: repeat(${props => props.$sideNum}, 1fr);
  grid-template-rows: repeat(${props => props.$sideNum}, 1fr);
  grid-gap: ${props => 40 / props.$sideNum}px;
`;


const Blocks = ({ isGameStart, isLoading, blockNum, handleClickBlock, handleOnGameStart }) => {
  const blocks = new Array(blockNum).fill(0).map((_, index) => index);
  const sideNum = Math.sqrt(blockNum);
  return (
    <Container>
      <GridContainer
        $sideNum={sideNum}
      >
        {
          blocks.map((blockId) => {
            return (
              <Block
                key={blockId}
                blockId={blockId}
                handleClickBlock={handleClickBlock}
              />
            );
          })
        }
      </GridContainer>
      {(!isGameStart || isLoading) && (
        <Mask>
          {!isLoading && <StartButton type="button" onClick={handleOnGameStart}>Start</StartButton>}
        </Mask>
      )}
    </Container>
  );
};

export default Blocks;
