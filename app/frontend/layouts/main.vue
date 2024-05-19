<template>
  <v-app id="main">
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <iLink
          v-for="resource in data.resources"
          :key="resource.name"
          :href="resource.uri"
          role="navigation"
          class="inertia-link text-default"
        >
          <v-list-item
            :value="resource.name"
            :active="resource.isSelected"
            active-color="primary"
            link
            @click="selectRoute(resource)"
          >
            <template v-slot:prepend>
              <v-icon :icon="resource.icon" />
            </template>
            <v-list-item-title>{{ resource.name }}</v-list-item-title>
          </v-list-item>
        </iLink>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="changeDrawerView"></v-app-bar-nav-icon>

      <v-app-bar-title>{{ $t('product_name') }}</v-app-bar-title>

      <v-btn
        v-tooltip:start="darkTheme ? $t('light_mode') : $t('dark_mode')"
        :icon="darkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        density="compact"
        size="large"
        @click="toggleTheme"
      />
    </v-app-bar>

    <v-main>
      <v-container class="text-default">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  onMounted,
  defineComponent,
  onBeforeMount,
  provide,
  computed,
} from 'vue';

import { useTheme } from 'vuetify';
import { useI18n } from 'vue-i18n';

import { categoriesService } from '../services/categories';
import { expensesService } from '../services/expenses';

import { URI } from '../enums/routes';
import { IResource } from '../interfaces';

export default defineComponent({
  name: 'Main',
  setup() {
    const categories = categoriesService;
    const expenses = expensesService;

    const drawer = ref(true);
    const theme = useTheme();

    const { t } = useI18n();

    const darkTheme = computed(() => theme.global.name.value === 'dark');

    const data: {
      resources: IResource[]
    } = reactive({
      resources: [
        {
          name: t('category.title'),
          uri: URI.CATEGORIES,
          icon: 'mdi-rhombus-split',
          isSelected: false,
        },
        {
          name: t('expense.title'),
          uri: URI.EXPENSES,
          icon: 'mdi-finance',
          isSelected: false,
        },
      ],
    });

    function selectRoute(resource: IResource) {
      const currentResource = data.resources.find(
        ({ name }) => name === resource.name
      );

      if (currentResource) {
        currentResource.isSelected = true;

        data.resources.forEach((res) => {
          if (res !== currentResource) {
            res.isSelected = false;
          }
        });
      }

      // changeDrawerView();
    }

    function toggleTheme() {
      theme.global.name.value = darkTheme.value ? 'light' : 'dark';
    }

    function changeDrawerView() {
      drawer.value = !drawer.value;
    }

    onMounted(() => {
      const uris = [URI.EXPENSES, URI.CATEGORIES];
      const currentPath = window.location.pathname;

      if (uris.includes(currentPath as URI)) {
        const resource = data.resources.find(({ uri }) => uri === currentPath);

        if (resource) selectRoute(resource);
      }
    });

    onBeforeMount(() => {
      provide('categories', categories);
      provide('expenses', expenses);
    });

    return {
      drawer,
      data,
      darkTheme,

      // methods
      selectRoute,
      toggleTheme,
      changeDrawerView,
    };
  },
});
</script>
