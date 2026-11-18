// M4-002/003: tìm địa điểm thật qua OpenStreetMap (Nominatim).
//
// Gọi TRỰC TIẾP từ app (không qua Supabase Edge Function) — khác với kế
// hoạch ban đầu trong docs/API_INTEGRATION_SPEC.md mục 6. Lý do (xem
// PROGRESS.md mục 12): đã deploy Edge Function `supabase/functions/places-search`
// và test thật, nhưng Nominatim trả về 403 khi gọi từ hạ tầng server của
// Supabase (chặn IP cloud/datacenter theo chính sách chống lạm dụng) —
// trong khi gọi được bình thường từ máy khác. Gọi trực tiếp từ điện thoại
// (IP mạng di động/Wi-Fi thông thường) không gặp vấn đề này.
//
// Việc này an toàn vì Nominatim KHÔNG cần API key bí mật — lý do kiến trúc
// gốc bắt mobile app không gọi trực tiếp dịch vụ bên thứ ba chỉ áp dụng
// cho dịch vụ cần secret (Google Places cần key trả phí); Nominatim không
// có secret nào để lộ.
//
// Chính sách dùng của Nominatim: tối đa 1 request/giây, phải có User-Agent
// nhận diện ứng dụng, không dùng cho mục đích bulk/scrape — phù hợp với
// cách dùng debounce 600ms của app (xem explore.tsx).

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT_HEADER_VALUE = 'OurDateApp/1.0 (couples date-planning app)';

const MIN_RADIUS_M = 100;
const MAX_RADIUS_M = 20000;
const MAX_QUERY_LENGTH = 100;
const MAX_RESULTS = 20;

export type PlaceResult = {
  provider: 'openstreetmap';
  placeId: string;
  name: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  openingHours: string | null;
  phone: string | null;
};

type SearchParams = {
  query?: string;
  category?: string;
  latitude: number;
  longitude: number;
  radiusM: number;
};

function validateParams(params: SearchParams): { searchTerm?: string; error?: string } {
  const { latitude, longitude, radiusM } = params;
  if (
    typeof latitude !== 'number' ||
    typeof longitude !== 'number' ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return { error: 'Vị trí không hợp lệ.' };
  }
  if (typeof radiusM !== 'number' || radiusM < MIN_RADIUS_M || radiusM > MAX_RADIUS_M) {
    return { error: 'Bán kính tìm kiếm không hợp lệ.' };
  }
  const query = (params.query ?? '').trim();
  const category = (params.category ?? '').trim();
  const searchTerm = query || category;
  if (!searchTerm) {
    return { error: 'Vui lòng nhập từ khoá hoặc chọn danh mục.' };
  }
  if (searchTerm.length > MAX_QUERY_LENGTH) {
    return { error: 'Từ khoá tìm kiếm quá dài.' };
  }
  return { searchTerm };
}

// 1 độ vĩ độ xấp xỉ 111320m; độ dài 1 độ kinh độ phụ thuộc vĩ độ.
function computeViewbox(latitude: number, longitude: number, radiusM: number) {
  const latDelta = radiusM / 111320;
  const lonDelta = radiusM / (111320 * Math.cos((latitude * Math.PI) / 180) || 1);
  return `${longitude - lonDelta},${latitude + latDelta},${longitude + lonDelta},${latitude - latDelta}`;
}

function normalizePlace(raw: Record<string, unknown>): PlaceResult {
  const extratags = (raw.extratags ?? {}) as Record<string, string>;
  return {
    provider: 'openstreetmap',
    placeId: `${raw.osm_type}/${raw.osm_id}`,
    // Một số địa điểm OSM không có tag `name` (name là chuỗi rỗng, không
    // phải undefined) — dùng `||` để fallback đúng sang địa chỉ đầy đủ.
    name: String(raw.name || raw.display_name || ''),
    formattedAddress: String(raw.display_name ?? ''),
    latitude: Number(raw.lat),
    longitude: Number(raw.lon),
    openingHours: typeof extratags.opening_hours === 'string' ? extratags.opening_hours : null,
    phone: typeof extratags.phone === 'string' ? extratags.phone : null,
  };
}

export async function searchPlaces(params: SearchParams): Promise<{ items?: PlaceResult[]; error?: string }> {
  const { searchTerm, error: validationError } = validateParams(params);
  if (validationError || !searchTerm) {
    return { error: validationError ?? 'Yêu cầu tìm kiếm không hợp lệ.' };
  }

  const viewbox = computeViewbox(params.latitude, params.longitude, params.radiusM);
  const url = new URL(NOMINATIM_BASE_URL);
  url.searchParams.set('q', searchTerm);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('viewbox', viewbox);
  url.searchParams.set('bounded', '1');
  url.searchParams.set('extratags', '1');
  url.searchParams.set('limit', String(MAX_RESULTS));

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: { 'User-Agent': USER_AGENT_HEADER_VALUE, Accept: 'application/json' },
    });
  } catch {
    return { error: 'Không kết nối được tới nguồn dữ liệu địa điểm, vui lòng thử lại.' };
  }

  if (!response.ok) {
    return { error: 'Nguồn dữ liệu địa điểm đang gặp sự cố, vui lòng thử lại sau.' };
  }

  const raw = (await response.json()) as Record<string, unknown>[];
  return { items: raw.map(normalizePlace) };
}
