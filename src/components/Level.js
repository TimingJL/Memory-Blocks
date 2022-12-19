/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  white-space: pre-line;
  font-size: 20px;
  font-weight: 900;
  color: #ff5353;
`;

const Level = ({ level }) => {
  return (
    <Container>{`Level: ${level}`}</Container>
  );
};

export default Level;
