<script setup lang="ts">
import { RouterLink } from 'vue-router';
const links = [
  { to: '/', text: 'Главная' },
  { to: '/foo', text: 'Страница Foo' },
  { to: '/bar', text: 'Страница Bar' },
  { to: '/login', text: 'Вход' },
  { to: '/login?from=/foo', text: 'Вход /login?from=/foo' },
  { to: '/login?from=/bar', text: 'Вход /login?from=/bar' },
  { to: '/register', text: 'Регистрация' },
]

</script>
<template>
  <nav class="nav">
    <component v-for="link in links" :key="link.to" :is="link.to ? RouterLink : 'a'" :to="link.to" :href="link.href" class="nav__link">
      {{ link.text }}
    </component>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-inline-start: var(--spacing-large);
  font-size: var(--font-size-control);
}

.nav__link {
  position: relative;
  display: inline-flex;
  padding: 0 var(--spacing-base);
  color: var(--color-text);
  text-decoration: none;

  &:hover {
    color: var(--color-text-primary);
  }

  &:before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    inset-block-start: 50%;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    background-color: var(--color-primary-element-light);
    transform: translate(-2px, -50%);
  }
}

@media (min-width: 768px) {
  .nav {
    flex-direction: row;
    align-items: center;
    margin-inline-start: 0;
  }

  .nav__link:first-child:before {
    display: none;
  }
}
</style>
