<template>
  <Modal v-model="show" :fullscreen="false" name="about" width="670px">
    <template v-slot:title>About me</template>
    <template v-slot:content>
      <div class="space-between">
        <div class="new-line" ref="content" v-html="text" />
        <div id="about-image">
          <img :src="imgMe" width="250" style="border-radius: 0.4rem" />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import text from "../../assets/windows/about";

import imgMe from "../../assets/images/me.png";

const show = ref(false);

const vfm: any = inject("$vfm");

const content: any = ref(null);
onMounted(() => {
  let clickable = content.value.querySelector("#clickable");

  clickable.addEventListener("click", toggleAbout);
  clickable.addEventListener("keypress", toggleAbout);
});

function toggleAbout(event: any) {
  event.preventDefault();
  console.log(event);
  if (event.key) {
    if (!["Enter", "Space"].includes(event.code)) return;
  }

  vfm.hide("about");
  vfm.show("contact");
}
</script>