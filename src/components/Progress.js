/* eslint-disable react/prop-types */
import React from 'react';
import styled, { css } from 'styled-components';

const ProgressContainer = styled.div`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

const activeNote = css`
  opacity: 1;
  box-shadow: white 0px 0px 15px 2px;
`;

const ProgressNode = styled.div`
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 100%;
  opacity: 0.3;
  ${props => props.$isActive && activeNote}
`;

const Progress = ({
  answer, question
}) => {
  const answerNum= question.toString().indexOf(answer.toString()) > -1 ? answer.length : 0;
  return (
    <ProgressContainer>
      {
        (question.map((_, index) => index)).map((progressIndex) => (
          <ProgressNode key={progressIndex} $isActive={progressIndex < answerNum} />
        ))
      }
    </ProgressContainer>
  );
};

export default Progress;
