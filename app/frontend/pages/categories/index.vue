<template>
  <v-btn @click="create" icon="mdi-plus" />

  <div v-for="category in categories" :key="category.id" class="pa-4">
    <v-card :title="category.name" :color="category.color" class="mx-auto">
      <template v-slot:append>
        <v-btn icon="mdi-trash-can-outline" size="small" @click="destroy(category.id)"></v-btn>
      </template>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';
  import { ICategory } from '../../interfaces';
  import { api } from '../../boot/axios';

  export default defineComponent({
    name: 'Categories',
    props: {
      categories: {
        type: Array as PropType<ICategory[]>,
        required: true
      },
    },
    setup(props) {
      const categories = ref<ICategory[]>(props.categories);

      async function create() {
        const payload = {
          name: 'test category',
          color: '#FF0000'
        }

        try {
          await api.post('/categories', payload);
          await getCategories();
        } catch (error) {
          console.error('Error creating category:', error);
        }
      }

      async function destroy(categoryId: number) {
        try {
          await api.delete(`/categories/${categoryId}`);
          await getCategories();
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      }

      async function getCategories() {
        try {
          const response: { data: ICategory[] } = await api.get('/categories/api');
          categories.value = response.data;
        } catch (error) {
          console.error('Error for getting categories:', error);
        }
      }

      return {
        categories,
        create,
        destroy
      }
    }
  })
</script>
