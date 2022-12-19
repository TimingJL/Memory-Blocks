/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import heartImg from '../assets/heart.png';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ChanceWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
  padding: 4px 12px;
  border: 2px solid #fff;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

const Chance = ({ chance }) => {
  return (
    <Container>
      <ChanceWrapper>
        <Image src={heartImg} alt="heart" />
        {`x ${chance}`}
      </ChanceWrapper>
    </Container>
  );
};

export default Chance;
