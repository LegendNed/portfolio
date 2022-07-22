<template>
  <div class="dock-icon">
    <img :src="image" />
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { icon, text } = defineProps(["icon", "text"]);

const image: any = new URL(`../../assets/images/${icon}.webp`, import.meta.url);
</script>