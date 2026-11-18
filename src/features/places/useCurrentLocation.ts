import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

type LocationState = {
  latitude: number | null;
  longitude: number | null;
  status: 'loading' | 'granted' | 'denied' | 'error';
  errorMessage?: string;
};

export function useCurrentLocation() {
  const [state, setState] = useState<LocationState>({ latitude: null, longitude: null, status: 'loading' });

  const requestLocation = useCallback(async () => {
    setState((prev) => ({ ...prev, status: 'loading' }));
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setState({
        latitude: null,
        longitude: null,
        status: 'denied',
        errorMessage: 'Cần quyền truy cập vị trí để tìm địa điểm gần bạn.',
      });
      return;
    }
    try {
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        status: 'granted',
      });
    } catch {
      setState({
        latitude: null,
        longitude: null,
        status: 'error',
        errorMessage: 'Không lấy được vị trí hiện tại, vui lòng thử lại.',
      });
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      requestLocation();
    });
  }, [requestLocation]);

  return { ...state, retry: requestLocation };
}
