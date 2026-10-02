// 후쿠오카 2027.1.12(화)~1.15(금) — 교통편 가이드 데이터
// 확정 플랜: 왕복 비행기(인천↔후쿠오카) + 공항리무진(춘천↔인천공항) · 성인 2인
// 가격 조사일: 2026-10-02 (항공권은 변동 — 예매 시점에 재확인)

export interface CostRow {
  item: string;
  detail: string;
  cost: string; // 1인 기준
  time: string; // 소요시간
}

export const COST_ROWS: CostRow[] = [
  {
    item: "공항리무진 춘천 ↔ 인천공항 (왕복)",
    detail: "우등 26,600원 × 2 · 티머니GO/버스타고 예매",
    cost: "53,200원",
    time: "편도 2시간 51분",
  },
  {
    item: "비행기 왕복 (인천 ↔ 후쿠오카)",
    detail: "LCC 이코노미 · 10/2 검색 기준, 세금 포함",
    cost: "약 200,000~280,000원",
    time: "편도 약 1시간 30분",
  },
  {
    item: "후쿠오카공항 ↔ 시내 지하철 (왕복)",
    detail: "하카타역까지 2정거장 · 260엔×2",
    cost: "약 5,000원",
    time: "편도 약 6분",
  },
];

export const COST_TOTAL = {
  total: "약 26만~34만원",
  time: "약 9시간",
  totalTime: "왕복 순수 이동 합계 — 페리 플랜(약 18시간) 대비 절반",
  note: "왕복 196,000원 이하면 좋은 딜(카약 기준). 특가 잡으면 1인 약 22만원까지. 2인이면 약 52만~68만원. 운전 없이 버스에서 자면서 이동하는 게 리무진의 장점",
};

export interface Step {
  time: string;
  title: string;
  body: string;
}

// 1/12(화) 가는 날
export const OUTBOUND: Step[] = [
  {
    time: "04:00",
    title: "춘천터미널 → 인천공항 리무진 첫차",
    body: "우등 26,600원, 2시간 51분 → 06:51 공항 도착. 티머니GO/버스타고 앱으로 미리 예매하고, 겨울 시즌 시간표(감회 가능성)는 예매 시점에 재확인. 버스에서 한숨 자면서 이동",
  },
  {
    time: "07:00~",
    title: "국제선 체크인",
    body: "10:10 편(TW201) 기준 3시간 여유 — 아침 먹을 시간까지 넉넉. 08:40 편(ZE645)은 1시간 49분 전 도착이라 온라인 체크인 + 기내 수하물 전제로만 가능",
  },
  {
    time: "오전~점심",
    title: "비행 1시간 30분 → 후쿠오카 도착",
    body: "입국(Visit Japan Web QR) → 지하철 2정거장(약 6분, 260엔)으로 하카타역. 숙소에 짐 맡기고 점심부터 바로 Day 1 시작 — 12일 오후를 통으로 쓸 수 있음",
  },
];

// 1/12 아침 출발편 후보 (에키탄 2027-01-12 시간표 기준)
export interface Flight {
  airline: string;
  flight: string;
  dep: string;
  arr: string;
  price1?: string;
  note?: string;
}

export const OUT_FLIGHTS: Flight[] = [
  {
    airline: "트리니티(티웨이)",
    flight: "TW201",
    dep: "10:10 인천",
    arr: "11:35 후쿠오카",
    note: "추천 — 첫차 리무진으로 여유 있게 체크인, 점심에 하카타 도착",
  },
  {
    airline: "이스타",
    flight: "ZE645",
    dep: "08:40 인천",
    arr: "10:20 후쿠오카",
    note: "더 일찍 도착 — 단 첫차(06:51 도착) 기준 타이트, 온라인 체크인+기내 수하물 전제",
  },
  {
    airline: "대한항공",
    flight: "KE791",
    dep: "10:50 인천",
    arr: "12:30 후쿠오카",
    note: "FSC 선호 시 — 수하물 포함·변경 유연, 가격은 LCC보다 높음",
  },
];

