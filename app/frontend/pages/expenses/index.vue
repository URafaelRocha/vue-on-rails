<template>
  <div class="d-flex ga-3 flex-column w-100">
    <div class="d-flex align-center justify-space-between w-100">
      <span class="text-h4 font-weight-medium ml-4">{{
        $t('expense.title')
      }}</span>

      <v-btn
        icon="mdi-plus"
        class="mr-7"
        v-tooltip="$t('expense.new')"
        @click="expensesService.toggleDialog"
      />
    </div>

    <div v-if="expensesService.data.expenses.length">
      <div
        v-for="expense in expensesService.data.expenses"
        :key="expense.id"
        class="pa-4"
      >
        <v-card
          :title="expense.name"
          :color="expense.category.color"
          class="w-100"
        >
          <template v-slot:subtitle>
            {{ $t('currency_type') }}
            {{ formatAmount([expense]) }}
          </template>

          <template v-slot:append>
            <v-btn
              v-tooltip="$t('category.destroy')"
              icon="mdi-trash-can-outline"
              size="small"
              @click="expensesService.destroy(expense.id)"
            ></v-btn>
          </template>
        </v-card>
      </div>
    </div>

    <div v-else class="text-center pt-2 w-100">{{ $t('expense.no_expense') }}</div>

    <ExpenseDialog
      :show="expensesService.data.dialog"
      :title="$t('expense.new')"
      @cancel="expensesService.toggleDialog"
      @confirm="expensesService.create"
    >
      <template #content>
        <v-card-text>
          <v-alert
            v-if="expensesService.data.errorMessage"
            type="error"
            dismissible
            class="mb-4"
          >
            {{ expensesService.data.errorMessage }}
          </v-alert>

          <v-select
            v-model="expensesService.data.payload.category_id"
            :items="categoriesService.data.categories"
            item-title="name"
            item-value="id"
            :label="$t('expense.select_category')"
            single-line
          ></v-select>

          <v-text-field
            v-model="expensesService.data.payload.name"
            :label="$t('expense.name')"
            required
          ></v-text-field>
          <v-text-field
            v-model="expensesService.data.payload.amount"
            :label="$t('expense.amount')"
            required
          ></v-text-field>
        </v-card-text>
      </template>
    </ExpenseDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onBeforeMount, inject } from 'vue';

import Categories from '../../services/categories';
import Dialog from '../../components/dialog.vue';

import Expenses from '../../services/expenses';

import { formatAmount } from '../../utils/validations';
import { IExpenses } from '../../interfaces';

export default defineComponent({
  name: 'Expenses',
  components: {
    ExpenseDialog: Dialog,
  },
  props: {
    expenses: {
      type: [] as PropType<IExpenses[]>,
      required: true,
    },
  },
  setup(props) {
    const categoriesService = inject('categories') as Categories;
    const expensesService = inject('expenses') as Expenses;

    onBeforeMount(async () => {
      // set current expenses
      expensesService.data.expenses = props.expenses;

      // set current categories
      await categoriesService.getCategories();
    });

    return {
      expensesService,
      categoriesService,

      // methods
      formatAmount,
    };
  },
});
</script>
