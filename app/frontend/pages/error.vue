<template>
  <v-row align="center" justify="center" style="height: 100vh">
    <v-col sm="12" md="4" class="text-black">
      <div class="text-h1 mx-auto text-center">{{ title }}</div>
      <div class="text-h1 mx-auto text-center">{{ status }}</div>
      <div class="text-center py-8">{{ description }}</div>
      <div class="text-center">
        <iLink :href="URI.EXPENSES" class="inertia-link" as="v-btn">
          <v-btn variant="text" color="primary">
            Home
          </v-btn>
        </iLink>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { URI } from '../enums/routes';
  // import Layout from "../layouts/minimal.vue";

  // defineOptions({ layout: Layout });

  export default defineComponent({
    name: 'Error',
    props: {
      status: {
        type: Number,
        required: true
      },
    },
    setup(props) {
      const title = computed(() => {
        return {
          200: "200",
          403: "403",
          404: "404",
          500: "500",
          503: "503",
        }[props.status];
      });

      const description = computed(() => {
        return {
          200: "Successfully Request",
          403: "Unauthorized",
          404: "Not found",
          500: "Serever Error",
          503: "Maintenance",
        }[props.status];
      });

      return {
        title,
        description,
        URI
      }
    }
  })
</script>
