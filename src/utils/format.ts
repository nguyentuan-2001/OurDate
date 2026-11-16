/** Định dạng số tiền VND với dấu chấm ngăn cách hàng nghìn, không phụ thuộc Intl/ICU của máy. */
export function formatVnd(amount: number): string {
  const rounded = Math.round(amount);
  const digits = Math.abs(rounded).toString();
  const withSeparators = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return rounded < 0 ? `-${withSeparators}` : withSeparators;
}
