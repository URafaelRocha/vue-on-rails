<template>
  <v-select
    v-model="selectedLanguage"
    :items="options"
    :max-width="!isMobile ? '240px' : '80px'"
    variant="underlined"
    item-title="label"
    item-value="value"
    @update:modelValue="changeLanguage"
  >
    <template v-slot:item="{ props, item }">
      <v-list-item
        v-bind="props"
        :prepend-avatar="item.raw.icon"
        :title="item.raw.label"
      />
    </template>

    <template v-slot:selection="{ props, item }">
      <v-list-item
        v-bind="props"
        :prepend-avatar="item.raw.icon"
        :title="!isMobile ? item.raw.label : ''"
      />
    </template>
  </v-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SwitchLanguage',
  props: {
    language: {
      type: String,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  emits: ['confirm'],
  setup(props, { emit }) {
    const selectedLanguage = ref(props.language);
    const options = [
      {
        label: 'Português - BR',
        value: 'pt-BR',
        icon: 'https://github.com/URafaelRocha/vue-on-rails/assets/123375924/9bfa4c52-7b89-481c-aad7-7994f599e95d',
      },
      {
        label: 'English - US',
        value: 'en-US',
        icon: 'https://github.com/URafaelRocha/vue-on-rails/assets/123375924/690b7c44-7e76-4a42-a8a1-3c411930192e',
      },
    ];

    const changeLanguage = () => {
      emit('confirm', selectedLanguage.value);
    };

    return {
      options,
      selectedLanguage,
      changeLanguage,
    };
  },
});
</script>
