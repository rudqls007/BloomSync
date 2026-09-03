# TROUBLESHOOTING (문제 해결 가이드)

BloomSync 프로젝트 개발 및 빌드 과정에서 발생할 수 있는 이슈와 해결 방안을 버전별로 관리합니다.

---

## 📌 [v0.2.0] 이슈 및 해결 방안 (2026-09-03)

### 1. React Scripts & TypeScript 버전 충돌 (`ERESOLVE peer dependency`)
- **증상**: `npm install` 실행 시 `react-scripts 5.0.1`의 peer dependency(`typescript@^3.2.1 || ^4`)와 설치된 `typescript@5.5.0` 간 충돌로 인해 설치 실패 발생.
- **원인**: `react-scripts` 최신 버전의 peer dependency 명세 제한.
- **해결 방안**:
  - `npm install --legacy-peer-deps` 옵션을 추가하여 peer dependency 충돌을 우회하여 정상 설치 진행.

### 2. PowerShell 환경에서 `npx` / `npm` 스크립트 실행 제약
- **증상**: Windows PowerShell 환경에서 SecurityException (`UnauthorizedAccess`) 및 `npx.ps1` 스크립트 실행 차단 발생.
- **원인**: PowerShell의 ExecutionPolicy 설정으로 인한 `.ps1` 파일 실행 제한.
- **해결 방안**:
  - `cmd /c "npm run build"` 또는 `cmd /c "npx react-scripts build"` 명령어를 통해 CMD 터미널 호환 환경으로 실행.

### 3. 모바일 앱 빌드 시 화면 상하단 잘림 (Safe Area)
- **증상**: iOS 및 Android 앱으로 실행 시 노치(Notch) 영역이나 하단 네비게이션 바와 UI가 겹치는 현상.
- **해결 방안**:
  - `index.html` 내 meta viewport 태그에 `viewport-fit=cover` 옵션 및 `user-scalable=no` 추가.
  - CSS 전역 변수로 Safe Area inset 수치를 적용할 수 있도록 헤더 및 컨테이너 스타일 보완.

### 4. 지도 API 키 미설정 시 지도 렌더링 에러 방지
- **증상**: 카카오/네이버/구글 지도 API 키가 없거나 개발 환경일 때 지도 영역이 빈 화면으로 표시되거나 스크립트 에러 발생 가능성.
- **해결 방안**:
  - `FlowerMapNavigation.tsx`에 OpenStreetMap(Leaflet) 엔진을 폴백(Fallback)으로 기본 연동하여 API 키 없이도 즉시 고화질 인터랙티브 지도와 마커, 실시간 길찾기 네비게이션이 동작하도록 멀티 프로바이더 구조 설계.

---

## 📌 [v0.1.0] 초기 설정 이슈 (2026-04-14)
- **Node.js 및 패키지 실행**: 각 폴더(`backend`, `web`, `mobile`)에서 개별 `npm install` 및 스크립트 실행 확인.
- **CORS 이슈**: 백엔드 `index.ts`에 `cors()` 미들웨어를 설정하여 웹 클라이언트(`localhost:3000`)의 API 호출 허용.
