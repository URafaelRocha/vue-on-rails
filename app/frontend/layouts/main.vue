<template>
  <v-app id="main">
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <iLink
          v-for="resource in data.resources"
          :key="resource.name"
          :href="resource.uri"
          role="navigation"
          class="inertia-link"
        >
          <v-list-item
            :value="resource.name"
            :active="resource.isSelected"
            color="primary"
            class="text-white"
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
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { ref, reactive, onMounted, defineComponent } from 'vue';
  import { URI } from '../enums/routes';
  import { IResource } from '../interfaces';

  export default defineComponent({
    name: 'Main',
    setup() {
      const drawer = ref(null);

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

        // methods
        selectRoute
      };
    },
  });
</script>
