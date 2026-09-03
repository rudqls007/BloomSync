# BloomSync 버전 관리 명세서 (VERSION.md)

BloomSync 프로젝트는 시맨틱 버저닝(Semantic Versioning `MAJOR.MINOR.PATCH`) 제도를 준수하며 모든 버전 업그레이드는 본 문서와 `CHANGELOG.md`, `TEST_LOG.md`에 동시 기록됩니다.

---

## 📌 버전 이력 (Release History)

### `v0.2.0` (2026-09-03) - **Mobile App Hybrid & 3 Core Features Release**
- **형상 상태**: `STABLE / PRODUCTION READY`
- **핵심 변경**:
  - **모바일 앱 환경 구성을 위한 Capacitor 구축**: `capacitor.config.json` 추가, iOS/Android 네이티브 빌드 스크립트 작성, 메타 뷰포트 노치/Safe Area 최적화.
  - **기능 1 (꽃말 백과사전)**: 꽃말 특화 뱃지/모달, 계절/색상/키워드 다중 검색 기능 구현 (`/api/flowers`).
  - **기능 2 (기념일 꽃 매치)**: 백엔드 매칭 추천 엔드포인트 (`POST /api/recommendations/match`), 매칭률 점수(%), 추천 사유 및 감성 포장 팁 UI (`AnniversaryMatcher.tsx`).
  - **기능 3 (지도 API 및 위치 서비스)**: Kakao / Naver / Google Maps 및 OpenStreetMap 멀티 프로바이더 연동, Geolocation 내 위치 감지, 근처 꽃집 핀 마커 및 실시간 네비게이션 HUD (`FlowerMapNavigation.tsx`).
- **테스트 결과**: 백엔드/프론트엔드 TypeScript 통과, 빌드 100% 성공, API 엔드포인트 및 지도/길찾기 수동 검증 완료 (`TEST_LOG.md` 참조).

### `v0.1.0` (2026-04-14) - **Initial Monorepo Skeleton & Web MVP**
- **형상 상태**: `INITIAL MVP`
- **핵심 변경**:
  - 프로젝트 기본 폴더 구조 (`backend/`, `common/`, `web/`, `mobile/`, `docs/`) 및 아키텍처 문서 설계.
  - 기본 Express REST API 및 공통 TypeScript 타입 스켈레톤 정의.
  - React 기반 홈 웹 페이지 초기 구조 반영.

---

## ⚙️ 버전 체계 (Semantic Versioning Rules)
1. **MAJOR (`X.0.0`)**: 아키텍처 대규모 개편, 호환되지 않는 API 변경 시 증강.
2. **MINOR (`0.X.0`)**: 새로운 기능 추가(기념일 매치, 지도 API, 모바일 앱 구성 등) 및 하위 호환 가능한 변경.
3. **PATCH (`0.0.X`)**: 버그 수정, 핫픽스, 리팩토링, 문서 보완 시 증강.

---

## 📜 형상 관리 및 커밋 규칙 (Git Convention)
- `feat:` 새로운 기능 추가 (예: `feat: Add Anniversary Matcher API`)
- `fix:` 버그 수정 (예: `fix: Resolve legacy peer dependency conflicts`)
- `docs:` 문서 수정 (예: `docs: Update TEST_LOG.md and VERSION.md`)
- `style:` 코드 스타일 및 UI 레이아웃 개편
- `config:` 환경 설정 및 모바일 빌드 설정 (예: `config: Setup Capacitor for Android/iOS`)
