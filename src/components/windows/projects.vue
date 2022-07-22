<template>
  <Modal
    v-model="show"
    :fullscreen="false"
    name="projects"
    width="420px"
    @before-close="clear"
  >
    <template v-slot:title>Projects Explorer</template>
    <template v-slot:content>
      <div class="divider" text="Current Projects">
        <hr class="left" />
        <hr class="right" />
      </div>
      <div class="project-container">
        <div
          class="project-icon"
          v-for="item in projects.cur"
          :key="item.name"
          @click="change(item)"
        >
          <img :src="imgFolder" />
          <h4>{{ item.name }}</h4>
        </div>
      </div>

      <div class="divider" text="Obsolete Projects">
        <hr class="left" />
        <hr class="right" />
      </div>
      <div class="project-container">
        <div
          class="project-icon"
          v-for="item in projects.old"
          :key="item.name"
          @click="change(item)"
        >
          <img :src="imgFolder" />
          <h4>{{ item.name }}</h4>
        </div>
      </div>
    </template>
  </Modal>

  <Modal v-model="opened" :fullscreen="false" name="project" width="320px">
    <template v-slot:title>Notepad</template>
    <template v-slot:content>
      <h3 style="margin-top: 7px">
        URL:
        <a
          :href="current.url?.href || ''"
          :target="current.url?.href ? '_blank' : ''"
        >
          {{ current.url?.text || "Nothing selected" }}
        </a>
      </h3>
      <h3 style="margin-top: -15px">
        Position: {{ current.position || "Nothing selected" }}
      </h3>
      <h3 style="margin-top: -15px">
        {{ current.period }}
      </h3>

      <p style="white-space: pre-wrap">{{ current.text }}</p>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import imgFolder from "../../assets/images/folder.png";

import projects from "../../assets/windows/projects.json";

const vfm: any = inject("$vfm");

const show = ref(false),
  opened = ref(false);

const current: any = ref({});
function change(item: any) {
  current.value = item;
  vfm.show("project", { last: Date.now() });
}

function clear() {
  opened.value = false;
  current.value = {};
}
</script>