import { reactive } from 'vue';
import { api } from '../boot/axios';
import { isValidHexColor } from '../utils/validations';
import { URI } from '../enums/routes';
import { ICategory } from '../interfaces';

import { i18nInstance } from '../i18n';

export default class Categories {
  public data: {
    categories: ICategory[],
    dialog: boolean,
    errorMessage: string,
    payload: {
      name: string,
      color: string
    }
    currentCategoryId: null | number
  } = reactive({
    categories: [],
    dialog: false,
    payload: {
      name: '',
      color: '',
    },
    errorMessage: '',
    currentCategoryId: null
  });

  public toggleDialog = () => {
    this.data.dialog = !this.data.dialog;
  }

  public reset = () => {
    this.toggleDialog();
    this.data.payload = { name: '', color: '' };
    this.data.errorMessage = '';
    this.data.currentCategoryId = null;
  }

  public create = async () => {
    try {
      this.data.errorMessage = '';

      const validationError = this.validatePayload(this.data.payload);
      if (validationError) {
        this.data.errorMessage = validationError;
        return;
      }

      await api.post(URI.CATEGORIES, this.data.payload);
      await this.getCategories();

      this.reset();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  }

  public edit = async (categoryId: number) => {
    try {
      this.data.errorMessage = '';

      const validationError = this.validatePayload(this.data.payload);
      if (validationError) {
        this.data.errorMessage = validationError;
        return;
      }

      await api.put(`${URI.CATEGORIES}/${categoryId}`, this.data.payload);
      await this.getCategories();

      this.reset();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  }

  public destroy = async (categoryId: number) => {
    try {
      await api.delete(`${URI.CATEGORIES}/${categoryId}`);
      await this.getCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }

  public getCategories = async () => {
    try {
      const response: { data: ICategory[] } = await api.get(
        `${URI.CATEGORIES}/api`
      );

      this.data.categories = response.data;
    } catch (error) {
      console.error('Error for getting categories:', error);
    }
  }

  private validatePayload = (payload: {
    name: string;
    color: string;
  }) => {
    const trimmedName = payload.name ? payload.name.trim() : '';
    const trimmedColor = payload.color ? payload.color.trim() : '';

    if (!trimmedName && !trimmedColor) {
      return i18nInstance.global.t('category.errors.noNameAndColor');
    }

    if (!trimmedName) {
      return i18nInstance.global.t('category.errors.noName');
    }

    if (!trimmedColor) {
      return i18nInstance.global.t('category.errors.noColor');
    }

    if (trimmedColor.includes('#') && !isValidHexColor(trimmedColor)) {
      return i18nInstance.global.t('category.errors.invalidHex');
    }

    return '';
  }
}

export const categoriesService = new Categories();
