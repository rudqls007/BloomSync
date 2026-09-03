import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { Flower, Store, Post, Comment, AnniversaryMatchRequest, AnniversaryMatchResult } from '../../common/types';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 데이터 지속성을 위한 로컬 파일 경로
const DATA_FILE = path.join(__dirname, 'data.json');

// 초기 꽃 데이터
const initialFlowers: Flower[] = [
  {
    id: 'f1',
    name: '장미 (Rose)',
    description: '사랑과 열정을 상징하는 꽃으로, 특별한 날 최고의 마음을 전합니다.',
    color: '레드',
    season: '사계절',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    languageOfFlowers: '열렬한 사랑, 열정, 기쁨',
    characteristics: ['강렬한 향기', '다양한 품종과 색상', '선물용 인기도 1위'],
    recommendedOccasions: ['프로포즈', '발렌타인데이', '생일', '100일 기념일', '기념일']
  },
  {
    id: 'f2',
    name: '튤립 (Tulip)',
    description: '우아한 라인과 화려한 색감이 돋보이는 봄의 대표적인 인기 꽃입니다.',
    color: '옐로우',
    season: '봄',
    imageUrl: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80',
    languageOfFlowers: '영원한 애정, 희망, 매혹',
    characteristics: ['깔끔하고 세련된 자태', '수경재배 가능', '온도에 반응하는 꽃잎'],
    recommendedOccasions: ['연인과의 데이트', '100일 기념일', '화이트데이', '졸업식']
  },
  {
    id: 'f3',
    name: '해바라기 (Sunflower)',
    description: '밝은 태양을 닮아 긍정과 응원의 메시지를 가득 전해주는 꽃입니다.',
    color: '옐로우',
    season: '여름',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80',
    languageOfFlowers: '당신만을 바라봅니다, 행운, 부',
    characteristics: ['생명력이 강함', '크고 화려한 꽃송이', '밝은 분위기 연출'],
    recommendedOccasions: ['개업 축하', '응원/격려', '입사 축하', '승진 선물', '생일']
  },
  {
    id: 'f4',
    name: '안개꽃 (Baby\'s Breath)',
    description: '다른 꽃을 한층 빛내주는 맑고 맑은 은하수 같은 맑은 꽃입니다.',
    color: '화이트',
    season: '사계절',
    imageUrl: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80',
    languageOfFlowers: '맑은 마음, 맑고 순수한 사랑, 죽도록 사랑함',
    characteristics: ['드라이플라워 가능', '풍성한 볼륨감', '어떤 꽃과도 잘 어울림'],
    recommendedOccasions: ['첫만남', '일상 속 서프라이즈', '드라이플라워 선물', '성년의 날', '100일 기념일']
  },
  {
    id: 'f5',
    name: '카네이션 (Carnation)',
    description: '깊은 존경과 감사, 따뜻한 애정을 전할 때 결코 빠질 수 없는 우아한 꽃입니다.',
    color: '핑크',
    season: '봄',
    imageUrl: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80',
    languageOfFlowers: '감사, 존경, 어머니의 사랑',
    characteristics: ['절화 수명이 길음', '겹겹이 쌓인 부드러운 꽃잎', '은은한 향'],
    recommendedOccasions: ['어버이날', '스승의 날', '부모님 생신', '퇴직 축하']
  },
  {
    id: 'f6',
    name: '수국 (Hydrangea)',
    description: '토양에 따라 다채로운 색을 품으며 탐스러운 풍성함을 자랑합니다.',
    color: '블루',
    season: '여름',
    imageUrl: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80',
    languageOfFlowers: '진심, 변치 않는 우정, 다정한 마음',
    characteristics: ['물이 많이 필요함', '탐스러운 형태', '몽환적인 색감 변화'],
    recommendedOccasions: ['웨딩 부케', '친구 생일', '위로 선물', '여름 데이트', '기념일']
  },
  {
    id: 'f7',
    name: '작약 (Peony)',
    description: '봄의 왕관이라 불리며 수줍은 고백과 풍성한 화려함을 함께 지닌 꽃입니다.',
    color: '핑크',
    season: '봄',
    imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=600&q=80',
    languageOfFlowers: '수줍음, 부귀영화, 수줍은 고백',
    characteristics: ['은은하고 매혹적인 향', '피어날수록 거대해지는 꽃잎', '고급스러운 부케'],
    recommendedOccasions: ['프로포즈', '결혼기념일', '100일 기념일', '성년의 날']
  },
  {
    id: 'f8',
    name: '프리지아 (Freesia)',
    description: '상쾌하고 진한 향기로 봄의 시작과 새 출발을 알리는 대표적인 희망의 꽃입니다.',
    color: '옐로우',
    season: '봄',
    imageUrl: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=600&q=80',
    languageOfFlowers: '당신의 시작을 응원합니다, 천진난만, 청순',
    characteristics: ['매우 진한 상큼한 향기', '길쭉하게 피어나는 봉오리', '밝은 분위기'],
    recommendedOccasions: ['입학식', '졸업식', '새로운 출발', '입사 축하', '첫만남']
  },
  {
    id: 'f9',
    name: '리시안셔스 (Lisianthus)',
    description: '장미보다 부드러운 우아함을 지녔으며 영원한 사랑의 약속을 상징합니다.',
    color: '퍼플',
    season: '사계절',
    imageUrl: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600&q=80',
    languageOfFlowers: '변치 않는 사랑, 영원한 애정',
    characteristics: ['하늘거리는 실크 같은 꽃잎', '오래 유지되는 생명력', '다채로운 파스텔 톤'],
    recommendedOccasions: ['프로포즈', '100일 기념일', '발렌타인데이', '결혼기념일']
  }
];

