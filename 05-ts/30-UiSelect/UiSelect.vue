<script setup lang="ts" generic="T extends string">
import { defineModel } from 'vue';

type Option<V> = {
  text: string;
  value: V;
};

const props = defineProps<{
  options: Option<T>[];
}>();

const model = defineModel<T>();
</script>

<template>
  <select
    class="select"
    v-model="model"
  >
    <option
      v-for="option in props.options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>
</template>
