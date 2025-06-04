<script setup lang="ts">
import { defineProps, defineSlots } from 'vue'
interface FormGroupProps {
  for?: string;
  label?: string;
  description?: string;
  hint?: string;
  showHint?: boolean;
  invalid?: boolean;
}

const props = defineProps<FormGroupProps>();

defineSlots<{
  label(): void;
  description(): void;
  default(): void;
}>();
</script>

<template>
  <div class="form-group">
    <div class="form-group__label-wrapper">
      <label :for="props.for" class="form-group__label">
        <slot name="label">{{ props.label }}</slot>
      </label>
      <div class="form-group__description">
        <slot name="description">{{ props.description }}</slot>
      </div>
    </div>
    <div class="form-group__control">
      <slot></slot>
    </div>
    <div v-if="props.hint" class="form-group__hint" :class="{ 'form-group__hint--invalid': props.invalid }">
      <span v-if="props.invalid || props.showHint">{{ props.hint }}</span>
    </div>
  </div>
</template>
