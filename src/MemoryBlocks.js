/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Title from './components/Title';
import Level from './components/Level';
import Blocks from './components/Blocks';
import Progress from './components/Progress';
import Chance from './components/Chance';

import {
  MAX_CONTENT_WIDTH, PAGE_PADDING,
  correctStyleClassName, inCorrectStyleClassName
} from './constants';

const Background = styled.div`
  background: #000;
  display: flex;
  justify-content: center;
  overflow: auto;
  min-height: 100vh;
  color: white;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  max-width: ${MAX_CONTENT_WIDTH - (PAGE_PADDING * 2)}px;
  padding: ${PAGE_PADDING}px;
  padding-top: 40px;
  @media (max-width: 576px) {
    padding-top: 20px;
  }
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const generateQuestion = (level, blockNum) => {
  const num = level + 2;
  const question = new Array(num).fill(0).map(() => getRandomInt(blockNum));
  return question;
};


const answerVerify = (answer, question) => {
  let status = 'correct';
  answer.forEach((answerItem, index) => {
    if (answerItem !== question[index]) {
      status = 'inCorrect';
    }
    if (answerItem === question[index] && (question.length -1) === index) {
      status = 'allCorrect';
    }
  });
  return status;
};

const DEFAULT_LEVEL = 1;
const DEFAULT_ANSWER = [];
const DEFAULT_CHANCE = 3;
const blocksNumSet = [4, 9, 16, 25];
const levelGap = 4;

const MemoryBlocks = () => {
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [question, setQuestion] = useState(generateQuestion(DEFAULT_LEVEL, blocksNumSet[0]));
  const [answer, setAnswer] = useState(DEFAULT_ANSWER);
  const [isGameStart, setIsGameStart] = useState(false);
  const [chance, setChance] = useState(DEFAULT_CHANCE);
  const [isLoading, setIsLoading] = useState(false);
  const status = answerVerify(answer, question);
  console.log('question: ', question);

  const blockNumSetIndex = Math.min(Math.floor(level / levelGap), 3);
  const blockNum = blocksNumSet[blockNumSetIndex];

  const flashBlock = ({ blockId, isError = false, eclipseTime = 300 }) => {
    const targetBlock = document.getElementById(`block-${blockId}`);
    targetBlock.classList.add(isError ? inCorrectStyleClassName : correctStyleClassName);
    setTimeout(() => {
      targetBlock.classList.remove(isError ? inCorrectStyleClassName : correctStyleClassName);
    }, eclipseTime);
  };

  const playFlashBlock = (blockIds) => {
    blockIds.forEach((blockId, index) => {
      if (!isGameStart) {
        return;
      }
      setTimeout(() => {
        flashBlock({ blockId });
        if (index === blockIds.length - 1) {
          setIsLoading(false);
        }
      }, 700 * index);
    });
  };

  const handleClickBlock = useCallback((blockId) => {
    setAnswer((prev) => ([
      ...prev,
      blockId
    ]));
  }, []);

  const handleOnGameStart = () => {
    setIsGameStart(true);
  };

  const resetDefaultState = () => {
    setLevel(DEFAULT_LEVEL);
    setQuestion(generateQuestion(DEFAULT_LEVEL, blocksNumSet[0]));
    setAnswer(DEFAULT_ANSWER);
    setChance(DEFAULT_CHANCE);
    setIsLoading(false);
    setIsGameStart(false);
  };

  const playEffect = (status) => {
    setIsLoading(true);
    const allBlockIds = new Array(blockNum).fill(0).map((_, index) => index);
    if (status === 'allCorrect') {
      allBlockIds.forEach((blockId) => {
        flashBlock({ blockId, eclipseTime: 500 });
      });
    }
    if (status === 'inCorrect') {
      allBlockIds.forEach((blockId) => {
        flashBlock({ blockId, isError: true, eclipseTime: 500 });
      });
    }
  };

  useEffect(() => {
    if (isGameStart) {
      setIsLoading(true);
      setTimeout(() => {
        playEffect('allCorrect');
      }, 500);
      setTimeout(() => {
        playFlashBlock(question);
      }, 1500);
    }
  }, [question, isGameStart]);

  useEffect(() => {
    const newQuestion = generateQuestion(level, blockNum);
    setQuestion(newQuestion);
  }, [level]);

  useEffect(() => {
    if (status === 'inCorrect') {
      const updatedChance = chance - 1;
      setAnswer([]);
      setChance(Math.max(0, updatedChance));
      if (updatedChance > -1) {
        setIsLoading(true);
        setTimeout(() => {
          playEffect('inCorrect');
        }, 500);
        setTimeout(() => {
          playFlashBlock(question);
        }, 2000);
      }
      if (updatedChance < 0) {
        // game over
        resetDefaultState();
      }
      return;
    }
    if (status === 'allCorrect') {
      setAnswer([]);
      setChance((prev) => prev + 1);
      setLevel(prev => prev + 1);
    }
  }, [status]);

  return (
    <Background>
      <Container>
        <Title />
        <Level level={level} />
        <Blocks
          isGameStart={isGameStart}
          isLoading={isLoading}
          blockNum={blockNum}
          handleClickBlock={handleClickBlock}
          handleOnGameStart={handleOnGameStart}
        />
        <Progress
          answer={answer}
          question={question}
        />
        <Chance chance={chance} />
      </Container>
    </Background>
  );
};

export default MemoryBlocks;
