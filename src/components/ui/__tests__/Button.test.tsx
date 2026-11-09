import { render, screen } from '@testing-library/react-native';

import { Button } from '../Button';

describe('Button', () => {
  it('renders its label', async () => {
    await render(<Button label="Tạo lịch trình" onPress={() => {}} />);
    expect(screen.getByText('Tạo lịch trình')).toBeTruthy();
  });

  it('shows a spinner instead of the label while loading', async () => {
    await render(<Button label="Tạo lịch trình" loading onPress={() => {}} />);
    expect(screen.queryByText('Tạo lịch trình')).toBeNull();
  });
});
