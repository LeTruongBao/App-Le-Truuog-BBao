import { Translation, NotificationItem, LinkItem } from './types';

export const TRANSLATIONS: Translation = {
  greeting: {
    en: "Hello, Friend!",
    vi: "Xin chào, bạn!",
    ko: "안녕하세요!",
    zh: "你好，朋友！"
  },
  timelineTitle: {
    en: "Timeline",
    vi: "Lịch trình",
    ko: "타임라인",
    zh: "时间轴"
  },
  viewAll: {
    en: "View All",
    vi: "Xem tất cả",
    ko: "모두 보기",
    zh: "查看全部"
  },
  services: { 
    en: "Services",
    vi: "Dịch vụ",
    ko: "서비스",
    zh: "服务"
  },
  service_visa: { en: "Visa", vi: "Visa", ko: "비자", zh: "签证" },
  service_transport: { en: "Transport", vi: "Giao thông", ko: "교통", zh: "交通" },
  service_wallet: { en: "Pay", vi: "Thanh toán", ko: "결제", zh: "支付" },
  service_medical: { en: "Medical", vi: "Y tế", ko: "의료", zh: "医疗" },
  service_shopping: { en: "Shopping", vi: "Mua sắm", ko: "쇼핑", zh: "购物" },
  service_community: { en: "Community", vi: "Cộng đồng", ko: "커뮤니티", zh: "社区" },
  service_translator: { en: "Translator", vi: "Dịch thuật", ko: "번역", zh: "翻译" },
  service_admin: { en: "Admin", vi: "Hành chính", ko: "행정", zh: "行政" },
  
  officialResponseBtn: {
    en: "Official Notice",
    vi: "Phản hồi từ cơ quan",
    ko: "공공기관 알림",
    zh: "官方通知"
  },
  officialResponseMsg: {
     en: "[Official] Your D-2 Visa extension application (Receipt No. 2023-A-992) is currently under review. Estimated completion: Oct 30.",
     vi: "[Chính thức] Hồ sơ gia hạn Visa D-2 của bạn (Số biên nhận 2023-A-992) đang được thẩm định. Dự kiến hoàn tất: 30/10.",
     ko: "[공지] 귀하의 D-2 비자 연장 신청(접수번호 2023-A-992)이 심사 중입니다. 완료 예정일: 10월 30일.",
     zh: "[官方] 您的 D-2 签证延期申请（收据号 2023-A-992）目前正在审核中。预计完成时间：10月30日。"
  },
  askAnything: {
    en: "Ask anything about living in Korea...",
    vi: "Hỏi bất cứ điều gì về cuộc sống tại Hàn Quốc...",
    ko: "한국 생활에 대해 무엇이든 물어보세요...",
    zh: "询问关于在韩国生活的任何事情..."
  },
  askBot: {
    en: "Ask K-Bot",
    vi: "Hỏi K-Bot",
    ko: "K-Bot에 질문",
    zh: "问 K-Bot"
  }
};

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'visa',
    title: 'D-2 Visa Expiry Warning',
    message: 'Your D-2 Visa expires in 30 days. Click to prepare renewal documents.',
    date: 'Oct 25',
    read: false
  },
  {
    id: '2',
    type: 'bill',
    title: 'Electricity Bill Due',
    message: 'Your KEPCO bill for October is 45,000 KRW.',
    date: 'Oct 24',
    read: false
  },
  {
    id: '3',
    type: 'medical',
    title: 'Dental Appointment',
    message: 'Seoul International Clinic, 10 AM.',
    date: 'Oct 26',
    read: true
  }
];

