/**
 * DỮ LIỆU MẪU — KHÔNG PHẢI DỮ LIỆU THẬT.
 *
 * Toàn bộ nội dung trong file này là dữ liệu demo để dựng giao diện ở Milestone 1.
 * Không có địa điểm, thời gian di chuyển, hoặc lịch trình nào ở đây là thật.
 * Các màn hình dùng dữ liệu này phải tự hiển thị rõ nhãn "Dữ liệu mẫu" cho người dùng.
 * Sẽ được thay bằng dữ liệu thật từ Supabase/Google Places ở Milestone 2+.
 */

export type MockPlace = {
  id: string;
  name: string;
  category: string;
  address: string;
  distanceKm: number;
};

export type MockItinerary = {
  id: string;
  title: string;
  date: string;
  status: 'planned' | 'completed' | 'cancelled';
  stopCount: number;
};

export type MockMemory = {
  id: string;
  title: string;
  date: string;
  note: string;
};

export const MOCK_DATA_LABEL = 'Dữ liệu mẫu';

export const mockUpcomingItinerary: MockItinerary | null = {
  id: 'demo-itinerary-1',
  title: 'Chiều cuối tuần ở phố cổ',
  date: '2026-11-15',
  status: 'planned',
  stopCount: 3,
};

export const mockPlaces: MockPlace[] = [
  {
    id: 'demo-place-1',
    name: 'Quán cà phê ven hồ (mẫu)',
    category: 'Cà phê',
    address: 'Khu vực Hồ Tây, Hà Nội (mẫu)',
    distanceKm: 2.4,
  },
  {
    id: 'demo-place-2',
    name: 'Nhà hàng món Việt (mẫu)',
    category: 'Ẩm thực',
    address: 'Khu phố cổ, Hà Nội (mẫu)',
    distanceKm: 4.1,
  },
  {
    id: 'demo-place-3',
    name: 'Phòng tranh nghệ thuật (mẫu)',
    category: 'Vui chơi',
    address: 'Quận Hoàn Kiếm, Hà Nội (mẫu)',
    distanceKm: 3.6,
  },
  {
    id: 'demo-place-4',
    name: 'Rạp chiếu phim trung tâm (mẫu)',
    category: 'Giải trí',
    address: 'Quận Ba Đình, Hà Nội (mẫu)',
    distanceKm: 5.2,
  },
];

export const mockItineraries: MockItinerary[] = [
  mockUpcomingItinerary,
  {
    id: 'demo-itinerary-2',
    title: 'Tối xem phim và ăn lẩu',
    date: '2026-10-28',
    status: 'completed',
    stopCount: 2,
  },
  {
    id: 'demo-itinerary-3',
    title: 'Dạo phố mùa thu',
    date: '2026-10-12',
    status: 'completed',
    stopCount: 4,
  },
  {
    id: 'demo-itinerary-4',
    title: 'Cà phê buổi sáng',
    date: '2026-09-30',
    status: 'cancelled',
    stopCount: 1,
  },
];

export const mockMemories: MockMemory[] = [
  {
    id: 'demo-memory-1',
    title: 'Tối xem phim và ăn lẩu',
    date: '2026-10-28',
    note: 'Lần đầu thử món lẩu Thái, rất hợp khẩu vị cả hai (ghi chú mẫu).',
  },
  {
    id: 'demo-memory-2',
    title: 'Dạo phố mùa thu',
    date: '2026-10-12',
    note: 'Trời mát, đi bộ quanh hồ rất thích (ghi chú mẫu).',
  },
];

export const interestOptions = [
  'Ẩm thực',
  'Cà phê',
  'Thiên nhiên',
  'Nghệ thuật',
  'Xem phim',
  'Mua sắm',
  'Vận động nhẹ',
  'Yên tĩnh',
] as const;

export const transportOptions = [
  { value: 'DRIVE', label: 'Ô tô' },
  { value: 'TWO_WHEELER', label: 'Xe máy' },
  { value: 'WALK', label: 'Đi bộ' },
  { value: 'TRANSIT', label: 'Phương tiện công cộng' },
] as const;
