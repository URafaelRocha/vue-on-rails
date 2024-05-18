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
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>

      <v-btn
        :icon="theme.global.name.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
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
  import { ref, reactive, onMounted, defineComponent } from 'vue';
  import { URI } from '../enums/routes';
  import { IResource } from '../interfaces';

  import { useTheme } from "vuetify";

  export default defineComponent({
    name: 'Main',
    setup() {
      const drawer = ref(null);
      const theme = useTheme();

      const data: {
        resources: IResource[];
      } = reactive({
        resources: [
          {
            name: 'Expenses',
            uri: URI.EXPENSES,
            icon: 'mdi-finance',
            isSelected: false,
          },
          {
            name: 'Categories',
            uri: URI.CATEGORIES,
            icon: 'mdi-rhombus-split',
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
      }

      function toggleTheme() {
        theme.global.name.value =
          theme.global.name.value === 'dark' ? 'light' : "dark";
      }

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
        theme,

        // methods
        selectRoute,
        toggleTheme
      };
    },
  });
</script>
