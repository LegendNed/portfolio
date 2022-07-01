<template>
  <div class="dock-icon">
    <img :src="`src/assets/images/${icon}.webp`" />
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
const { icon, text } = defineProps(["icon", "text"]);
</script>