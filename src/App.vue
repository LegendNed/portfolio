<script setup lang="ts">
import "./util/background";

import Dock from "./components/dock/index.vue";
import Navigation from "./components/navigation.vue";
import Windows from "./components/windows/index.vue";

setTimeout(function () {
  let loader = document.getElementsByClassName("loader")[0] as HTMLElement;
  loader?.parentElement?.removeChild(loader);

  document
    .getElementsByTagName("canvas")[0]
    .style.setProperty("display", "block", "important");

  document
    .getElementById("app")
    .style.setProperty("display", "block", "important");
}, 3500);
</script>

<template>
  <Navigation />
  <Windows />
  <Dock />
</template>