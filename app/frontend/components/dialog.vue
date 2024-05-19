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
        <v-btn color="primary" :text="cancelText" variant="plain" @click="close" />
        <v-btn color="primary" :text="okText" variant="tonal" @click="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Dialog',
  props: {
    show: {
      type: Boolean,
      required: true,
      default: ''
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    cancelLabel: {
      type: String,
      required: false
    },
    okLabel: {
      type: String,
      required: false
    }
  },
  emits: ['cancel', 'confirm'],
  setup(props, { emit }) {
    const { t } = useI18n();

    function close() {
      emit('cancel');
    }

    function save() {
      emit('confirm');
    }

    return {
      cancelText: t('dialog.cancel') || props.cancelLabel,
      okText: t('dialog.ok') || props.okLabel,

      // methods
      close,
      save
    };
  },
});
</script>
