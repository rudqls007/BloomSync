# Data Model

## 엔티티

### Flower
- `id`: 문자열
- `name`: 문자열
- `description`: 문자열
- `color`: 문자열
- `season`: 문자열
- `imageUrl`: 문자열

### Occasion
- `id`: 문자열
- `name`: 문자열
- `description`: 문자열
- `tags`: 문자열 배열

### Store
- `id`: 문자열
- `name`: 문자열
- `location`: 문자열
- `phone`: 문자열
- `url`: 문자열
- `categories`: 문자열 배열

### Recommendation
- `id`: 문자열
- `flowerId`: 문자열
- `occasionId`: 문자열
- `score`: 숫자
- `reason`: 문자열

### PurchaseLink
- `recommendationId`: 문자열
- `storeId`: 문자열
- `link`: 문자열

## 관계
- `Recommendation`은 `Flower`와 `Occasion`을 연결
- `PurchaseLink`는 추천 결과와 `Store`를 연결
