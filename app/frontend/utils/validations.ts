import { IExpenses } from '../interfaces';

export function isValidHexColor(color: string): boolean {
  const regex = /^#([0-9A-F]{3}){1,2}$/i;
  return regex.test(color);
}

export function formatAmount(expenses: IExpenses[]): string {
  const totalAmount = expenses
    .map(({ amount }) => amount)
    .reduce((acc: number, value: number) => acc + value, 0);

  return totalAmount.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) || '0,00';
}
