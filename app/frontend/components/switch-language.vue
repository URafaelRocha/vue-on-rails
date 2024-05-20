<template>
  <v-select
    v-model="selectedLanguage"
    :items="options"
    variant="underlined"
    item-title="label"
    item-value="value"
    @change="changeLanguage"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SwitchLanguage',
  props: {
    value: {
      type: String,
      required: true
    },
  },
  emits: ['confirm'],
  setup(props, { emit }) {
    const selectedLanguage = ref(props.value);
    const options = [
      {
        label: 'Português - BR',
        value: 'pt-BR'
      },
      {
        label: 'English - US',
        value: 'en-US'
      }
    ];

    const changeLanguage = () => {
      emit('confirm', selectedLanguage.value);
    };

    return {
      options,
      selectedLanguage,
      changeLanguage
    };
  }
});
</script>
