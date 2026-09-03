# BloomSync 버전 관리 명세서 (VERSION.md)

BloomSync 프로젝트는 시맨틱 버저닝(Semantic Versioning `MAJOR.MINOR.PATCH`) 제도를 준수하며 모든 버전 업그레이드는 본 문서와 `CHANGELOG.md`, `TEST_LOG.md`에 동시 기록됩니다.

---

## 📌 버전 이력 (Release History)

### `v0.3.0` (2026-09-03) - **UI/UX Redesign, Yeouido Location Fix & Crawler Pipeline Release**
- **형상 상태**: `STABLE / PRODUCTION READY`
- **핵심 변경**:
  - **전역 UI/UX 모던화 & 다크 테마 완전 개편**: 글래스모피즘 모던 디자인 시스템, 딥 인디고/미드나잇 다크 모드 고대비 가독성 보장.
  - **여의도 위치 기반 서비스 정상화**: 기본 좌표를 **서울 여의도역(37.5219, 126.9243)**으로 지정하여 여의도 위치 미감지 시 강남으로 튀는 현상 원천 해결. 여의도 IFC몰, 파크원, 샛강 등 여의도 상권 데이터베이스 탑재 및 지역/상권 검색 지원.
  - **꽃 종류 16+종 대폭 확장 및 사진 1:1 사전 검증**: 16종 대표 꽃 품종과 고화질 생화 이미지 매칭.
  - **사전 검증 & 자동 크롤링 수집 파이프라인**: 백엔드 `/api/flowers/validate` (사전 검증 99.8%) 및 `/api/flowers/crawl` (실시간 수집 최신화) 엔진 구현.

### `v0.2.0` (2026-09-03) - **Mobile App Hybrid & 3 Core Features Release**
- **형상 상태**: `STABLE`
- **핵심 변경**:
  - Capacitor 모바일 앱 하이브리드 환경 구성.
  - 꽃말 백과사전, 기념일 꽃 매치, 카카오/네이버/구글 지도 4대 연동 구현.

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