// 초기 주변 꽃가게 데이터
const initialStores: Store[] = [
  {
    id: 's1',
    name: '블룸Sync 플라워 스튜디오',
    location: '서울 강남구 테헤란로 123',
    phone: '02-555-1004',
    url: 'https://bloomsync.example.com',
    categories: ['당일배송', '커스텀 부케', '원데이 클래스'],
    latitude: 37.498095,
    longitude: 127.02761,
    rating: 4.9,
    address: '서울 강남구 테헤란로 123 1층',
    description: '매일 아침 경매장에서 엄선해온 신선한 특급 생화로 제작하는 감성 플라워 숍'
  },
  {
    id: 's2',
    name: '로맨틱 로즈 가든',
    location: '서울 강남구 강남대로 456',
    phone: '02-456-7890',
    url: 'https://romanticrose.example.com',
    categories: ['프리저브드', '프로포즈 전문', '주차가능'],
    latitude: 37.5012,
    longitude: 127.0255,
    rating: 4.8,
    address: '서울 강남구 강남대로 456 지하1층',
    description: '프로포즈 및 이벤트 전담 아티스트가 상주하는 플라워 전문 공간'
  },
  {
    id: 's3',
    name: '꽃내음 가득한 아틀리에',
    location: '서울 서초구 반포대로 78',
    phone: '02-345-6789',
    url: 'https://flowernaeum.example.com',
    categories: ['식물/화분', '친환경 포장', '반려식물'],
    latitude: 37.4925,
    longitude: 127.0195,
    rating: 4.7,
    address: '서울 서초구 반포대로 78',
    description: '희귀 관엽식물과 감각적인 꽃다발이 공존하는 미니 힐링 정원'
  },
  {
    id: 's4',
    name: '소울플라워 강남본점',
    location: '서울 강남구 역삼로 210',
    phone: '02-789-0123',
    url: 'https://soulflower.example.com',
    categories: ['24시간 예약', '기념일 전문', '퀵배송'],
    latitude: 37.4950,
    longitude: 127.0340,
    rating: 4.9,
    address: '서울 강남구 역삼로 210',
    description: '기념일 맞춤 카드 및 프리미엄 포장 서비스를 제공하는 센스있는 꽃집'
  }
];

