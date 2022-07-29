<template>
  <Modal
    v-model="show"
    :fullscreen="false"
    name="contact"
    width="280px"
    @closed="clear"
  >
    <template v-slot:title>Contact me</template>
    <template v-slot:content>
      <form class="contact" @submit.prevent="contact" aria-hidden="true">
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="EMAIL"
          required
        />

        <textarea
          type="text"
          name="message"
          v-model="message"
          placeholder="MESSAGE"
          required
        />
        <div
          class="g-recaptcha"
          data-theme="dark"
          data-sitekey="6Ldmpp4bAAAAAIn0pk_nXN03djoG7h5F_GAfOOyy"
          required
        ></div>
        <button id="my-form-button">Submit</button>
        <p>{{ output }}</p>
      </form>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

const show = ref(false);
const output = ref("");

const email = ref(""),
  message = ref("");

const endpoint = "https://formspree.io/f/xleawwng";
function contact(event: any) {
  let data = new FormData(event.target);
  fetch(endpoint, {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      output.value = data.ok
        ? "I will try to reply as soon as possible!"
        : data.error;

      if (data.ok) clear();
    })
    .catch(() => {
      output.value = "Oops! There was a problem submitting your form";
    });
}

function clear() {
  email.value = "";
  message.value = "";
}
</script>