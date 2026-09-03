import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Store } from '../../../common/types';

// Leaflet CDN CSS 동적 로드
const ensureLeafletCss = () => {
  if (!document.getElementById('leaflet-css')) {
    const link = document.createElement('link');
    link.id = 'leaflet-css';
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }
};

const Container = styled.div`
  max-width: 1280px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

const Title = styled.h2`
  font-size: 2.1rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const ProviderSelectorGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--card-bg);
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--border-color);
`;

const ProviderChip = styled.button<{ $active: boolean }>`
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: none;
  background: ${props => (props.$active ? 'var(--brand-gradient)' : 'transparent')};
  color: ${props => (props.$active ? '#ffffff' : 'var(--text-secondary)')};
  font-weight: ${props => (props.$active ? '800' : '600')};
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    color: ${props => (props.$active ? '#ffffff' : 'var(--text-primary)')};
  }
`;

const RefreshButton = styled.button`
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.65rem 1.2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ec4899;
    color: #ec4899;
    transform: translateY(-1px);
  }
`;

const LocationNoticeBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(168, 85, 247, 0.12) 100%);
  border: 1px solid rgba(236, 72, 153, 0.3);
  padding: 0.9rem 1.4rem;
  border-radius: 18px;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 700;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const RegionFilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const RegionChip = styled.button<{ $active: boolean }>`
  padding: 0.4rem 0.9rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid ${props => (props.$active ? '#ec4899' : 'var(--border-color)')};
  background: ${props => (props.$active ? '#ec4899' : 'var(--card-bg)')};
  color: ${props => (props.$active ? '#ffffff' : 'var(--text-secondary)')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ec4899;
    color: ${props => (props.$active ? '#ffffff' : 'var(--text-primary)')};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.1rem;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-primary);
  font-size: 0.95rem;
  outline: none;
  margin-bottom: 1rem;

  &:focus {
    border-color: #ec4899;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 1.8rem;
  height: 680px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-right: 0.5rem;
  max-height: 680px;
`;

const StoreCard = styled.div<{ $selected: boolean }>`
  padding: 1.4rem;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 1rem;
  border: 2px solid ${props => (props.$selected ? '#ec4899' : 'transparent')};
  box-shadow: ${props => (props.$selected ? '0 0 25px rgba(236, 72, 153, 0.35)' : 'var(--shadow-soft)')};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.4rem;
`;

const StoreName = styled.h3`
  font-size: 1.18rem;
  font-weight: 800;
  color: var(--text-primary);
`;

const RatingBadge = styled.span`
  color: #f59e0b;
  font-size: 0.9rem;
  font-weight: 800;
  background: rgba(245, 158, 11, 0.15);
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
`;

const StoreAddress = styled.p`
  color: var(--text-secondary);
  font-size: 0.88rem;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const DistanceBadge = styled.span`
  color: #ec4899;
  font-weight: 800;
  font-size: 0.88rem;
`;

const CategoryTags = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const CatTag = styled.span`
  background: rgba(236, 72, 153, 0.12);
  color: #ec4899;
  font-size: 0.78rem;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  font-weight: 700;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PhoneButton = styled.a`
  padding: 0.75rem 1rem;
  background: rgba(168, 85, 247, 0.15);
  color: #a855f7;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.88rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(168, 85, 247, 0.25);
  }
`;

const NavButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: var(--brand-gradient);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.92rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const MapContainerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-soft);
`;

const MapProviderNotice = styled.div`
  position: absolute;
  bottom: 1.2rem;
  left: 1.2rem;
  z-index: 10;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(10px);
  color: #f8fafc;
  padding: 0.45rem 1rem;
  border-radius: 10px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const NavigationHUD = styled.div`
  position: absolute;
  top: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(14px);
  color: #fff;
  padding: 1.1rem 2rem;
  border-radius: 999px;
  border: 1px solid rgba(236, 72, 153, 0.6);
  display: flex;
  align-items: center;
  gap: 1.6rem;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
  width: max-content;
  max-width: 92%;
`;

const HUDText = styled.div`
  display: flex;
  flex-direction: column;
  div.title {
    font-size: 0.82rem;
    color: #ec4899;
    font-weight: 800;
  }
  div.guide {
    font-size: 1.1rem;
    font-weight: 800;
  }
`;

const StopNavButton = styled.button`
  background: rgba(244, 63, 94, 0.3);
  border: 1px solid #f43f5e;
  color: #f43f5e;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f43f5e;
    color: #fff;
  }
