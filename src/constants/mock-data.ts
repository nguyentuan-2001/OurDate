/**
 * DỮ LIỆU MẪU — KHÔNG PHẢI DỮ LIỆU THẬT.
 *
 * Toàn bộ nội dung trong file này là dữ liệu demo để dựng giao diện.
 * Không có địa điểm, thời gian di chuyển, hoặc lịch trình nào ở đây là thật.
 * Ảnh dùng để dựng UI lấy từ chính mockup do chủ dự án cung cấp (src/UI/*.html).
 * Các màn hình dùng dữ liệu này phải tự hiển thị rõ nhãn "Dữ liệu mẫu" cho người dùng.
 * Sẽ được thay bằng dữ liệu thật từ Supabase/Google Places ở Milestone 2+.
 */

export type MockPlace = {
  id: string;
  name: string;
  category: string;
  address: string;
  distanceKm: number;
  photoUrl: string;
  rating?: number;
  reviewCount?: string;
};

export type MockItinerary = {
  id: string;
  title: string;
  date: string;
  status: 'planned' | 'completed' | 'cancelled';
  stopCount: number;
};

export type MockItineraryStop = {
  id: string;
  time: string;
  name: string;
  category: string;
  durationMinutes: number;
  estimatedCostVnd: number;
  photoUrl: string;
};

export type MockMemory = {
  id: string;
  title: string;
  date: string;
  note: string;
  photoUrls: string[];
};

export const MOCK_DATA_LABEL = 'Dữ liệu mẫu';

export const mockUpcomingItinerary: MockItinerary | null = {
  id: 'demo-itinerary-1',
  title: 'Hẹn hò cuối tuần',
  date: '2026-11-08',
  status: 'planned',
  stopCount: 3,
};

export const mockPlaces: MockPlace[] = [
  {
    id: 'demo-place-1',
    name: 'Café Mây (mẫu)',
    category: 'Café',
    address: 'Khu vực Hồ Tây, Hà Nội (mẫu)',
    distanceKm: 1.2,
    rating: 4.8,
    reviewCount: '1.2k',
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgAjUW5MhPs8nMKCKVPDcKRq3c1x3hsp6_Zi-mHSTrml65VrUpbgG_dCJsz4O1g37--XJZ0ZylQsWdr5xUP-GHz6aVWf-oyvzn91bwcSpII4NQOpG9Etf1cT2Zxdmas2M-U2_dWtN_HSdPKcaItPd49sCCThBM7hQSXU9SlxXuDqzyeeYHuSrI9cvaAw9_VXaR1hOWlBNUZL74X8se7E0CfaaAS14nnVydLctmAEA3',
  },
  {
    id: 'demo-place-2',
    name: 'Nhà hàng Lá (mẫu)',
    category: 'Ẩm thực',
    address: 'Khu phố cổ, Hà Nội (mẫu)',
    distanceKm: 2.1,
    rating: 4.7,
    reviewCount: '890',
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpIDbphVWBrs6I_ejXlnFPWCAX7ajYBdmqhd_hfAFPojbuVNbe_m_pG0t4bSlQjdH3qweUNDKX2pxo50u_iogEuYWe0L7dBmbYe3hnQ1ZmN41LKxhvruxY6oeN8DC1sanDjPm-6r1z9qbBAs9GPV_s3FDTaPpy9CxRfwXGCydp9mgscUf65BxOe41PuyzRRGo7hWVr82UIG4u0dYAfLguE3DQSfDJ4IQtNZW0bHfo7',
  },
  {
    id: 'demo-place-3',
    name: 'Công viên Yên Sở (mẫu)',
    category: 'Đi dạo',
    address: 'Quận Hoàng Mai, Hà Nội (mẫu)',
    distanceKm: 3.8,
    rating: 4.6,
    reviewCount: '3.4k',
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUwOVi39FUjkY3B7fWOikePLUKV35_woAMGfOwGYrWRqzIqE7mUte-zwuOpTDQj4TPZb0Wli3HWckOIowyrrTYwHNpJOSpwfLWN0oYezPFfODrz7HRXQDb32RSqmM8uH4T2BuKauNZ8UHrBBKB7C9f98Wqb22xn55zJrokKgdPNZFADTz6U3iAsniIJHV_XbXzRg2SjtIE-r77cXDp4zd-tGAQ5Lqu_D_f3jAFkt3H',
  },
  {
    id: 'demo-place-4',
    name: 'Rạp chiếu phim trung tâm (mẫu)',
    category: 'Giải trí',
    address: 'Quận Ba Đình, Hà Nội (mẫu)',
    distanceKm: 5.2,
    rating: 4.4,
    reviewCount: '620',
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Nm8NbcVQdEvMEUH66MdymZtf0JrjpnP7IXh4j8mbgDjXO8DvxAJwVeA5bemkRQCBITuka6eykSOIck7dU5Ti45Trd3gQdJzSSHnO9YEgzkKfe9dn0Fi4bb4gDuINP7e7bQf3MGMzR-ecwOYWmT_E-0ycJ-3yLal4IXD52xn-Oe6VaAAvz0G45ryj2lbOOmaYWqqpo2UhSYkIhpOjIj_wT35Ou-o_t4u8qTNg3vi8',
  },
];

