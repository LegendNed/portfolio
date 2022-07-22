<template>
  <Modal v-model="show" :fullscreen="false" name="socials" width="280px">
    <template v-slot:title>Social Media</template>
    <template v-slot:content>
      <div
        v-for="item in socials"
        :key="item.name"
        class="space-between"
        style="width: none"
      >
        <div class="socials">
          <div v-if="item.name == 'br'" style="margin-bottom: 10px" />
          <div v-else>
            <img :src="images[item.name]" width="16" />
            <h4>{{ item.name }}</h4>
          </div>
        </div>
        <h4 class="socials">
          <b>
            <a :href="item.href" target="_blank">{{ item.text || "" }}</a>
          </b>
        </h4>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

import socials from "../../assets/windows/socials.json";

const show = ref(false);

let images: any = {};
for (let social of socials) {
  if (social.name == "br") continue;

  let image: any = new URL(
    `../../assets/images/${social.name}.png`,
    import.meta.url
  );

  images[social.name] = image;
}
</script>