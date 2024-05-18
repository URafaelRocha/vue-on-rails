<template>
  <v-dialog v-model="show" max-width="600" persistent>
    <v-card>
      <v-toolbar class="justify-space-between">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-btn icon="mdi-close" @click="close" />
      </v-toolbar>

      <slot name="content"></slot>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text="Cancel" variant="plain" @click="close" />
        <v-btn color="primary" text="Save" variant="tonal" @click="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dialog',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  emits: ['cancel', 'confirm'],
  setup(_props, { emit }) {
    function close() {
      emit('cancel');
    }

    function save() {
      emit('confirm');
    }

    return {
      // methods
      close,
      save,
    };
  },
});
</script>
