import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #333;
  font-family: 'Roboto', sans-serif;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #4a5568;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #718096;
`;

const Button = styled.button`
  background: #48bb78;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #38a169;
  }
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <Title>🌸 BloomSync</Title>
        <Subtitle>특별한 순간을 위한 완벽한 꽃 추천 서비스</Subtitle>
        <Button onClick={() => alert('추천 기능으로 이동!')}>꽃 추천 받기</Button>
      </HeroSection>
    </HomeContainer>
  );
};

export default Home;