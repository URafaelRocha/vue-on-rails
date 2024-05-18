import { reactive } from 'vue';
import { api } from '../boot/axios';
import { isValidHexColor } from '../utils/validations';
import { URI } from '../enums/routes';
import { ICategory } from '../interfaces';

export default class Categories {
  public data: {
    categories: ICategory[],
    dialog: boolean,
    errorMessage: string,
    payload: {
      name: string,
      color: string
    }
    currentCategoryId: number
  } = reactive({
    categories: [],
    dialog: false,
    errorMessage: '',
    payload: {
      name: '',
      color: '',
    },
    currentCategoryId: 0
  });

  public reset =  () => {
    this.data.dialog = false;
    this.data.payload = { name: '', color: '' };
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
    if (!payload.name && !payload.color) {
      return 'Please fill in the name and color.';
    }

    if (!payload.name) {
      return 'Please fill in the name.';
    }

    if (!payload.color) {
      return 'Please fill in the color.';
    }

    if (!isValidHexColor(payload.color)) {
      return 'Please enter a valid hexadecimal color.';
    }

    return '';
  }
}

export const categoriesService = new Categories();
