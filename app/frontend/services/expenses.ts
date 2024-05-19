import { reactive } from 'vue';
import { api } from '../boot/axios';
import { URI } from '../enums/routes';
import { IExpenses } from '../interfaces';
import { i18nInstance } from '../i18n';

export default class Expenses {
  public data: {
    expenses: IExpenses[];
    dialog: boolean;
    payload: {
      name: string;
      amount: null | number;
      category_id: null | number;
    };
    errorMessage: string;
  } = reactive({
    expenses: [],
    dialog: false,
    payload: {
      name: '',
      amount: null,
      category_id: null,
    },
    errorMessage: '',
  });

  public toggleDialog = () => {
    this.data.dialog = !this.data.dialog;
  };

  public reset = () => {
    this.toggleDialog();
    this.data.payload = {
      name: '',
      amount: null,
      category_id: null
    };
    this.data.errorMessage = '';
  };

  public create = async () => {
    try {
      this.data.errorMessage = '';

      const validationError = this.validatePayload(this.data.payload);
      if (validationError) {
        this.data.errorMessage = validationError;
        return;
      }

      await api.post(URI.EXPENSES, this.data.payload);
      await this.getExpenses();

      this.reset();
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  public edit = async (expenseId: number) => {
    try {
      this.data.errorMessage = '';

      const validationError = this.validatePayload(this.data.payload);
      if (validationError) {
        this.data.errorMessage = validationError;
        return;
      }

      await api.put(`${URI.EXPENSES}/${expenseId}`, this.data.payload);
      await this.getExpenses();

      this.reset();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  public destroy = async (expenseId: number) => {
    try {
      await api.delete(`${URI.EXPENSES}/${expenseId}`);
      await this.getExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  public getExpenses = async () => {
    try {
      const response: { data: IExpenses[] } = await api.get(
        `${URI.EXPENSES}/api`
      );

      this.data.expenses = response.data;
    } catch (error) {
      console.error('Error for getting expenses:', error);
    }
  };

  private validatePayload = (payload: {
    name: string;
    amount: null | number;
    category_id: null | number;
  }) => {
    const trimmedName = payload.name ? payload.name.trim() : '';

    if (!trimmedName && !payload.amount && !payload.category_id) {
      return i18nInstance.global.t('expense.errors.noNameColorAndCategory');
    }

    if (!trimmedName) {
      return i18nInstance.global.t('expense.errors.noName');
    }

    if (!payload.amount || payload.amount <= 0) {
      return i18nInstance.global.t('expense.errors.noAmount');
    }

    if (!payload.category_id) {
      return i18nInstance.global.t('expense.errors.noCategory');
    }

    return '';
  };
}

export const expensesService = new Expenses();
