<script setup lang="ts">
import { inject } from "vue";

import "./util/background";

import Dock from "./components/dock/index.vue";
import Navigation from "./components/navigation.vue";
import Windows from "./components/windows/index.vue";

const stack: any = inject("stack");
const vfm: any = inject("$vfm");

setTimeout(function () {
  let loader = document.getElementsByClassName("loader")[0] as HTMLElement;
  loader?.parentElement?.removeChild(loader);

  document
    .getElementsByTagName("canvas")[0]
    ?.style.setProperty("display", "block", "important");

  document
    .getElementById("app")
    ?.style.setProperty("display", "block", "important");
}, 3500);

let stackIndex = 0,
  previousStack = "";

stack.on("update", (name: string) => {
  const recent = vfm.openedModals[vfm.openedModals.length - 1];
  if (!recent) return;

  if (recent.props.name == "project")
    if (Date.now() - recent.params.value.last < 150) return;

  if (previousStack == name) return;
  previousStack = name;

  stackIndex += 1;
  vfm.get(name)[0].modalStackIndex.value = stackIndex;
});

stack.on("increase", () => (stackIndex += 1));
stack.on("decrease", () => (stackIndex -= 1));
</script>

<template>
  <Navigation />
  <Windows />
  <Dock />
</template>