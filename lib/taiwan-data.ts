export type CategoryKey = "food" | "night" | "sight" | "cafe" | "trip";

export interface Category {
  title: string;
  color: string;
}

export interface Spot {
  cat: CategoryKey;
  /** [위도, 경도] — 대략적 위치, 정확한 길찾기는 구글맵 링크 사용 */
  ll: [number, number];
  label: string;
  name: string;
  zh: string;
  area: string;
  desc: string;
}

export const CATS: Record<CategoryKey, Category> = {
  food: { title: "🍜 맛집", color: "#8b3a3a" },
  night: { title: "🌙 야시장", color: "#b0662a" },
  sight: { title: "🏛 명소", color: "#2a5d8f" },
  cafe: { title: "☕ 카페·감성", color: "#2f6b45" },
  trip: { title: "🚞 근교 (Day trip)", color: "#7a4fa3" },
};

export const SPOTS: Record<string, Spot> = {
  fuhang:     { cat: "food",  ll: [25.0442, 121.5250], label: "푸항또우장",   name: "🥯 푸항또우장", zh: "阜杭豆漿", area: "산다오쓰역", desc: "대만식 아침 — 또우장+샤오빙. 새벽~12:30, 월 휴무. 오픈런 추천" },
  dintaifung: { cat: "food",  ll: [25.0333, 121.5288], label: "딘타이펑",     name: "🥟 딘타이펑 신생점", zh: "鼎泰豐 新生店", area: "융캉제 근처", desc: "샤오롱바오 원조. 대기 길어서 태블릿 번호표 먼저 뽑고 융캉제 구경" },
  beefnoodle: { cat: "food",  ll: [25.0344, 121.5300], label: "융캉우육면",   name: "🍜 융캉우육면", zh: "永康牛肉麵", area: "융캉제", desc: "홍샤오 우육면 대표 맛집. 점심시간 웨이팅 있음" },
  smoothie:   { cat: "food",  ll: [25.0329, 121.5297], label: "망고빙수",     name: "🥭 스무디하우스", zh: "思慕昔", area: "융캉제", desc: "융캉제 빙수 — 늦가을엔 애플망고 대신 딸기/계절 빙수일 수 있음" },
  azong:      { cat: "food",  ll: [25.0424, 121.5077], label: "아종면선",     name: "🍲 아종면선", zh: "阿宗麵線", area: "시먼딩", desc: "곱창 국수 — 서서 먹는 시먼딩 명물. 줄 금방 빠짐" },
  hotpot:     { cat: "food",  ll: [25.0442, 121.5078], label: "훠궈",         name: "🍲 훠궈 (우라오궈 등)", zh: "無老鍋", area: "시먼딩 등", desc: "인기 체인은 예약 추천. 마라+백탕 반반 국물" },
  ahgan:      { cat: "food",  ll: [25.1089, 121.8437], label: "아간이 토란볼", name: "🍡 아간이 위위안", zh: "阿柑姨芋圓", area: "지우펀", desc: "바다뷰 보며 먹는 따뜻한 토란볼 디저트" },

  ningxia:    { cat: "night", ll: [25.0570, 121.5155], label: "닝샤 야시장",   name: "🌙 닝샤 야시장", zh: "寧夏夜市", area: "중산역 근처", desc: "규모는 작지만 먹거리 밀도 최고 — 도착 첫날 밤 추천. 굴전·닭튀김" },
  shilin:     { cat: "night", ll: [25.0880, 121.5240], label: "스린 야시장",   name: "🌙 스린 야시장", zh: "士林夜市", area: "젠탄역", desc: "타이베이 최대 야시장. 지하 미식구+왕훙 닭갈비튀김" },
  raohe:      { cat: "night", ll: [25.0509, 121.5773], label: "라오허제 야시장", name: "🌙 라오허제 야시장", zh: "饒河街夜市", area: "송산역", desc: "입구 후추빵(胡椒餅)이 시그니처. 송산문창원구랑 묶기 좋음" },
  tonghua:    { cat: "night", ll: [25.0302, 121.5537], label: "통화 야시장",   name: "🌙 통화(린장제) 야시장", zh: "臨江街夜市", area: "101 근처", desc: "관광객 적은 로컬 야시장 — 101·샹산과 가까워서 야경 후 마무리로" },

  t101:       { cat: "sight", ll: [25.0339, 121.5645], label: "타이베이101",  name: "🏙 타이베이 101", zh: "台北101", area: "신이지구", desc: "전망대(보통 10:00~21:00, 변동) + 지하 딘타이펑·푸드코트" },
  xiangshan:  { cat: "sight", ll: [25.0273, 121.5716], label: "샹산 전망대",  name: "⛰ 샹산 전망대", zh: "象山", area: "샹산역", desc: "101 야경 최고 명당. 등산 20~30분 — 일몰(약 17:10) 40분 전 출발" },
  cks:        { cat: "sight", ll: [25.0347, 121.5216], label: "중정기념당",   name: "🏛 중정기념당", zh: "中正紀念堂", area: "CKS역", desc: "매 정시 위병 교대식. 광장 스케일이 압도적" },
  longshan:   { cat: "sight", ll: [25.0372, 121.4999], label: "용산사",       name: "⛩ 용산사", zh: "龍山寺", area: "룽산쓰역", desc: "타이베이 대표 사원 — 참배 방식 안내판 있음. 시먼딩과 한 정거장" },
  gugong:     { cat: "sight", ll: [25.1024, 121.5485], label: "고궁박물원",   name: "🏺 국립고궁박물원", zh: "國立故宮博物院", area: "스린", desc: "취옥백채·동파육 — 세계 4대 박물관. 09:00~17:00, 휴관일 확인" },
  ximen:      { cat: "sight", ll: [25.0421, 121.5071], label: "시먼딩",       name: "🛍 시먼딩", zh: "西門町", area: "시먼역", desc: "타이베이의 명동 — 쇼핑+길거리 음식+영화거리" },
  huashan:    { cat: "sight", ll: [25.0441, 121.5295], label: "화산1914",     name: "🎨 화산1914 문창원구", zh: "華山1914", area: "중샤오신성", desc: "양조장 개조 문화단지 — 전시·소품샵·감성 사진" },
  songshan:   { cat: "sight", ll: [25.0435, 121.5606], label: "송산문창원구", name: "📚 송산문창원구", zh: "松山文創園區", area: "국부기념관역", desc: "담배공장 개조 단지 + 청핀서점. 라오허제랑 묶기 좋음" },
  danshui:    { cat: "sight", ll: [25.1677, 121.4406], label: "단수이",       name: "🌅 단수이", zh: "淡水", area: "단수이역(MRT 종점)", desc: "라오제 먹거리+강변 석양 명소 — 일몰 시간 맞춰서. 철판 오징어·큰 아이스크림" },
  beitou:     { cat: "sight", ll: [25.1367, 121.5115], label: "베이터우 온천", name: "♨️ 베이터우 온천", zh: "北投溫泉", area: "신베이터우역", desc: "지열곡(유황 계곡) 산책 + 온천. 수건 대여되는 대중탕/호텔탕" },
  dihua:      { cat: "sight", ll: [25.0555, 121.5100], label: "디화제",       name: "🏮 디화제 (다다오청)", zh: "迪化街", area: "베이먼역", desc: "100년 옛거리 — 한약방·건어물·누가크래커·기념품. 다다오청 부두 노을도 명소" },
  sunyatsen:  { cat: "sight", ll: [25.0400, 121.5601], label: "국부기념관",   name: "🏛 국부기념관", zh: "國父紀念館", area: "국부기념관역", desc: "매 정시 위병 교대식 + 101이 제일 예쁘게 나오는 포토스팟" },
  bopiliao:   { cat: "sight", ll: [25.0369, 121.5021], label: "보피랴오",     name: "🧱 보피랴오 역사거리", zh: "剝皮寮", area: "용산사 옆", desc: "청나라~일제시대 붉은 벽돌 골목 — 레트로 사진 명소. 용산사와 세트" },
  daan:       { cat: "sight", ll: [25.0264, 121.5361], label: "다안삼림공원", name: "🌳 다안삼림공원", zh: "大安森林公園", area: "다안공원역", desc: "타이베이의 센트럴파크 — 융캉제 옆이라 식후 산책 코스로" },

  fikafika:   { cat: "cafe",  ll: [25.0510, 121.5334], label: "Fika Fika",    name: "☕ Fika Fika Cafe", zh: "伊通街", area: "쑹장난징역", desc: "북유럽 감성 로스터리 — 라떼 대회 우승 출신" },
  chun:       { cat: "cafe",  ll: [25.0343, 121.5215], label: "춘수당",       name: "🧋 춘수당", zh: "春水堂", area: "지점 많음", desc: "버블 밀크티 원조 브랜드 — 중정기념당점 등 시내 곳곳" },
  amei:       { cat: "cafe",  ll: [25.1093, 121.8443], label: "아메이차루",   name: "🏮 아메이차루", zh: "阿妹茶樓", area: "지우펀", desc: "홍등 찻집 — 지우펀 야경의 그 장면. 다구 세트로 우롱차" },
  maokong:    { cat: "cafe",  ll: [24.9685, 121.5860], label: "마오콩",       name: "🚡 마오콩 곤돌라+찻집", zh: "貓空", area: "타이베이 동물원역", desc: "곤돌라(크리스탈 캐빈) 타고 산 위 찻집 — 시내 전망. 월 휴무 잦음" },

  yehliu:     { cat: "trip",  ll: [25.2065, 121.6905], label: "예류지질공원", name: "🪨 예류지질공원", zh: "野柳地質公園", area: "신베이 완리", desc: "여왕머리 바위 — 보통 08:00~17:00. 바람 강하니 겉옷. 예스진지의 '예'" },
  shifen:     { cat: "trip",  ll: [25.0412, 121.7757], label: "스펀",         name: "🎈 스펀 라오제", zh: "十分老街", area: "핑시선", desc: "기찻길 옆에서 천등 날리기 — 소원 4면에 쓰기. 예스진지의 '스'" },
  shifenfalls:{ cat: "trip",  ll: [25.0480, 121.7840], label: "스펀폭포",     name: "💦 스펀폭포", zh: "十分大瀑布", area: "스펀 라오제서 도보 20분", desc: "'대만의 나이아가라' — 라오제랑 묶어서. 폐장 시간(16:30~18:00, 계절 변동) 확인" },
  jinguashi:  { cat: "trip",  ll: [25.1080, 121.8575], label: "진과스",       name: "⛏ 진과스 황금박물관", zh: "金瓜石 黃金博物館", area: "지우펀 옆 산자락", desc: "일제강점기 금광촌 — 갱도 체험·대형 금괴 만지기. 예스진지의 '진'. 월 휴무 여부 확인" },
  jiufen:     { cat: "trip",  ll: [25.1097, 121.8443], label: "지우펀",       name: "🏮 지우펀 라오제", zh: "九份老街", area: "루이팡", desc: "홍등 골목 — 점등되는 해질녘(17시 전후)에 맞춰 도착. 예스진지의 '지'. 땅콩 아이스크림롤" },
  houtong:    { cat: "trip",  ll: [25.0872, 121.8274], label: "허우통 고양이마을", name: "🐱 허우통 고양이마을", zh: "猴硐貓村", area: "핑시선 환승역", desc: "폐광촌이 고양이 마을로 — 스펀 가는 핑시선에서 잠깐 내려 들르기 좋음" },
  keelung:    { cat: "trip",  ll: [25.1283, 121.7432], label: "지룽 먀오커우", name: "⛩ 지룽 먀오커우 야시장", zh: "基隆廟口夜市", area: "지룽 (예류에서 20분)", desc: "항구도시 야시장 — 게살스프·딴딴면·버터게. 예류와 묶기 좋음" },
  wulai:      { cat: "trip",  ll: [24.8641, 121.5507], label: "우라이",       name: "♨️ 우라이 온천마을", zh: "烏來", area: "타이베이 남쪽 40분", desc: "온천+폭포+타이야족 라오제. 트롤리 열차 타고 폭포까지 — 북부 근교와 반대 방향이라 별도 날 추천" },
  yangmingshan:{ cat: "trip", ll: [25.1725, 121.5465], label: "양명산",       name: "🌋 양명산 국립공원", zh: "陽明山 小油坑", area: "타이베이 북쪽", desc: "샤오유컹 유황 분화구·억새 — 10~11월이 억새 시즌. 버스로 접근, 안개 잦음" },
};