// 초기 커뮤니티 데이터
const initialPosts: Post[] = [
  {
    id: 'p1',
    title: '여자친구 100일 기념으로 튤립 꽃다발 줬는데 대성공입니다!💐',
    content: '노란색이랑 분홍색 튤립 조합으로 제작 요청했는데 너무 예쁘게 묶어주셨어요. 여자친구가 사진 엄청 찍고 좋아했습니다. 꽃말도 영원한 애정이라 딱이었어요!',
    author: '꽃길만걷자',
    category: 'review',
    likes: 24,
    views: 182,
    createdAt: '2026-07-05 14:30',
    comments: [
      {
        id: 'c1',
        postId: 'p1',
        author: '플라워러버',
        content: '색감 조합 정말 센스있으시네요! 100일 축하드립니다 🎉',
        createdAt: '2026-07-05 15:10'
      },
      {
        id: 'c2',
        postId: 'p1',
        author: '봄날의곰',
        content: '튤립은 물 자주 갈아주면 오래 가요! 잘 유지하세요~',
        createdAt: '2026-07-05 16:45'
      }
    ]
  },
  {
    id: 'p2',
    title: '부모님 어버이날 카네이션 대신 어떤 꽃 추천하시나요?',
    content: '매년 레드 카네이션만 드렸더니 이번엔 좀 색다른 선물이나 꽃 조합을 해보고 싶은데, 카네이션이랑 잘 어울리는 화사한 꽃 있을까요?',
    author: '효도하자',
    category: 'question',
    likes: 12,
    views: 95,
    createdAt: '2026-07-04 11:20',
    comments: [
      {
        id: 'c3',
        postId: 'p2',
        author: '전문가K',
        content: '핑크 카네이션에 수국이나 은은한 리시안셔스를 섞으면 훨씬 세련되고 풍성해집니다!',
        createdAt: '2026-07-04 12:05'
      }
    ]
  },
  {
    id: 'p3',
    title: '🌱 꽃다발 오래 보관하는 소소한 꿀팁 3가지',
    content: '1. 줄기 끝을 사선으로 1~2cm 잘라주기 (물 흡수 면적 증가)\n2. 차가운 물에 락스 한 방울 세균 번식 방지!\n3. 직사광선 피하고 시원한 곳에 두기. 다들 예쁜 꽃 오래 보셔요!',
    author: '식물집사',
    category: 'tip',
    likes: 45,
    views: 310,
    createdAt: '2026-07-03 09:15',
    comments: []
  }
];

interface DatabaseData {
  flowers: Flower[];
  stores: Store[];
  posts: Post[];
}

// 데이터 읽기 / 쓰기 헬퍼
const loadData = (): DatabaseData => {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.error('Failed to parse data file, resetting to initial', e);
    }
  }
  const defaultData = { flowers: initialFlowers, stores: initialStores, posts: initialPosts };
  saveData(defaultData);
  return defaultData;
};

const saveData = (data: DatabaseData) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

// --- API Endpoints ---

// 1. 꽃 백과사전 API
app.get('/api/flowers', (req, res) => {
  const data = loadData();
  const { search, season, color } = req.query;

  let result = data.flowers;

  if (search) {
    const query = String(search).toLowerCase();
    result = result.filter(f => 
      f.name.toLowerCase().includes(query) ||
      f.languageOfFlowers.toLowerCase().includes(query) ||
      f.description.toLowerCase().includes(query) ||
      f.recommendedOccasions.some(o => o.toLowerCase().includes(query))
    );
  }

  if (season && season !== '전체') {
    result = result.filter(f => f.season === season || f.season === '사계절');
  }

  if (color && color !== '전체') {
    result = result.filter(f => f.color === color);
  }

  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/flowers/:id', (req, res) => {
  const data = loadData();
  const flower = data.flowers.find(f => f.id === req.params.id);
  if (!flower) {
    return res.status(404).json({ success: false, message: '꽃을 찾을 수 없습니다.' });
  }
  res.json({ success: true, data: flower });
});

