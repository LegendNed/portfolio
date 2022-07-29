<template>
  <div class="dock">
    <Icon
      v-for="item in items"
      :key="item.text"
      :icon="item.icon"
      :text="item.text"
      :aria-label="item.aria || item.text"
      @click="$vfm.toggle(item.icon)"
      @keyup.enter.space="$vfm.toggle(item.icon)"
    />

    <Icon
      icon="coffee"
      text="Support"
      @click="open"
      @keyup.enter.space="open"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Icon from "./icon.vue";

const items = ref([
  { icon: "about", text: "About" },
  { icon: "skills", text: "Skills" },
  { icon: "projects", text: "Projects" },
  { icon: "socials", text: "Socials" },
  { icon: "contact", text: "Contact", aria: "Contact form" },
]);

function open() {
  window.open("https://www.buymeacoffee.com/nedst");
}
</script>