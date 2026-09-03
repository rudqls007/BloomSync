import React from 'react';
import styled from 'styled-components';

export type TabType = 'dictionary' | 'match' | 'map' | 'community';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--card-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  letter-spacing: -0.5px;

  span.icon {
    font-size: 1.8rem;
    -webkit-text-fill-color: initial;
  }
`;

const AppBadge = styled.span`
  background: rgba(236, 72, 153, 0.15);
  color: #ec4899;
  border: 1px solid rgba(236, 72, 153, 0.4);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
`;

const NavList = styled.nav`
  display: flex;
  gap: 0.4rem;
  background: rgba(148, 163, 184, 0.1);
  padding: 0.3rem;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
  justify-content: center;
`;

const NavItem = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : 'var(--text-secondary)'};
  border: none;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    color: ${props => props.$active ? '#ffffff' : 'var(--text-primary)'};
    background: ${props => props.$active ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'rgba(236, 72, 153, 0.1)'};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThemeToggleButton = styled.button`
  background: rgba(148, 163, 184, 0.15);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(15deg) scale(1.08);
    background: rgba(236, 72, 153, 0.2);
  }
`;

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, theme, toggleTheme }) => {
  return (
    <HeaderContainer className="animate-fade-in">
      <LogoSection>
        <Logo onClick={() => setActiveTab('dictionary')}>
          <span className="icon animate-float">🌸</span> BloomSync
        </Logo>
        <AppBadge>MOBILE HYBRID APP</AppBadge>
      </LogoSection>

      <NavList>
        <NavItem $active={activeTab === 'dictionary'} onClick={() => setActiveTab('dictionary')}>
          <span>🌸</span> 꽃말 백과사전
        </NavItem>
        <NavItem $active={activeTab === 'match'} onClick={() => setActiveTab('match')}>
          <span>💖</span> 기념일 꽃 매치
        </NavItem>
        <NavItem $active={activeTab === 'map'} onClick={() => setActiveTab('map')}>
          <span>📍</span> 지도 & 위치 서비스
        </NavItem>
        <NavItem $active={activeTab === 'community'} onClick={() => setActiveTab('community')}>
          <span>💬</span> 커뮤니티
        </NavItem>
      </NavList>

      <RightSection>
        <ThemeToggleButton onClick={toggleTheme} title="테마 변경">
          {theme === 'dark' ? '☀️' : '🌙'}
        </ThemeToggleButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