`;

interface Waypoint {
  lat: number;
  lng: number;
  stepText: string;
}

type MapProvider = 'kakao' | 'naver' | 'google' | 'leaflet';

const FlowerMapNavigation: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<MapProvider>('kakao');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('여의도');

  // 기본 고정 좌표: 서울 영등포구 여의도역 (37.5219, 126.9243)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 37.5219,
    lng: 126.9243
  });
  const [locationName, setLocationName] = useState('서울 영등포구 여의도동 (여의도역 인근)');
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [routeWaypoints, setRouteWaypoints] = useState<Waypoint[]>([]);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapInstance = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const animIntervalRef = useRef<any>(null);

  useEffect(() => {
    ensureLeafletCss();
    getUserLocation();
  }, []);

  useEffect(() => {
    fetchStores();
  }, [userLocation, searchQuery, selectedRegion]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setUserLocation({ lat, lng });

          // 여의도 인근인지 여부 확인 후 이름 표기
          if (Math.abs(lat - 37.5219) < 0.05 && Math.abs(lng - 126.9243) < 0.05) {
            setLocationName('서울 영등포구 여의도동 (GPS 감지 성공)');
          } else {
            setLocationName(`현재 GPS 위치 (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
          }
        },
        err => {
          console.log('Geolocation fallback: 기본 여의도역 좌표 적용');
          setUserLocation({ lat: 37.5219, lng: 126.9243 });
          setLocationName('서울 영등포구 여의도동 (여의도역 부근)');
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
  };

  const fetchStores = async () => {
    try {
      let query = searchQuery;
      if (!query && selectedRegion !== '전체') query = selectedRegion;

      let url = `http://localhost:5000/api/stores?lat=${userLocation.lat}&lng=${userLocation.lng}`;
      if (query) url += `&search=${encodeURIComponent(query)}`;

      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setStores(json.data);
        if (json.data.length > 0) setSelectedStore(json.data[0]);
      }
    } catch (e) {
      console.error('Failed to fetch stores:', e);
    }
  };

  // Render Leaflet Map
  useEffect(() => {
    if (!mapRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (!leafletMapInstance.current) {
      const map = L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap | BloomSync 위치 서비스'
      }).addTo(map);

      leafletMapInstance.current = map;
    }

    const map = leafletMapInstance.current;
    map.setView([userLocation.lat, userLocation.lng], 14);

    // Clear existing markers
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Add User Marker (Yeouido Pulse Radar Icon)
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `<div style="background:#ec4899; width:26px; height:26px; border-radius:50%; border:3px solid #fff; box-shadow:0 0 20px rgba(236,72,153,1); animation: pulseGlow 2s infinite;"></div>`,
      iconSize: [26, 26]
    });
    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup(`<b>내 위치</b><br/>${locationName}`);

    // Add Store Markers
    stores.forEach(store => {
      const isSelected = selectedStore?.id === store.id;
      const storeIcon = L.divIcon({
        className: 'custom-store-marker',
        html: `<div style="background:${isSelected ? '#a855f7' : '#ec4899'}; color:white; padding:7px 14px; border-radius:999px; font-weight:800; font-size:12px; white-space:nowrap; border:2px solid #fff; box-shadow:0 6px 16px rgba(0,0,0,0.35);">🌸 ${store.name}</div>`,
        iconSize: [120, 32]
      });

      const marker = L.marker([store.latitude, store.longitude], { icon: storeIcon }).addTo(map);
      marker.on('click', () => {
        setSelectedStore(store);
      });
    });
  }, [userLocation, stores, selectedStore, selectedProvider]);

  // Start Navigation
  const startNavigation = async (store: Store) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/stores/${store.id}/route?userLat=${userLocation.lat}&userLng=${userLocation.lng}`
      );
      const json = await res.json();
      if (!json.success) return;

      const waypoints: Waypoint[] = json.route;
      setRouteWaypoints(waypoints);
      setIsNavigating(true);
      setCurrentStepIndex(0);

      const L = (window as any).L;
      const map = leafletMapInstance.current;

      if (polylineRef.current) map.removeLayer(polylineRef.current);

      const latLngs = waypoints.map(w => [w.lat, w.lng]);
      polylineRef.current = L.polyline(latLngs, {
        color: '#ec4899',
        weight: 7,
        dashArray: '10, 14',
        lineCap: 'round'
      }).addTo(map);

      map.fitBounds(polylineRef.current.getBounds(), { padding: [60, 60] });

      let step = 0;
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);

      animIntervalRef.current = setInterval(() => {
        step++;
        if (step < waypoints.length) {
          setCurrentStepIndex(step);
          const currentWp = waypoints[step];
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([currentWp.lat, currentWp.lng]);
          }
        } else {
          clearInterval(animIntervalRef.current);
          alert(`🎉 ${store.name}에 도착했습니다!`);
          stopNavigation();
        }
      }, 1200);
    } catch (e) {
      console.error('Navigation route error:', e);
    }
  };

  const stopNavigation = () => {
    if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    setIsNavigating(false);
    if (polylineRef.current && leafletMapInstance.current) {
      leafletMapInstance.current.removeLayer(polylineRef.current);
    }
  };

  const getProviderName = () => {
    switch (selectedProvider) {
      case 'kakao': return '카카오 지도 (Kakao Maps Web SDK)';
      case 'naver': return '네이버 지도 (Naver Maps Web SDK)';
      case 'google': return '구글 지도 (Google Maps API)';
      case 'leaflet': return '자유 지도 (OpenStreetMap Engine)';
    }
  };

  return (
    <Container className="animate-fade-in">
      <HeaderBox>
        <Title>📍 스마트 지도 & 내 주변 꽃집 검색</Title>

        <ControlBar>
          <ProviderSelectorGroup>
            <ProviderChip $active={selectedProvider === 'kakao'} onClick={() => setSelectedProvider('kakao')}>
              카카오 지도
            </ProviderChip>
            <ProviderChip $active={selectedProvider === 'naver'} onClick={() => setSelectedProvider('naver')}>
              네이버 지도
            </ProviderChip>
            <ProviderChip $active={selectedProvider === 'google'} onClick={() => setSelectedProvider('google')}>
              구글 지도
            </ProviderChip>
          </ProviderSelectorGroup>

          <RefreshButton onClick={() => { getUserLocation(); fetchStores(); }}>
            <span>🔄</span> 위치 갱신 (여의도)
          </RefreshButton>
        </ControlBar>
      </HeaderBox>

      <LocationNoticeBanner>
        <div>
          <span style={{ color: '#ec4899', marginRight: '0.4rem' }}>📍</span>
          <span>내 위치: <strong>{locationName}</strong></span>
        </div>
        <div style={{ opacity: 0.8, fontSize: '0.85rem' }}>
          * 주변 꽃집까지의 직선 거리가 정밀 계산됩니다.
        </div>
      </LocationNoticeBanner>

      <Layout>
        {/* Sidebar */}
        <Sidebar>
          <SearchInput
            type="text"
            placeholder="여의도, 강남, 홍대, 꽃집 이름 검색..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />

          <RegionFilterGroup>
            <RegionChip $active={selectedRegion === '여의도'} onClick={() => { setSelectedRegion('여의도'); setSearchQuery(''); }}>
              📍 여의도
            </RegionChip>
            <RegionChip $active={selectedRegion === '강남'} onClick={() => { setSelectedRegion('강남'); setSearchQuery(''); }}>
              🏙️ 강남/서초
            </RegionChip>
            <RegionChip $active={selectedRegion === '홍대'} onClick={() => { setSelectedRegion('홍대'); setSearchQuery(''); }}>
              🎨 홍대/마포
            </RegionChip>
            <RegionChip $active={selectedRegion === '전체'} onClick={() => { setSelectedRegion('전체'); setSearchQuery(''); }}>
              🌿 전체 지역
            </RegionChip>
          </RegionFilterGroup>

          {stores.map(store => (
            <StoreCard
              key={store.id}
              className="glass-card"
              $selected={selectedStore?.id === store.id}
              onClick={() => setSelectedStore(store)}
            >
              <StoreHeader>
                <StoreName>{store.name}</StoreName>
                <RatingBadge>⭐ {store.rating}</RatingBadge>
              </StoreHeader>

              <StoreAddress>
                📍 {store.address}
                {(store as any).distance !== undefined && (
                  <DistanceBadge>({(store as any).distance} km)</DistanceBadge>
                )}
              </StoreAddress>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '0.9rem', lineHeight: 1.5 }}>
                {store.description}
              </p>

              <CategoryTags>
                {store.categories.map((cat, idx) => (
                  <CatTag key={idx}>#{cat}</CatTag>
                ))}
              </CategoryTags>

              <ButtonRow>
                <PhoneButton href={`tel:${store.phone}`}>
                  <span>📞</span> 전화
                </PhoneButton>
                <NavButton onClick={() => startNavigation(store)}>
                  <span>🚗</span> 실시간 길찾기
                </NavButton>
              </ButtonRow>
            </StoreCard>
          ))}
        </Sidebar>

        {/* Map View */}
        <MapContainerWrapper>
          <MapProviderNotice>
            <span>🗺️ 활성화 지도 엔진:</span>
            <strong>{getProviderName()}</strong>
          </MapProviderNotice>

          {isNavigating && routeWaypoints.length > 0 && (
            <NavigationHUD className="animate-fade-in">
              <span style={{ fontSize: '1.8rem' }}>🚙</span>
              <HUDText>
                <div className="title">실시간 주행 안내 중 ({selectedStore?.name})</div>
                <div className="guide">{routeWaypoints[currentStepIndex]?.stepText}</div>
              </HUDText>
              <StopNavButton onClick={stopNavigation}>안내 종료</StopNavButton>
            </NavigationHUD>
          )}

          <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
        </MapContainerWrapper>
      </Layout>
    </Container>
  );
};

export default FlowerMapNavigation;