export const COMMUNITY_LINKS: LinkItem[] = [
  { name: "HiKorea", url: "https://www.hikorea.go.kr", description: { en: "Immigration & Visa Service", vi: "Cổng thông tin Nhập cư & Visa", ko: "출입국/비자 포털", zh: "出入境/签证门户" } },
  { name: "Seoul Global Center", url: "https://global.seoul.go.kr", description: { en: "Support for Foreign Residents", vi: "Trung tâm hỗ trợ người nước ngoài Seoul", ko: "서울글로벌센터", zh: "首尔全球中心" } },
  { name: "Danuri Portal", url: "https://www.liveinkorea.kr", description: { en: "Multicultural Family Support", vi: "Thông tin gia đình đa văn hóa", ko: "다문화가족 지원 포털", zh: "多文化家庭支持" } },
  { name: "VisitKorea", url: "https://english.visitkorea.or.kr", description: { en: "Korea Tourism Organization", vi: "Du lịch & Văn hóa Hàn Quốc", ko: "한국관광공사", zh: "韩国旅游发展局" } },
  { name: "K-Campus", url: "https://kcampus.kr", description: { en: "Student Community", vi: "Cộng đồng sinh viên quốc tế", ko: "유학생 커뮤니티", zh: "留学生社区" } },
  { name: "Craigslist Seoul", url: "https://seoul.craigslist.org", description: { en: "Classifieds, Jobs, Housing", vi: "Rao vặt, việc làm, nhà ở", ko: "벼룩시장, 구인구직", zh: "分类广告, 工作, 住房" } },
];

export const MEDICAL_LINKS: LinkItem[] = [
  { 
    name: "Go Korea Medical", 
    url: "https://go-korea.com/kham-suc-khoe-o-han-quoc/?srsltid=AfmBOoqFkp-TWhMzx-ATYouHXUbyF7oBvB-GWJ3ovBOobK5KzWur8AOG", 
    description: { en: "Comprehensive Checkup Info", vi: "Thông tin khám sức khỏe tổng quát", ko: "종합 건강검진 정보", zh: "综合体检信息" } 
  },
  { 
    name: "Sun Medical Center", 
    url: "https://www.shhosp.co.kr/en/conts/intro/12/17_05.do", 
    description: { en: "International Healthcare Center", vi: "Đặt lịch khám bệnh viện Sun", ko: "국제진료센터 예약", zh: "国际医疗中心预订" } 
  },
  { 
    name: "Severance Hospital", 
    url: "https://sev.severance.healthcare/sev-en/index.do", 
    description: { en: "Top Tier University Hospital", vi: "Bệnh viện đại học hàng đầu", ko: "신촌 세브란스 병원", zh: "延世大学医院" } 
  }
];

export const SHOPPING_LINKS: LinkItem[] = [
  { 
    name: "Coupang", 
    url: "https://www.coupang.com", 
    description: { en: "No.1 E-commerce in Korea", vi: "Mua sắm trực tuyến số 1 Hàn Quốc", ko: "쿠팡", zh: "韩国第一电商" } 
  },
  { 
    name: "Gmarket Global", 
    url: "http://global.gmarket.co.kr", 
    description: { en: "Global Shopping & Shipping", vi: "Mua sắm quốc tế & Ship hàng", ko: "G마켓 글로벌", zh: "Gmarket 全球" } 
  },
  { 
    name: "11st", 
    url: "https://www.11st.co.kr", 
    description: { en: "Popular Shopping Mall", vi: "Sàn thương mại điện tử phổ biến", ko: "11번가", zh: "11街" } 
  },
  { 
    name: "Olive Young", 
    url: "https://global.oliveyoung.com", 
    description: { en: "Cosmetics & Beauty", vi: "Mỹ phẩm & Làm đẹp", ko: "올리브영", zh: "美妆护肤" } 
  }
];

export const ADMIN_LINKS: LinkItem[] = [
  { 
    name: "HiKorea", 
    url: "https://www.hikorea.go.kr", 
    description: { en: "E-Government for Foreigners", vi: "Cổng thông tin chính phủ điện tử", ko: "하이코리아", zh: "外国人电子政务" } 
  },
  { 
    name: "Gov.kr", 
    url: "https://www.gov.kr/portal/main", 
    description: { en: "Government Services Portal", vi: "Cổng dịch vụ công quốc gia", ko: "정부24", zh: "政府服务门户" } 
  },
  { 
    name: "Seoul Global Center", 
    url: "https://global.seoul.go.kr", 
    description: { en: "Administrative Support", vi: "Hỗ trợ thủ tục hành chính Seoul", ko: "서울글로벌센터 행정지원", zh: "首尔全球中心行政支持" } 
  },
  { 
    name: "Korea Immigration", 
    url: "https://www.immigration.go.kr", 
    description: { en: "Immigration Policy", vi: "Cục quản lý xuất nhập cảnh", ko: "출입국외국인정책본부", zh: "出入境管理事务所" } 
  }
];