export interface DayMeta {
  d: string;
  dt: string;
  note: string;
}

export const DAY_META: DayMeta[] = [
  { d: "Day 1", dt: "10/30 금", note: "✈️ 18:10 타오위안 도착 → 공항철도(약 40분) → 호텔 체크인 → 늦은 저녁은 야시장에서!" },
  { d: "Day 2", dt: "10/31 토", note: "시내 풀데이 — 아침은 오픈런, 일몰(약 17:10) 시간에 샹산 타이밍 맞추기" },
  { d: "Day 3", dt: "11/1 일",  note: "🚌 예스진지 데이 — 예류→스펀→진과스→지우펀 순서, 지우펀은 해질녘 도착이 포인트. 셔틀투어/택시 대절 추천" },
  { d: "Day 4", dt: "11/2 월",  note: "온천·박물관은 월요일 휴무 여부 확인! 저녁은 단수이 석양 → 야시장 마무리" },
  { d: "Day 5", dt: "11/3 화",  note: "🛫 12:25 출발 — 체크아웃 후 늦어도 09:30엔 공항으로. 아침은 호텔 근처에서 가볍게" },
];

export const DEFAULT_DAYS: string[][] = [
  ["ningxia"],
  ["fuhang", "cks", "dintaifung", "smoothie", "xiangshan", "t101", "raohe"],
  ["yehliu", "shifen", "jinguashi", "jiufen", "amei", "azong"],
  ["beitou", "gugong", "danshui", "shilin"],
  [],
];

/** legacy taiwan.html과 동일한 키 — 기존 방문자의 커스텀 일정 유지 */
export const STORAGE_KEY = "taiwan-plan-v1";

export function googleMapsUrl(spot: Spot): string {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(spot.zh + " " + spot.label)
  );
}

/** 일정 → URL 공유용 문자열 (day는 콤마, 일차 구분은 물결) */
export function encodeDays(days: string[][]): string {
  return days.map((a) => a.join(",")).join("~");
}

/** URL 파라미터 → 일정. 형식이 어긋나면 null (모르는 스팟 id는 걸러냄) */
export function decodeDays(raw: string): string[][] | null {
  const parts = raw.split("~");
  if (parts.length !== DEFAULT_DAYS.length) return null;
  return parts.map((p) =>
    p === "" ? [] : p.split(",").filter((id) => SPOTS[id])
  );
}
