<template>
  <div class="d-flex ga-3 flex-column w-100">
    <div class="d-flex align-center justify-space-between w-100">
      <span class="text-h4 font-weight-medium ml-4">{{
        $t('category.title')
      }}</span>

      <v-btn
        v-tooltip="$t('category.new')"
        icon="mdi-plus"
        class="mr-7"
        @click="open"
      />
    </div>

    <div v-if="categoriesService.data.categories.length" class="w-100">
      <div
        v-for="category in categoriesService.data.categories"
        :key="category.id"
        class="pa-4 w-100"
      >
        <v-card :title="category.name" :color="category.color" class="w-100">
          <template v-slot:subtitle>
            {{ $t('currency_type') }}
            {{ formatAmount(category.expenses) }}
          </template>

          <template v-slot:append>
            <v-btn
              v-tooltip="$t('category.edit')"
              icon="mdi-square-edit-outline"
              size="small"
              class="mr-2"
              @click="open(category)"
            ></v-btn>
            <v-btn
              v-tooltip="$t('category.destroy')"
              icon="mdi-trash-can-outline"
              size="small"
              @click="categoriesService.destroy(category.id)"
            ></v-btn>
          </template>
        </v-card>
      </div>
    </div>

    <div v-else class="text-center pt-2 w-100">{{ $t('category.no_category') }}</div>

    <CategoryDialog
      :show="categoriesService.data.dialog"
      :title="$t('category.new')"
      @cancel="categoriesService.reset"
      @confirm="confirm"
    >
      <template #content>
        <v-card-text>
          <v-alert
            v-if="categoriesService.data.errorMessage"
            type="error"
            dismissible
            class="mb-4"
          >
            {{ categoriesService.data.errorMessage }}
          </v-alert>

          <v-text-field
            v-model="categoriesService.data.payload.name"
            :label="$t('category.name')"
            required
          ></v-text-field>

          <v-text-field
            v-model="categoriesService.data.payload.color"
            :hint="$t('category.hint')"
            :placeholder="$t('category.placeholder')"
            :label="$t('category.color')"
            required
          ></v-text-field>
        </v-card-text>
      </template>
    </CategoryDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, onBeforeMount } from 'vue';

import Categories from '../../services/categories';
import Dialog from '../../components/dialog.vue';

import { ICategory } from '../../interfaces';
import { formatAmount } from '../../utils/validations';

export default defineComponent({
  name: 'Categories',
  components: {
    CategoryDialog: Dialog,
  },
  props: {
    categories: {
      type: Array as PropType<ICategory[]>,
      required: true,
    },
  },
  setup(props) {
    const categoriesService = inject('categories') as Categories;

    function open(category?: ICategory) {
      // edit
      if (category) {
        categoriesService.data.payload.name = category.name;
        categoriesService.data.payload.color = category.color;

        // if has this category id === isEditing
        categoriesService.data.currentCategoryId = category.id;
      }

      categoriesService.toggleDialog();
    }

    async function confirm() {
      if (categoriesService.data.currentCategoryId) {
        await categoriesService.edit(categoriesService.data.currentCategoryId);
      } else {
        await categoriesService.create();
      }
    }

    onBeforeMount(() => {
      // set current categories
      categoriesService.data.categories = props.categories;
    });

    return {
      categoriesService,

      // methods
      open,
      confirm,
      formatAmount,
    };
  },
});
</script>
