<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
interface UiLinkProps {
  to?: string | { name: string;};
  href?: string;
  text?: string;
}

const props = defineProps<UiLinkProps>();
// Вместо <span> должен быть <RouterLink> или <a>
// Используйте динамический компонент <component :is="...">
</script>

<template>
  <component :is="props.to ? RouterLink : 'a'" :to="props.to" :href="props.href" class="nav__link">
    <slot/>
  </component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
