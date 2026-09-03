# BloomSync (v0.2.0)

BloomSync는 꽃 정보(꽃말), 기념일 맞춤 추천 매칭, 카카오/네이버/구글 지도 기반 꽃집 위치 검색 및 경로 안내 서비스를 웹과 모바일 앱에서 동일하게 공유하는 크로스 플랫폼 플라워 플랫폼입니다.

## 📌 현재 버전
- **버전**: `v0.2.0` (Mobile Hybrid App & 3 Core Features Release)
- **업데이트 일자**: 2026-09-03

## 🌟 3대 핵심 기능
1. **🌸 꽃 종류 & 꽃말 백과사전 (`FlowerDictionary`)**: 꽃말(Language of Flowers), 특징, 계절/색상/키워드 필터 및 모달 상세보기.
2. **💖 기념일 꽃 매치 (`AnniversaryMatcher`)**: 100일 기념일, 프로포즈, 어버이날, 졸업식 등 상황/대상별 백엔드 매칭 알고리즘(`POST /api/recommendations/match`), 매칭 점수(%), 추천 사유 및 감성 포장 팁 제공.
3. **📍 카카오/네이버/구글 지도 위치 서비스 (`FlowerMapNavigation`)**: 내 위치(Geolocation) 감지, 근처 꽃집 핀 마커, 전화 연결, 실시간 주행 경로 안내 HUD.

## 📱 모바일 앱 패키징 (Capacitor)
- 웹 애플리케이션 기반으로 iOS 및 Android 모바일 네이티브 앱 패키징 지원 (`capacitor.config.json` 연동).
- **실행 명령**:
  - `npm run build` (웹 프로덕션 빌드)
  - `npm run cap:sync` (모바일 에셋 동기화)
  - `npm run cap:open:android` / `npm run cap:open:ios` (네이티브 IDE 연동)

## 📁 프로젝트 구조
- `backend/`: Express.js API 서버 (`/api/flowers`, `/api/recommendations/match`, `/api/stores`)
- `common/`: 공통 TypeScript 인터페이스 및 DTO
- `web/`: React 18 + styled-components UI & 지도 연동 클라이언트
- `mobile/`: Capacitor 크로스 플랫폼 모바일 네이티브 브릿지
- `docs/`: architecture.md, data-model.md, feature-spec.md

## 📚 형상 및 버전 관리 문서
- [CHANGELOG.md](file:///d:/55555.Personal/BloomSync/CHANGELOG.md) - 버전별 변경 이력
- [TEST_LOG.md](file:///d:/55555.Personal/BloomSync/TEST_LOG.md) - 버전별 종합 테스트 결과 및 검증 이력
- [TROUBLESHOOTING.md](file:///d:/55555.Personal/BloomSync/TROUBLESHOOTING.md) - 트러블슈팅 및 문제 해결 가이드
- [TODO.md](file:///d:/55555.Personal/BloomSync/TODO.md) - 로드맵 및 기능 체크리스트
- [VERSION.md](file:///d:/55555.Personal/BloomSync/VERSION.md) - 버전 관리 명세서