// 1/15(금) 귀국편 후보 (에키탄 2027-01-15 시간표 기준)
// 리무진 막차(공항발 춘천행 ~22:30) 때문에 저녁 도착편은 당일 귀가 불가 — 오후편이 기준
export const RETURN_FLIGHTS: Flight[] = [
  {
    airline: "진에어",
    flight: "LJ456",
    dep: "14:40 후쿠오카",
    arr: "16:10 인천",
    note: "추천 — 16:10 도착 → 17~18시 리무진 → 춘천 20~21시 귀가. 마지막 날 오전·점심까지 사용 가능",
  },
  {
    airline: "진에어",
    flight: "LJ462",
    dep: "20:05 후쿠오카",
    arr: "21:35 인천",
    note: "저녁까지 풀로 놀고 싶다면 — 단 막차 불가라 공항 인근 1박 + 다음날 첫차(06:40) 귀가 전제",
  },
  {
    airline: "대한항공",
    flight: "KE782",
    dep: "21:05 후쿠오카",
    arr: "22:35 인천",
    note: "최후발 — 역시 공항 1박 전제",
  },
];

export const RETURN_STEPS: Step[] = [
  {
    time: "12:00",
    title: "시내 → 후쿠오카공항",
    body: "하카타역에서 지하철 2정거장(약 6분) + 국내선→국제선 무료 셔틀 10분. 14:40 비행기 기준 12시경 시내 출발 — 마지막 날 오전과 점심까지는 온전히 쓸 수 있음",
  },
  {
    time: "16:10 도착",
    title: "인천공항 → 춘천 리무진 귀가",
    body: "입국+수하물 약 1시간 → 17~18시 리무진(우등 26,600원, 2시간 51분) → 춘천 20~21시 도착. 운전 없이 버스에서 쉬면서 귀가",
  },
];

export const CAUTIONS: { title: string; body: string }[] = [
  {
    title: "🌙 저녁 귀국편 = 막차 불가",
    body: "공항발 춘천행 리무진 막차가 ~22:30이라 21:35 이후 도착편(LJ462·KE782 등)은 당일 귀가 불가. 당일 귀가하려면 오후편(LJ456 14:40→16:10)이 기준 — 저녁편을 원하면 공항 인근 1박 비용(2인 8~12만)을 계산에 넣을 것",
  },
  {
    title: "🎫 항공권 — 편명 개편 주의",
    body: "2026/27 동계 개편으로 진에어 후쿠오카 편명이 LJ4xx로 변경됨(구 LJ266 → LJ462). 예매 시 반드시 공홈에서 2027-01-12/15 날짜로 확인. 왕복 1인 20만원 아래면 바로 예매 — 통계적 최저점은 11월 중순~12월 초",
  },
  {
    title: "🧳 LCC 수하물 별도",
    body: "LCC 특가 운임은 위탁 수하물 미포함이 보통 — 위탁 추가 시 편도 2~4만원. 기내 반입(7~10kg)만으로 다녀올 수 있게 짐을 짜면 왕복 4~8만원 절약",
  },
  {
    title: "🚌 리무진 예매·시간표",
    body: "첫차 04:00(춘천터미널발), 공항발 춘천행 06:40~22:30. 티머니GO/버스타고 앱으로 왕복 모두 미리 예매하고, 겨울 시즌 감회 여부는 예매 시점에 재확인",
  },
];

// Visit Japan Web (입국 준비 — 공항 입국 기준)
export const VJW = {
  links: [
    { label: "공식 등록 사이트 (한국어)", url: "https://www.vjw.digital.go.jp/" },
    { label: "디지털청 공식 안내", url: "https://services.digital.go.jp/ko/visit-japan-web/" },
    { label: "공식 조작 매뉴얼 (한국어)", url: "https://www.vjw.digital.go.jp/manual/main/visitjapanweb_manual_ko.html" },
  ],
  blogs: [
    { label: "2026 비짓재팬웹 등록 단계별 가이드", url: "https://kokorang.com/visit-japan-web-registration-guide/" },
  ],
  points: [
    "계정 생성 → 여권 등록 → 입국 예정(항공편·숙소) 등록 → QR 발급. 약 10~15분, 무료",
    "입국심사·세관 통합 QR 1개 — 후쿠오카공항에서는 입국심사와 세관 전자신고까지 QR로 처리 가능",
    "출발 전에 등록 끝내고 QR 화면을 스크린샷으로 캡처 — 기내·공항 와이파이에 기대지 말 것",
  ],
};
