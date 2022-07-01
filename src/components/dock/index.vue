<template>
  <div class="dock">
    <Icon icon="about" text="About" @click="$vfm.toggle('about')" />
    <Icon icon="skills" text="Skills" @click="$vfm.toggle('skills')" />
    <Icon icon="portfolio" text="Projects" @click="$vfm.toggle('projects')" />
    <Icon icon="socials" text="Socials" @click="$vfm.toggle('socials')" />
    <Icon icon="email" text="Contact" @click="$vfm.toggle('contact')" />
    <Icon icon="coffee" text="Support" @click="open" />
  </div>
</template>

<script setup lang="ts">
import Icon from "./icon.vue";

function open() {
  window.open("https://www.buymeacoffee.com/nedst");
}
</script>