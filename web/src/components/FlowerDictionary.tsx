import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flower } from '../../../common/types';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const HeroBanner = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-radius: 24px;
  border: 1px solid var(--border-color);
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 1.8rem;
`;

const SearchFilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
`;

const SearchInputContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.9rem 1.2rem 0.9rem 3rem;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
  box-shadow: var(--shadow-soft);
  transition: all 0.3s ease;

  &:focus {
    border-color: #ec4899;
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.25);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const FilterChip = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid ${props => props.$active ? '#ec4899' : 'var(--border-color)'};
  background: ${props => props.$active ? '#ec4899' : 'var(--card-bg)'};
  color: ${props => props.$active ? '#ffffff' : 'var(--text-secondary)'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ec4899;
    color: ${props => props.$active ? '#ffffff' : 'var(--text-primary)'};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.8rem;
`;

const Card = styled.div`
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.08);
  }
`;

const Badge = styled.span<{ $color?: string }>`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  color: #fff;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const CardContent = styled.div`
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FlowerName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
`;

const FlowerMeaning = styled.div`
  color: #ec4899;
  font-size: 0.92rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const OccasionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
`;

const Tag = styled.span`
  background: rgba(139, 92, 246, 0.12);
  color: #8b5cf6;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
`;

// Modal Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 24px;
  padding: 2rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: rgba(148, 163, 184, 0.2);
  border: none;
  color: var(--text-primary);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(236, 72, 153, 0.3);
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 1.5rem;
`;

const MeaningBox = styled.div`
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(244, 63, 94, 0.15) 100%);
  border-left: 4px solid #ec4899;
  padding: 1rem 1.2rem;
  border-radius: 0 12px 12px 0;
  margin: 1rem 0 1.5rem;

  h4 {
    font-size: 0.85rem;
    text-transform: uppercase;
    color: #ec4899;
    letter-spacing: 0.5px;
    margin-bottom: 0.3rem;
  }
  p {
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

const SectionTitle = styled.h4`
  font-size: 1.05rem;
  font-weight: 700;
  margin: 1.2rem 0 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  li {
    position: relative;
    padding-left: 1.2rem;
    margin-bottom: 0.4rem;
    color: var(--text-secondary);
    font-size: 0.95rem;

    &::before {
      content: '✨';
      position: absolute;
      left: 0;
      font-size: 0.8rem;
    }
  }
`;

const FlowerDictionary: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('전체');
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
  const [loading, setLoading] = useState(true);

  const seasons = ['전체', '봄', '여름', '사계절'];

  useEffect(() => {
    fetchFlowers();
  }, [searchTerm, selectedSeason]);

  const fetchFlowers = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/api/flowers?search=${encodeURIComponent(searchTerm)}`;
      if (selectedSeason !== '전체') {
        url += `&season=${encodeURIComponent(selectedSeason)}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setFlowers(json.data);
      }
    } catch (e) {
      console.error('Failed to fetch flowers:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="animate-fade-in">
      <HeroBanner>
        <Title>🌸 꽃 정보 & 꽃말 백과사전</Title>
        <Subtitle>
          상황과 마음에 맞는 완벽한 꽃을 찾아보세요. 꽃에 담긴 진심 어린 이야기와 선물하기 좋은 날을 안내해 드립니다.
        </Subtitle>

        <SearchFilterSection>
          <SearchInputContainer>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="꽃 이름, 꽃말, 프로포즈, 어버이날 검색..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </SearchInputContainer>

          <FilterRow>
            {seasons.map(season => (
              <FilterChip
                key={season}
                $active={selectedSeason === season}
                onClick={() => setSelectedSeason(season)}
              >
                {season === '전체' ? '🌿 전체 계절' : `${season} 🌸`}
              </FilterChip>
            ))}
          </FilterRow>
        </SearchFilterSection>
      </HeroBanner>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          🌸 아름다운 꽃 데이터를 불러오는 중입니다...
        </div>
      ) : (
        <Grid>
          {flowers.map(flower => (
            <Card key={flower.id} className="glass-card" onClick={() => setSelectedFlower(flower)}>
              <CardImageWrapper>
                <img src={flower.imageUrl} alt={flower.name} />
                <Badge>{flower.season}</Badge>
              </CardImageWrapper>
              <CardContent>
                <FlowerName>{flower.name}</FlowerName>
                <FlowerMeaning>
                  <span>💌</span> {flower.languageOfFlowers}
                </FlowerMeaning>
                <Description>{flower.description}</Description>

                <OccasionTags>
                  {flower.recommendedOccasions.map((occ, idx) => (
                    <Tag key={idx}>🎁 {occ}</Tag>
                  ))}
                </OccasionTags>
              </CardContent>
            </Card>
          ))}
        </Grid>
      )}

      {/* Detail Modal */}
      {selectedFlower && (
        <ModalOverlay onClick={() => setSelectedFlower(null)}>
          <ModalContent className="glass-panel animate-fade-in" onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedFlower(null)}>✕</CloseButton>
            <ModalImage src={selectedFlower.imageUrl} alt={selectedFlower.name} />

            <h2>{selectedFlower.name}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>{selectedFlower.description}</p>

            <MeaningBox>
              <h4>LANGUAGE OF FLOWERS (꽃말)</h4>
              <p>"{selectedFlower.languageOfFlowers}"</p>
            </MeaningBox>

            <SectionTitle>💡 대표적인 특징</SectionTitle>
            <FeatureList>
              {selectedFlower.characteristics.map((char, idx) => (
                <li key={idx}>{char}</li>
              ))}
            </FeatureList>

            <SectionTitle>🎉 이럴 때 선물하면 좋아요!</SectionTitle>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {selectedFlower.recommendedOccasions.map((occ, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                    color: '#fff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  🎁 {occ}
                </span>
              ))}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default FlowerDictionary;
