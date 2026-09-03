export interface Flower {
  id: string;
  name: string;
  description: string;
  color: string;
  season: string;
  imageUrl: string;
  languageOfFlowers: string; // 꽃말
  characteristics: string[]; // 특징 리스트
  recommendedOccasions: string[]; // 추천 기념일
}

export interface Occasion {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

export interface Store {
  id: string;
  name: string;
  location: string;
  phone: string;
  url: string;
  categories: string[];
  latitude: number;
  longitude: number;
  rating: number;
  address: string;
  description: string;
}

export interface Recommendation {
  id: string;
  flowerId: string;
  occasionId: string;
  score: number;
  reason: string;
}

export interface PurchaseLink {
  recommendationId: string;
  storeId: string;
  link: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'question' | 'review' | 'tip';
  likes: number;
  views: number;
  comments: Comment[];
  createdAt: string;
}

export interface AnniversaryMatchRequest {
  occasion: string; // e.g. '100일 기념일', '프로포즈', '어버이날', '생일'
  recipient?: string; // e.g. '연인', '부모님', '친구', '나 자신'
  budget?: string; // e.g. '3만원 이하', '3~5만원', '5~10만원', '10만원 이상'
  preferredColor?: string;
}

export interface AnniversaryMatchResult {
  flower: Flower;
  matchScore: number; // 0~100 %
  matchReason: string;
  packagingTip: string;
  recommendedTag: string;
}


