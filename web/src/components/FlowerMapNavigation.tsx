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
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProviderSelectorGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--card-bg);
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--border-color);
`;

const ProviderChip = styled.button<{ $active: boolean }>`
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: none;
  background: ${props => (props.$active ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'transparent')};
  color: ${props => (props.$active ? '#ffffff' : 'var(--text-secondary)')};
  font-weight: ${props => (props.$active ? '700' : '500')};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => (props.$active ? '#ffffff' : 'var(--text-primary)')};
  }
`;

const RefreshButton = styled.button`
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ec4899;
    color: #ec4899;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 1.5rem;
  height: 650px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  padding-right: 0.5rem;
  max-height: 650px;
`;

const StoreCard = styled.div<{ $selected: boolean }>`
  padding: 1.3rem;
  border-radius: 18px;
  cursor: pointer;
  border: 2px solid ${props => (props.$selected ? '#ec4899' : 'transparent')};
  box-shadow: ${props => (props.$selected ? '0 0 20px rgba(236, 72, 153, 0.3)' : 'var(--shadow-soft)')};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const StoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.4rem;
`;

const StoreName = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-primary);
`;

const RatingBadge = styled.span`
  color: #f59e0b;
  font-size: 0.9rem;
  font-weight: 700;
  background: rgba(245, 158, 11, 0.12);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
`;

const StoreAddress = styled.p`
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const DistanceBadge = styled.span`
  color: #ec4899;
  font-weight: 700;
  font-size: 0.85rem;
`;

const CategoryTags = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.9rem;
`;

const CatTag = styled.span`
  background: rgba(236, 72, 153, 0.1);
  color: #ec4899;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-weight: 600;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PhoneButton = styled.a`
  padding: 0.7rem;
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.25);
  }
`;

const NavButton = styled.button`
  flex: 1;
  padding: 0.7rem;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
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
  min-height: 480px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-soft);
`;

const MapProviderNotice = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 10;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  color: #e2e8f0;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const NavigationHUD = styled.div`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: rgba(15, 23, 42, 0.88);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 1rem 1.8rem;
  border-radius: 999px;
  border: 1px solid rgba(236, 72, 153, 0.5);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  width: max-content;
  max-width: 90%;
`;

const HUDText = styled.div`
  display: flex;
  flex-direction: column;
  div.title {
    font-size: 0.8rem;
    color: #ec4899;
    font-weight: 700;
  }
  div.guide {
    font-size: 1.05rem;
    font-weight: 800;
  }
`;

const StopNavButton = styled.button`
  background: rgba(244, 63, 94, 0.25);
  border: 1px solid #f43f5e;
  color: #f43f5e;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.8rem;
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
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 37.4979,
    lng: 127.0276
  });
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
    fetchStores();

    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        err => console.log('Geolocation fallback: 서울 강남역기준')
      );
    }
  };

  const fetchStores = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/stores?lat=${userLocation.lat}&lng=${userLocation.lng}`);
      const json = await res.json();
      if (json.success) {
        setStores(json.data);
        if (json.data.length > 0) setSelectedStore(json.data[0]);
      }
    } catch (e) {
      console.error('Failed to fetch stores:', e);
    }
  };

  // Map engine render (Leaflet for high-fidelity interactive map demo)
  useEffect(() => {
    if (!mapRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (!leafletMapInstance.current) {
      const map = L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | BloomSync Map'
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

    // Add User Marker
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `<div style="background:#ec4899; width:24px; height:24px; border-radius:50%; border:3px solid #fff; box-shadow:0 0 15px rgba(236,72,153,0.9);"></div>`,
      iconSize: [24, 24]
    });
    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup('<b>내 위치</b>');

    // Add Store Markers
    stores.forEach(store => {
      const isSelected = selectedStore?.id === store.id;
      const storeIcon = L.divIcon({
        className: 'custom-store-marker',
        html: `<div style="background:${isSelected ? '#8b5cf6' : '#ec4899'}; color:white; padding:6px 12px; border-radius:999px; font-weight:bold; font-size:12px; white-space:nowrap; border:2px solid #fff; box-shadow:0 4px 12px rgba(0,0,0,0.3);">🌸 ${store.name}</div>`,
        iconSize: [110, 30]
      });

      const marker = L.marker([store.latitude, store.longitude], { icon: storeIcon }).addTo(map);
      marker.on('click', () => {
        setSelectedStore(store);
      });
    });
  }, [userLocation, stores, selectedStore, selectedProvider]);

  // Start Route Navigation Simulation
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

      // Render Polyline
      if (polylineRef.current) map.removeLayer(polylineRef.current);

      const latLngs = waypoints.map(w => [w.lat, w.lng]);
      polylineRef.current = L.polyline(latLngs, {
        color: '#ec4899',
        weight: 6,
        dashArray: '8, 12',
        lineCap: 'round'
      }).addTo(map);

      map.fitBounds(polylineRef.current.getBounds(), { padding: [50, 50] });

      // Animate Movement
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
      console.error('Failed to start navigation route:', e);
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
      case 'kakao': return '카카오 지도 (Kakao Maps API)';
      case 'naver': return '네이버 지도 (Naver Maps API)';
      case 'google': return '구글 지도 (Google Maps API)';
      case 'leaflet': return '자유 지도 (OpenStreetMap)';
    }
  };

  return (
    <Container className="animate-fade-in">
      <HeaderBox>
        <Title>📍 실시간 근처 꽃집 & 지도 네비게이션</Title>

        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
            <span>🔄</span> 위치 갱신
          </RefreshButton>
        </div>
      </HeaderBox>

      <Layout>
        {/* Sidebar */}
        <Sidebar>
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
                {(store as any).distance && <DistanceBadge>({(store as any).distance} km)</DistanceBadge>}
              </StoreAddress>

              <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
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
            <span>🗺️ 현재 활성화 지도:</span>
            <strong>{getProviderName()}</strong>
          </MapProviderNotice>

          {isNavigating && routeWaypoints.length > 0 && (
            <NavigationHUD className="animate-fade-in">
              <span style={{ fontSize: '1.8rem' }}>🚙</span>
              <HUDText>
                <div className="title">실시간 모의 주행 중 ({selectedStore?.name})</div>
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