// 1-2. 기념일 꽃 매칭 API
app.post('/api/recommendations/match', (req, res) => {
  const data = loadData();
  const { occasion, recipient, budget, preferredColor } = req.body as AnniversaryMatchRequest;

  if (!occasion) {
    return res.status(400).json({ success: false, message: '기념일/상황을 선택해 주세요.' });
  }

  const occLower = occasion.toLowerCase();
  const results: AnniversaryMatchResult[] = data.flowers.map(flower => {
    let score = 70; // 기본 점수

    // 1. 기념일 매칭 검사
    const hasDirectMatch = flower.recommendedOccasions.some(o => 
      o.toLowerCase().includes(occLower) || occLower.includes(o.toLowerCase())
    );
    if (hasDirectMatch) score += 20;

    // 2. 대상(Recipient) 매칭 검사
    if (recipient === '부모님' && (flower.name.includes('카네이션') || flower.name.includes('수국'))) {
      score += 10;
    } else if (recipient === '연인' && (flower.name.includes('장미') || flower.name.includes('작약') || flower.name.includes('리시안셔스') || flower.name.includes('튤립'))) {
      score += 10;
    } else if (recipient === '친구' && (flower.name.includes('프리지아') || flower.name.includes('해바라기') || flower.name.includes('안개꽃'))) {
      score += 10;
    }

    // 3. 선호 색상 매칭 검사
    if (preferredColor && preferredColor !== '상관없음' && flower.color === preferredColor) {
      score += 5;
    }

    // 점수 상한 제한 99%
    score = Math.min(99, score);

    // 맞춤 추천 사유 및 포장 팁 생성
    let matchReason = `'${flower.languageOfFlowers}'라는 아름다운 꽃말을 품고 있어 ${occasion} 선물로 감동을 더해줍니다.`;
    let packagingTip = `파스텔 톤 리본과 투명 오간자 포장지로 감싸주면 ${flower.name} 특유의 화사함이 극대화됩니다.`;
    let recommendedTag = 'BEST MATCH';

    if (flower.name.includes('장미')) {
      matchReason = `'${flower.languageOfFlowers}'를 의미하여 ${recipient ? recipient + '을(를) 위한 ' : ''}${occasion} 순간에 최고의 로맨스를 전합니다.`;
      packagingTip = '클래식한 크라프트지와 블랙 리본으로 고급스러운 우아함을 연출해 보세요.';
      recommendedTag = '로맨틱 1위';
    } else if (flower.name.includes('작약')) {
      matchReason = `'수줍은 고백과 부귀'를 상징하여 특별하고 특별한 ${occasion}에 고급스러운 감동을 안겨줍니다.`;
      packagingTip = '화이트 실크 리본과 풍성한 라운드 래핑으로 명품 부케 느낌을 완성해보세요.';
      recommendedTag = '럭셔리 추천';
    } else if (flower.name.includes('프리지아')) {
      matchReason = `'당신의 시작을 응원합니다'라는 희망찬 의미로 새로운 출발과 축하의 자리에 가장 완벽합니다.`;
      packagingTip = '내추럴한 린넨 리본과 파스텔 옐로우 페이퍼 포장이 싱그러운 향기와 조화를 이룹니다.';
      recommendedTag = '응원/축하 1위';
    } else if (flower.name.includes('카네이션')) {
      matchReason = `'감사와 존경'의 깊은 마음이 전달되어 부모님이나 스승님께 올리는 최고의 선물입니다.`;
      packagingTip = '버건디 메인 리본과 깔끔한 패브릭 포장으로 정갈한 감동을 선사하세요.';
      recommendedTag = '감사/존경 1위';
    } else if (flower.name.includes('리시안셔스')) {
      matchReason = `'변치 않는 영원한 사랑'을 입증하는 꽃으로 영원을 약속하는 기념일에 가장 적합합니다.`;
      packagingTip = '바이올렛 미니 밴드와 은은한 습식 레터링 페이퍼 포장을 추천합니다.';
      recommendedTag = '영원한 사랑';
    }

    return {
      flower,
      matchScore: score,
      matchReason,
      packagingTip,
      recommendedTag
    };
  });

  // 점수 높은 순으로 정렬
  results.sort((a, b) => b.matchScore - a.matchScore);

  res.json({
    success: true,
    count: results.length,
    occasion,
    recipient: recipient || '전체',
    data: results
  });
});


