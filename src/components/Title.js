import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  white-space: pre-line;
  text-align: right;
  font-size: 32px;
  font-weight: 900;
`;

const Title = () => {
  return (
    <Container>
      {`Memory\nBlocks`}
    </Container>
  );
};

export default Title;
