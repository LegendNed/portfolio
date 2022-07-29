<template>
  <vue-final-modal
    v-bind="$attrs"
    :name="name"
    :click-to-close="false"
    :prevent-click="true"
    :hide-overlay="true"
    classes="window"
    :content-class="[
      'window-content',
      ...(toggleFullscreen ? ['window-fullscreen'] : []),
    ]"
    :content-style="{ width: width }"
    :drag="true"
    :fit-parent="false"
    drag-selector=".window-navigation"
    @before-open="update"
    @click="stack.emit('update', name)"
    @drag:start="stack.emit('update', name)"
  >
    <div class="window-navigation">
      <div class="traffic-lights focus">
        <button
          :class="`traffic-light traffic-light-close ${
            !closable ? 'disabled' : ''
          }`"
          id="close"
          @click="close"
        >
          <svg width="7" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="#000"
              stroke-width="1.2"
              stroke-linecap="round"
              d="M1.182 5.99L5.99 1.182M5.99 6.132L1.182 1.323"
            />
          </svg>
        </button>
        <button
          class="traffic-light traffic-light-minimize disabled"
          id="minimize"
          :tabindex="false ? '0' : '-1'"
        >
          <svg width="7" height="2" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="#000"
              stroke-width="1.2"
              stroke-linecap="round"
              d="M.61.703h5.8"
            />
          </svg>
        </button>
        <button
          :class="`traffic-light traffic-light-maximize ${
            !fullscreen ? 'disabled' : ''
          }`"
          id="maximize"
          @click="maximise"
          :tabindex="fullscreen ? '0' : '-1'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.73 15">
            <polyline points="0 15 0 3.38 11.29 15" />
            <polyline points="14.73 10.89 14.73 0 4.28 0" />
          </svg>
        </button>
      </div>

      <slot name="title" />
    </div>
    <section class="window-inside">
      <slot name="content" />
    </section>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

const { name, fullscreen, closable, width } = defineProps({
  name: String,
  fullscreen: {
    type: Boolean,
    default: () => false,
  },
  closable: {
    type: Boolean,
    default: () => true,
  },
  width: {
    type: String,
    default: () => "300px",
  },
});

const toggleFullscreen = ref(false);

const stack: any = inject("stack");
const vfm: any = inject("$vfm");

function maximise() {
  if (!fullscreen) return;
  toggleFullscreen.value = !toggleFullscreen.value;
}

function close() {
  if (!closable) return;
  vfm.hide(name);

  stack.emit("reduce");
}

function update(event: any) {
  let openedAmount = vfm.openedModals.length;

  if (openedAmount >= 3) {
    let toggleIndex = Number(vfm.openedModals[0].props.name == "projects");
    vfm.openedModals[toggleIndex].toggle();
    stack.emit("reduce");
  }

  if (openedAmount >= 1) {
    let offsetValue = openedAmount * 40 * (Math.round(Math.random()) ? 2 : -1);
    let offset = `translateY(${offsetValue}px)`;

    let modal = event.ref.vfmContent._value;
    modal.style.transform = offset;
  }

  stack.emit("increase");
}
</script>