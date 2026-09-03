import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { AnniversaryMatchResult } from '../../../common/types';

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.4); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 15px rgba(236, 72, 153, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
`;

const Container = styled.div`
  max-width: 1150px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const HeroBox = styled.div`
  text-align: center;
  padding: 3.5rem 2rem;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
  border-radius: 28px;
  border: 1px solid var(--border-color);
  margin-bottom: 2.5rem;
  box-shadow: var(--shadow-soft);
`;

const Badge = styled.span`
  background: var(--brand-gradient);
  color: #fff;
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  display: inline-block;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
`;

const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.08rem;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
`;

const MatchForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  padding: 2.2rem;
  border-radius: 28px;
  margin-bottom: 2.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-size: 1.08rem;
  font-weight: 800;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
  gap: 0.8rem;
`;

const OptionCard = styled.button<{ $selected: boolean }>`
  padding: 0.9rem 1.1rem;
  border-radius: 18px;
  border: 2px solid ${props => (props.$selected ? '#ec4899' : 'var(--border-color)')};
  background: ${props => (props.$selected ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)' : 'var(--card-bg)')};
  color: ${props => (props.$selected ? '#ec4899' : 'var(--text-primary)')};
  font-weight: ${props => (props.$selected ? '800' : '600')};
  font-size: 0.98rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &:hover {
    border-color: #ec4899;
    transform: translateY(-2px);
    background: rgba(236, 72, 153, 0.12);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  border-radius: 999px;
  background: var(--brand-gradient);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(236, 72, 153, 0.4);
  transition: all 0.3s ease;
  animation: ${pulse} 3s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(236, 72, 153, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    animation: none;
  }
`;

const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const ResultCard = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  border-radius: 28px;
  overflow: hidden;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const ResultImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RibbonBadge = styled.div`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  background: linear-gradient(135deg, #ec4899 0%, #ef4444 100%);
  color: #fff;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 800;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
`;

const MatchScoreTag = styled.div`
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  color: #38bdf8;
  padding: 0.55rem 1.1rem;
  border-radius: 14px;
  border: 1px solid rgba(56, 189, 248, 0.4);
  font-size: 1.15rem;
  font-weight: 800;
`;

const ResultBody = styled.div`
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FlowerHeader = styled.div`
  margin-bottom: 1rem;
`;

const FlowerTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
  color: var(--text-primary);
`;

const FlowerMeaningHighlight = styled.div`
  color: #ec4899;
  font-size: 1.15rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const DetailSection = styled.div`
  margin: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const DetailBox = styled.div`
  background: rgba(168, 85, 247, 0.08);
  border-left: 4px solid #a855f7;
  padding: 1rem 1.2rem;
  border-radius: 0 14px 14px 0;

  h4 {
    font-size: 0.85rem;
    color: #a855f7;
    font-weight: 800;
    margin-bottom: 0.3rem;
    text-transform: uppercase;
  }
  p {
    font-size: 0.98rem;
    color: var(--text-primary);
    line-height: 1.55;
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1.4rem;
  flex-wrap: wrap;
`;

const LocateStoreButton = styled.button`
  flex: 1;
  min-width: 200px;
  padding: 0.9rem 1.4rem;
  background: var(--brand-gradient);
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.95;
    transform: translateY(-2px);
  }
`;

interface Props {
  onSelectStoreTab?: () => void;
}

const occasions = ['100일 기념일', '프로포즈', '생일', '어버이날', '졸업식/입학식', '첫만남', '화이트데이'];
const recipients = ['연인', '부모님', '친구', '나 자신'];
const colorOptions = ['상관없음', '레드', '핑크', '옐로우', '퍼플', '화이트'];

const AnniversaryMatcher: React.FC<Props> = ({ onSelectStoreTab }) => {
  const [selectedOccasion, setSelectedOccasion] = useState('100일 기념일');
  const [selectedRecipient, setSelectedRecipient] = useState('연인');
  const [selectedColor, setSelectedColor] = useState('상관없음');

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnniversaryMatchResult[] | null>(null);

  const handleMatch = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/recommendations/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion: selectedOccasion,
          recipient: selectedRecipient,
          preferredColor: selectedColor
        })
      });
      const json = await res.json();
      if (json.success) {
        setResults(json.data);
      }
    } catch (e) {
      console.error('Match failed:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="animate-fade-in">
      <HeroBox>
        <Badge>AI ANNIVERSARY MATCHING ENGINE</Badge>
        <MainTitle>💖 기념일에 잘 어울리는 꽃 매치</MainTitle>
        <Description>
          소중한 분과의 특별한 순간을 더 찬란하게 빛내줄 최고의 꽃과 꽃말을 매칭해 드립니다.
          기념일과 대상을 선택해 보세요.
        </Description>
      </HeroBox>

      <MatchForm className="glass-panel">
        <FormGroup>
          <Label>🎉 어떤 기념일 또는 상황인가요?</Label>
          <OptionGrid>
            {occasions.map(occ => (
              <OptionCard
                key={occ}
                $selected={selectedOccasion === occ}
                onClick={() => setSelectedOccasion(occ)}
              >
                <span>✨</span> {occ}
              </OptionCard>
            ))}
          </OptionGrid>
        </FormGroup>

        <FormGroup>
          <Label>🎁 누구에게 선물하시나요?</Label>
          <OptionGrid>
            {recipients.map(rec => (
              <OptionCard
                key={rec}
                $selected={selectedRecipient === rec}
                onClick={() => setSelectedRecipient(rec)}
              >
                <span>💌</span> {rec}
              </OptionCard>
            ))}
          </OptionGrid>
        </FormGroup>

        <FormGroup>
          <Label>🎨 선호하는 꽃 색상이 있으신가요?</Label>
          <OptionGrid>
            {colorOptions.map(clr => (
              <OptionCard
                key={clr}
                $selected={selectedColor === clr}
                onClick={() => setSelectedColor(clr)}
              >
                <span>🌷</span> {clr}
              </OptionCard>
            ))}
          </OptionGrid>
        </FormGroup>

        <SubmitButton onClick={handleMatch} disabled={loading}>
          {loading ? '🔮 최적의 꽃말과 매칭 분석 중...' : '💐 최고의 꽃 매치 결과 보기'}
        </SubmitButton>
      </MatchForm>

      {results && (
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
            🌟 '{selectedOccasion}' 맞춤 매칭 추천 (TOP {results.length})
          </h2>

          <ResultsGrid>
            {results.map((resItem, idx) => (
              <ResultCard key={idx} className="glass-card">
                <ResultImageWrapper>
                  <img src={resItem.flower.imageUrl} alt={resItem.flower.name} />
                  <RibbonBadge>{resItem.recommendedTag}</RibbonBadge>
                  <MatchScoreTag>매칭률 {resItem.matchScore}%</MatchScoreTag>
                </ResultImageWrapper>

                <ResultBody>
                  <div>
                    <FlowerHeader>
                      <FlowerTitle>{resItem.flower.name}</FlowerTitle>
                      <FlowerMeaningHighlight>
                        <span>💌 꽃말:</span> "{resItem.flower.languageOfFlowers}"
                      </FlowerMeaningHighlight>
                    </FlowerHeader>

                    <DetailSection>
                      <DetailBox>
                        <h4>🎯 이 기념일에 어울리는 이유</h4>
                        <p>{resItem.matchReason}</p>
                      </DetailBox>

                      <DetailBox style={{ borderColor: '#ec4899', background: 'rgba(236, 72, 153, 0.08)' }}>
                        <h4 style={{ color: '#ec4899' }}>🎁 감성 포장 & 스타일링 팁</h4>
                        <p>{resItem.packagingTip}</p>
                      </DetailBox>
                    </DetailSection>
                  </div>

                  <ActionButtonGroup>
                    <LocateStoreButton onClick={onSelectStoreTab}>
                      <span>📍</span> 이 꽃 판매하는 근처 꽃집 위치 찾기
                    </LocateStoreButton>
                  </ActionButtonGroup>
                </ResultBody>
              </ResultCard>
            ))}
          </ResultsGrid>
        </div>
      )}
    </Container>
  );
};

export default AnniversaryMatcher;
