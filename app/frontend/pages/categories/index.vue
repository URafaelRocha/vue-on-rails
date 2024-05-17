<template>
  <div v-for="category in categories" :key="category.id" class="pa-4">
    <v-card :text="category.name" :color="category.color"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { ICategory } from '../../interfaces';

  export default defineComponent({
    name: 'Categories',
    props: {
      categories: {
        type: [] as PropType<ICategory[]>,
        required: true
      },
    },
    setup() {
      return {}
    }
  })
</script>