/** Chi tiết lịch trình demo cho `mockUpcomingItinerary` — dùng ở màn "Lịch trình gợi ý". */
export const mockItineraryStops: MockItineraryStop[] = [
  {
    id: 'demo-stop-1',
    time: '14:00',
    name: 'Café Gió (mẫu)',
    category: 'Café',
    durationMinutes: 90,
    estimatedCostVnd: 80000,
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3-Ej8H1c_KXKMsfXTxQ7A7uNIHq6kBKBEzIGM7XXmm9mN4-h_j-La0PpO4m75xjfEBTNHd-4F_Q6G7xxpljovB-J1Zu6nIT_NfMTtiV4VPehN7lyvm6uh1IChEW1pfRXR5uREaRHybhTjb4s7W4x2d4VEk_0V0agBxxtrgJaHHNuUeYiPVcjHXobn9zy28jsIowINzIXXhKrTpbzVCyTW2J-3WMf5qxIyhoUgyjvb',
  },
  {
    id: 'demo-stop-2',
    time: '16:00',
    name: 'Bảo tàng Mỹ thuật (mẫu)',
    category: 'Chụp ảnh',
    durationMinutes: 90,
    estimatedCostVnd: 40000,
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPWBN8nZpT4_SUkAn7f9WP0sXsqrdkxmH3IEbUkxtNyUKHuFsWslJnO06i8ZuGZ22OJ9v29v43Qj-6oor2hPWmcOnhps2J9YUwRisvmVFS1iV96HXuBuNWEeGqNYog7IF8evZ8BQwW9cGAD36SxSynHTscmKZtAja4u94UyJ0bihhQSnzhxeBF4c5rs5T2lqjCJxQi-UYcXPm__EXUAq93sdiEQUkfxCuOtCmCcv_2',
  },
  {
    id: 'demo-stop-3',
    time: '18:00',
    name: 'Lẩu nướng Chú Tèo (mẫu)',
    category: 'Ăn tối',
    durationMinutes: 90,
    estimatedCostVnd: 300000,
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC__zerm1ITkBRWdwogQOc2BRU6ERB9tOyEHBr-Qm3MUQa6ezqK-C4AXkXgUHype_qz1rbfZ4_WEWa2tm7Dzw4-Oxpp4q6HatV0Y8M_HPrW7guJYabuE82sT5cl02jr7cRPauFc_LAchWw2oDizBElImGNgWxoYG13Ekko-zk7aBxIZGVs2rYFHrT1-MDonuoaNbsLGwFT7cu4BI5cEYz1UbDJCN3f0tlo4AD2jVER5',
  },
];

export const mockItineraryTotals = {
  estimatedCostVnd: 420000,
  durationHours: 6,
  distanceKm: 12.5,
};

export const mockItineraries: MockItinerary[] = [
  mockUpcomingItinerary,
  {
    id: 'demo-itinerary-2',
    title: 'Đi xem phim',
    date: '2026-11-16',
    status: 'planned',
    stopCount: 1,
  },
  {
    id: 'demo-itinerary-3',
    title: 'Tối xem phim và ăn lẩu',
    date: '2026-10-28',
    status: 'completed',
    stopCount: 2,
  },
  {
    id: 'demo-itinerary-4',
    title: 'Dạo phố mùa thu',
    date: '2026-10-12',
    status: 'completed',
    stopCount: 4,
  },
  {
    id: 'demo-itinerary-5',
    title: 'Cà phê buổi sáng',
    date: '2026-09-30',
    status: 'cancelled',
    stopCount: 1,
  },
];

