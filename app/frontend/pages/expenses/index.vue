<template>
  <div
    class="d-flex ga-3 flex-column w-100"
  >
    <div class="d-flex align-center justify-space-between w-100">
      <span class="text-h4 font-weight-medium ml-4">{{ $t('expense.name') }}</span>

      <v-btn
        icon="mdi-plus"
        class="mr-7"
        v-tooltip="'New Expense'"
        @click="toggleDialog"
      />
    </div>

    <div v-if="expenses.length">
      <div v-for="expense in expenses" :key="expense.id" class="pa-4">
        <v-card variant="tonal" :color="expense.category.color" class="w-100">
          <template v-slot:title>
            {{ expense.name }}
          </template>
  
          <template v-slot:subtitle>
          {{ expense.amount }}
          </template>
        </v-card>
      </div>
    </div>

    <div v-else class="text-center pt-2 w-100">
      No expense found
    </div>

    <ExpenseDialog
      :show="data.dialog"
      title="New Expense"
      @cancel="toggleDialog"
      @confirm="confirm"
    >
      <template #content>
        <v-card-text>
          <v-alert
            v-if="data.errorMessage"
            type="error"
            dismissible
            class="mb-4"
          >
            {{ data.errorMessage }}
          </v-alert>

          <v-select
            v-model="data.payload.category_id"
            :items="data.categories"
            item-title="name"
            item-value="id"
            label="Select category"
            single-line
          ></v-select>

          <v-text-field
            v-model="data.payload.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.payload.amount"
            label="Amount"
            required
          ></v-text-field>
        </v-card-text>
      </template>
    </ExpenseDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onBeforeMount } from 'vue';

import Dialog from '../../components/dialog.vue';

import { ICategory, IExpenses } from '../../interfaces';

export default defineComponent({
  name: 'Expenses',
  components: {
    ExpenseDialog: Dialog,
  },
  props: {
    expenses: {
      type: [] as PropType<IExpenses[]>,
      required: true
    },
  },
  setup(props) {
    const data: {
      expenses: IExpenses[],
      categories: ICategory[],
      dialog: boolean,
      payload: {
        name: string,
        amount: number,
        category_id: null | number
      },
      errorMessage: string
    } = reactive({
      expenses: [],
      categories: [],
      dialog: false,
      payload: {
        name: '',
        amount: 0,
        category_id: null
      },
      errorMessage: ''
    });

    function toggleDialog() {
      data.dialog = !data.dialog;
    }

    function confirm() {
      console.log(data.payload)
    }

    onBeforeMount(() => {
      // set initial expenses
      data.expenses = props.expenses;

      // set current expanses
      data.expenses.forEach((expense) => {
        const categoryExists = data.categories.some(category => category.id === expense.category.id);

        if (!categoryExists) data.categories.push(expense.category);
      });
    });

    return {
      data,

      // methods
      toggleDialog,
      open,
      confirm
    }
  }
});
</script>
