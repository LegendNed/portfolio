<template>
  <div class="nav-bar">
    <div class="nav-quote">{{ quote }}</div>
    <div class="nav-time">{{ time }}</div>
    <div class="nav-icons">
      <icon icon="volume-up" @click="listening" />
      <icon icon="bell" @click="notification" />
      <icon icon="power-off" @click="shutdown" />
    </div>
  </div>
  <Modal
    v-if="lData"
    v-model="listeningWindow"
    :fullscreen="false"
    name="listening"
    width="450px"
  >
    <template v-slot:title>I'm currently listening to...</template>
    <template v-slot:content>
      <div class="space-between">
        <div>
          <a
            :href="
              lData.is_playing ? lData.item.album.external_urls.spotify : ''
            "
            target="_blank"
          >
            <h1 style="margin: 0">
              <abbr :title="formatName(lData)">
                {{ formatName(lData, true) }}
              </abbr>
            </h1>
          </a>
          <div v-if="lData.is_playing" class="artists">
            <h3>By</h3>
            <h3 v-for="(artist, index) in lData.item.artists" :key="artist.id">
              <a
                :href="artist.external_urls.spotify"
                style="margin-right: 0"
                target="_blank"
                >{{ artist.name }}</a
              >
              {{ index + 1 == lData.item.artists.length ? "" : ", " }}
            </h3>
          </div>
          <h3 v-else style="margin: 0">By nobody...</h3>
          <div style="margin-left: -20px">
            <p style="margin: 20px 0 -17px 20px">Preview</p>
            <audio id="audio" ref="player" controls controlsList="nodownload">
              <source
                v-bind:src="lData.is_playing ? lData.item.preview_url : ''"
                type="audio/mpeg"
              />
              Question, how doesnt your browser support audio?
            </audio>
          </div>
        </div>
        <div style="margin-left: 25px; width: 150px">
          <img
            :src="
              lData.is_playing ? lData.item.album.images[0].url : nothingImage
            "
            width="150"
            style="border-radius: 0.4rem"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, inject, watch } from "vue";

import ElevatorMusic from "../assets/audio.mp3";
import quotes from "../assets/quotes.json";
import date from "date-and-time";

import nothingImage from "../assets/images/nothing.jpg";

const vfm: any = inject("$vfm");
const quote = ref(quotes[Math.floor(Math.random() * quotes.length)]);

let time = ref("");
function updateTime() {
  const now = new Date();
  time.value = date.format(now, "ddd, MMM DD⠀ hh:mm A");
}
updateTime();
setInterval(updateTime, 1000);

let listeningWindow = ref(false),
  lData: any = ref({});

function listening() {
  if (listeningWindow.value) return vfm.toggle("listening");

  const controller = new AbortController();
  setTimeout(() => controller.abort(), 2000);

  fetch("/api/listening", { signal: controller.signal })
    .then((response) => response.json())
    .then((data: any) => (lData.value = data))
    .finally(() => vfm.toggle("listening"));
}

function formatName(data: any, truncate?: boolean) {
  if (!data.is_playing) return "Currently nothing...";
  return data.item.name.length >= 14 && truncate
    ? `${data.item.name.substring(0, 14)}...`
    : data.item.name;
}

let audio = new Audio(ElevatorMusic);
let isPlaying = false;
function notification() {
  isPlaying ? audio.pause() : audio.play();
  isPlaying = !isPlaying;
}

function shutdown() {
  open("", "_self")?.close();
}

const player: any = ref(null);
onMounted(() => {
  player.value.volume = 0.3;
  watch(lData, () => player.value.load());
});
</script>