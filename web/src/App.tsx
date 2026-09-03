import React, { useState, useEffect } from 'react';
import Header, { TabType } from './components/Header';
import FlowerDictionary from './components/FlowerDictionary';
import AnniversaryMatcher from './components/AnniversaryMatcher';
import FlowerMapNavigation from './components/FlowerMapNavigation';
import FlowerCommunity from './components/FlowerCommunity';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 2.5rem 1rem;
  margin-top: 4rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.9rem;
  background: var(--card-bg);
  backdrop-filter: var(--glass-blur);

  p {
    margin-bottom: 0.4rem;
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dictionary');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContainer>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <MainContent>
        {activeTab === 'dictionary' && <FlowerDictionary />}
        {activeTab === 'match' && <AnniversaryMatcher onSelectStoreTab={() => setActiveTab('map')} />}
        {activeTab === 'map' && <FlowerMapNavigation />}
        {activeTab === 'community' && <FlowerCommunity />}
      </MainContent>

      <Footer>
        <p>🌸 BloomSync &copy; 2026. Special Flower Matching & Live Location Platform.</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
          꽃말 사전 | 기념일 꽃 매치 | 카카오/네이버/구글 지도 위치 정보 | 스마트 앱 패키징 지원
        </p>
      </Footer>
    </AppContainer>
  );
}

export default App;