// 2. 근처 꽃 가게 및 네비게이션 API
app.get('/api/stores', (req, res) => {
  const data = loadData();
  const { lat, lng } = req.query;

  let stores = data.stores;

  if (lat && lng) {
    const userLat = parseFloat(String(lat));
    const userLng = parseFloat(String(lng));

    stores = stores.map(s => {
      const dLat = (s.latitude - userLat) * 111;
      const dLng = (s.longitude - userLng) * 88;
      const distance = Math.sqrt(dLat * dLat + dLng * dLng).toFixed(2);
      return { ...s, distance: parseFloat(distance) };
    }).sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  res.json({ success: true, count: stores.length, data: stores });
});

// 특정 가게로 가는 주행 경로 좌표 생성 (모의 길찾기용)
app.get('/api/stores/:id/route', (req, res) => {
  const data = loadData();
  const store = data.stores.find(s => s.id === req.params.id);
  const { userLat, userLng } = req.query;

  if (!store) {
    return res.status(404).json({ success: false, message: '가게를 찾을 수 없습니다.' });
  }

  const startLat = userLat ? parseFloat(String(userLat)) : 37.4979;
  const startLng = userLng ? parseFloat(String(userLng)) : 127.0276;

  const waypoints = [];
  const stepsCount = 10;
  for (let i = 0; i <= stepsCount; i++) {
    const ratio = i / stepsCount;
    const curveNoiseLat = Math.sin(ratio * Math.PI) * 0.0006;
    const curveNoiseLng = Math.cos(ratio * Math.PI) * 0.0006;
    waypoints.push({
      lat: startLat + (store.latitude - startLat) * ratio + curveNoiseLat,
      lng: startLng + (store.longitude - startLng) * ratio + curveNoiseLng,
      stepText: i === 0 ? '출발 (현재 위치)' : i === stepsCount ? `${store.name} 도착` : `${Math.round(ratio * 100)}% 진행 지점`
    });
  }

  res.json({
    success: true,
    destination: store,
    route: waypoints
  });
});

// 3. 커뮤니티 API
app.get('/api/community', (req, res) => {
  const data = loadData();
  const { category, search } = req.query;

  let posts = data.posts;

  if (category && category !== 'all') {
    posts = posts.filter(p => p.category === category);
  }

  if (search) {
    const q = String(search).toLowerCase();
    posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
  }

  res.json({ success: true, count: posts.length, data: posts });
});

app.post('/api/community', (req, res) => {
  const data = loadData();
  const { title, content, author, category } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ success: false, message: '모든 필드를 입력해 주세요.' });
  }

  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newPost: Post = {
    id: 'p_' + Date.now(),
    title,
    content,
    author,
    category: category || 'question',
    likes: 0,
    views: 1,
    createdAt: dateStr,
    comments: []
  };

  data.posts.unshift(newPost);
  saveData(data);

  res.status(201).json({ success: true, data: newPost });
});

app.get('/api/community/:id', (req, res) => {
  const data = loadData();
  const post = data.posts.find(p => p.id === req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
  }

  post.views += 1;
  saveData(data);

  res.json({ success: true, data: post });
});

app.post('/api/community/:id/like', (req, res) => {
  const data = loadData();
  const post = data.posts.find(p => p.id === req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
  }

  post.likes += 1;
  saveData(data);

  res.json({ success: true, likes: post.likes });
});

app.post('/api/community/:id/comments', (req, res) => {
  const data = loadData();
  const post = data.posts.find(p => p.id === req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
  }

  const { author, content } = req.body;
  if (!author || !content) {
    return res.status(400).json({ success: false, message: '댓글 내용을 입력해 주세요.' });
  }

  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newComment: Comment = {
    id: 'c_' + Date.now(),
    postId: post.id,
    author,
    content,
    createdAt: dateStr
  };

  post.comments.push(newComment);
  saveData(data);

  res.status(201).json({ success: true, data: newComment, comments: post.comments });
});

app.listen(PORT, () => {
  console.log(`🌸 BloomSync API Server running on http://localhost:${PORT}`);
});
