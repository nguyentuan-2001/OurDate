import { render, screen } from '@testing-library/react-native';
import type { ReactElement } from 'react';

import { AuthProvider } from '@/features/auth/AuthProvider';
import { CoupleProvider } from '@/features/couple/CoupleProvider';

import DatesScreen from '../(tabs)/dates';
import ExploreScreen from '../(tabs)/explore';
import HomeScreen from '../(tabs)/index';
import MemoriesScreen from '../(tabs)/memories';
import PlannerScreen from '../(tabs)/planner';
import ItineraryResultScreen from '../itinerary-result';
import CreateCoupleScreen from '../(onboarding)/create-couple';
import OnboardingChoiceScreen from '../(onboarding)/index';
import JoinCoupleScreen from '../(onboarding)/join-couple';

function withProviders(ui: ReactElement) {
  return (
    <AuthProvider>
      <CoupleProvider>{ui}</CoupleProvider>
    </AuthProvider>
  );
}

describe('Screen smoke tests (render without crashing, after UI redesign)', () => {
  it('Home renders key content', async () => {
    await render(withProviders(<HomeScreen />));
    expect(screen.getByText('Our Date ♡')).toBeTruthy();
    expect(screen.getByText('Lên kế hoạch hẹn hò')).toBeTruthy();
  });

  it('Planner renders key content', async () => {
    await render(<PlannerScreen />);
    expect(screen.getByText('AI Date Planner ✨')).toBeTruthy();
    expect(screen.getByText('Tạo lịch trình bằng AI ✨')).toBeTruthy();
  });

  it('ItineraryResult renders key content', async () => {
    await render(<ItineraryResultScreen />);
    expect(screen.getByText('Lịch trình gợi ý ♡')).toBeTruthy();
    expect(screen.getByText('Lưu lịch trình')).toBeTruthy();
  });

  it('Explore renders key content', async () => {
    await render(<ExploreScreen />);
    expect(screen.getByText('Khám phá ♡')).toBeTruthy();
    expect(screen.getByText('Gần bạn nhất')).toBeTruthy();
  });

  it('Dates renders key content', async () => {
    await render(<DatesScreen />);
    expect(screen.getByText('Lịch hẹn ♡')).toBeTruthy();
    expect(screen.getByText('Lịch của chúng ta')).toBeTruthy();
  });

  it('Memories renders key content', async () => {
    await render(<MemoriesScreen />);
    expect(screen.getByText('Kỷ niệm ♡')).toBeTruthy();
    expect(screen.getByText('Timeline')).toBeTruthy();
  });

  it('Onboarding choice renders key content', async () => {
    await render(withProviders(<OnboardingChoiceScreen />));
    expect(screen.getByText('Our Date ♡')).toBeTruthy();
    expect(screen.getByText('Tạo không gian của chúng ta')).toBeTruthy();
    expect(screen.getByText('Tôi có mã mời')).toBeTruthy();
  });

  it('CreateCouple renders key content', async () => {
    await render(withProviders(<CreateCoupleScreen />));
    expect(screen.getByText('Đặt tên không gian ♡')).toBeTruthy();
  });

  it('JoinCouple renders key content', async () => {
    await render(withProviders(<JoinCoupleScreen />));
    expect(screen.getByText('Nhập mã mời ♡')).toBeTruthy();
  });
});
