<template>
  <Modal v-model="show" :fullscreen="false" name="skills" width="390px">
    <template v-slot:title>Skills & Experience</template>
    <template v-slot:content>
      <div class="new-line" style="margin: 0" v-html="text" />
      <div style="margin-top: 20px" />
      <div v-for="skill in skills.skills" :key="skill.name">
        <h4>{{ skill.name }}</h4>
        <div class="progress">
          <div class="progress-bar" :style="{ width: skill.value }" />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

import skills from "../../assets/windows/skills.json";

const show = ref(false);
const text = skills.text.join(`\n\n`);
</script>