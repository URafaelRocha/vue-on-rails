import { IExpenses } from '../interfaces';

export function isValidHexColor(color: string): boolean {
  const regex = /^#([0-9A-F]{3}){1,2}$/i;
  return regex.test(color);
}

export function formatAmount(expenses: IExpenses[]) {
  return expenses
    .map(({ amount }) => amount)
    .reduce((acc: number, value: number) => acc + value, 0)
    .toLocaleString() || 0;
}
