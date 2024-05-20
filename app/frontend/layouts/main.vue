<template>
  <v-app id="main">
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <iLink
          v-for="resource in data.resources"
          :key="resource.name"
          :href="resource.uri"
          role="navigation"
          class="text-decoration-none text-default"
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

      <SwitchLanguage
        :language="currentLanguage"
        :isMobile="isMobile"
        class="mr-2"
        @confirm="changeLanguage"
      />

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
  ComputedRef
} from 'vue';

import { useTheme } from 'vuetify';
import { useI18n } from 'vue-i18n';

import SwitchLanguage from '../components/switch-language.vue';

import { categoriesService } from '../services/categories';
import { expensesService } from '../services/expenses';

import { URI } from '../enums/routes';
import { IResource, IUserPreferences } from '../interfaces';
import { storageService } from '../services/storage';
import { loggerService } from '../services/logger';

export default defineComponent({
  name: 'Main',
  components: {
    SwitchLanguage,
  },
  setup() {
    const categories = categoriesService;
    const expenses = expensesService;
    const storage = storageService;
    const logger = loggerService;

    const drawer = ref(true);
    const theme = useTheme();

    const { t, locale } = useI18n();

    const isMobile = computed(() => window.innerWidth <= 768);
    const currentLanguage = computed(() => locale.value);
    const currentTheme = computed(() => theme.global.name.value);
    const darkTheme = computed(() => theme.global.name.value === 'dark');

    const userPreferences: ComputedRef<IUserPreferences> = computed(() => storage.getItem('user_preferences'));

    const data: {
      resources: IResource[];
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

      if (isMobile.value) {
        changeDrawerView();
      }
    }

    function toggleTheme() {
      const value = darkTheme.value ? 'light' : 'dark';
      setTheme(value);
    }

    function setTheme(value: string) {
      theme.global.name.value = value;

      const updatedPreferences = {
        theme: value,
        language: currentLanguage.value
      };

      storage.setItem('user_preferences', updatedPreferences);
    }

    function changeLanguage(language: string) {
      locale.value = language;

      data.resources.forEach(resource => {
        if (resource.uri === URI.CATEGORIES) {
          resource.name = t('category.title');
        } else if (resource.uri === URI.EXPENSES) {
          resource.name = t('expense.title');
        }
      });

      const updatedPreferences = {
        theme: currentTheme.value,
        language,
      };

      storage.setItem('user_preferences', updatedPreferences);
    }

    function changeDrawerView() {
      drawer.value = !drawer.value;
    }

    function loadPreferences() {
      // loading default preferences
      if (!userPreferences.value) {
        const defaultPreferences = {
          theme: currentTheme.value,
          language: currentLanguage.value,
        };

        storage.setItem('user_preferences', defaultPreferences);
      } else {
        if (userPreferences.value.theme) setTheme(userPreferences.value.theme);
        if (userPreferences.value.language) changeLanguage(userPreferences.value.language);
      }

      logger.info(`Current theme => ${userPreferences.value.theme}`);
      logger.info(`Current language => ${userPreferences.value.language}`);
    }

    onBeforeMount(() => {
      loadPreferences();

      provide('categories', categories);
      provide('expenses', expenses);
    });

    onMounted(() => {
      const uris = [URI.EXPENSES, URI.CATEGORIES];
      const currentPath = window.location.pathname;

      if (uris.includes(currentPath as URI)) {
        const resource = data.resources.find(({ uri }) => uri === currentPath);

        if (resource) selectRoute(resource);
      }
    });

    return {
      drawer,
      data,
      darkTheme,
      currentLanguage,
      isMobile,

      // methods
      selectRoute,
      toggleTheme,
      changeDrawerView,
      changeLanguage,
    };
  },
});
</script>
