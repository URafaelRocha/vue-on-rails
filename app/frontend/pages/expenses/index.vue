<template>
  <div v-for="expense in expenses" :key="expense.id" class="pa-4">
    <v-card variant="tonal">
      <template v-slot:title>
        {{ expense.name }}
      </template>

      <template v-slot:subtitle>
       {{ expense.amount }}
      </template>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { IExpenses } from '../../interfaces';

  export default defineComponent({
    name: 'Expenses',
    props: {
      expenses: {
        type: [] as PropType<IExpenses[]>,
        required: true
      },
    },
    setup() {
      return {}
    }
  })
</script>