export const mockMemories: MockMemory[] = [
  {
    id: 'demo-memory-1',
    title: 'Hẹn hò cuối tuần',
    date: '2026-11-08',
    note: 'Lần đầu thử latte hình trái tim ở Café Gió, cả hai đều thích (ghi chú mẫu).',
    photoUrls: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKNCjapstsJEc6MRR2xS8fIQaixkjfHEkAFs5PyMC8MM0ihaSIUSdjXNYc1Tw2YD8XJDtK_qcVT9c38-mubQVz6TYQ8QAJ6aPzzpii-NH2Pw3XHCzXvGIuBZYMi_ltj6yQYEvwwTXfpBg4AszyM6MmhVlULgaXpq1ZTweWVZhDcGbClcv3qiBG9Vvuc7WsMfz3SUOBrhh9BSMD8RF-Q8kRhCcK1UMwEKy3pXnzsmkU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKrt65U6WXRR07ezFi-ugzpCfQKupt58aL3xb9usWo7UJydPyYpsX1G-sB1O6gofR6YymXdAkuizxyOQhiFPGQpNMTKJoDlJ8tbxWRcHl_QGXMX2ZGJU-E8iKFs5EMgueUwWsSb4nghmZSnZRcvQOXpsIznlZUns6xEbMBGIJcba_8unCLv02LiEnDsj-m8Z1AsN9rDA3jVgDHGduHePsEbdXIO1ILqLYbWyPXId3o',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBnHRxF4VtUdbICr2sjZFatQCKdqNMpnzzsOeFQoueimmmgc9zI7h15TMA7FfOZxvyu2cUAouEUAof2OhhPVT2EA7MnI26PKipjTwHMU-TIpXd9wkXiYCR9i2EI1tZRuEXqSI1yzG8134uRjO9rWxCQCsp7IcnhvgcGF1ADkaU6ouC37K5x-idg3ctxfxSEZYU336vt7GK7uxYzF1eDiH9QO4zPyEtjthKQAGSvKzQA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBiHUQAKzADaZKULTId-WlKIDhTju9wS6NZBlTrO4e7Co9cTHEBhinGFWiA7oFCsD9vrCxD11QIri7pCl5KQuoWmpxP56PmaHWH7A0rK_cTJh7qgaVNEmzGmuslo3xs1Yuoc8uR2L_cBPcVlcrn1hG63-zjnl-JlxcJECXXHqUImu-yoDMHBJ8VsMaNtLhMfh6Zojz2yjTfkHdxPFp5P6_VXE43h2ojcdRRv5bXttsZ',
    ],
  },
  {
    id: 'demo-memory-2',
    title: 'Đi dạo hồ Tây',
    date: '2026-10-26',
    note: 'Trời mát, đi bộ quanh hồ rất thích (ghi chú mẫu).',
    photoUrls: [],
  },
];

export const interestOptions = [
  { value: 'food', label: 'Ăn uống', icon: 'restaurant-outline' },
  { value: 'cafe', label: 'Café', icon: 'cafe-outline' },
  { value: 'photo', label: 'Chụp ảnh', icon: 'camera-outline' },
  { value: 'walk', label: 'Đi dạo', icon: 'walk-outline' },
  { value: 'play', label: 'Vui chơi', icon: 'game-controller-outline' },
  { value: 'movie', label: 'Xem phim', icon: 'film-outline' },
] as const;

export const transportOptions = [
  { value: 'DRIVE', label: 'Ô tô', icon: 'car-outline' },
  { value: 'TWO_WHEELER', label: 'Xe máy', icon: 'bicycle-outline' },
  { value: 'WALK', label: 'Đi bộ', icon: 'walk-outline' },
  { value: 'TRANSIT', label: 'Phương tiện công cộng', icon: 'bus-outline' },
] as const;

export const exploreCategoryOptions = [
  { value: 'cafe', label: 'Café', icon: '☕' },
  { value: 'restaurant', label: 'Nhà hàng', icon: '🍴' },
  { value: 'photo', label: 'Chụp ảnh', icon: '📷' },
  { value: 'play', label: 'Vui chơi', icon: '🪷' },
] as const;
