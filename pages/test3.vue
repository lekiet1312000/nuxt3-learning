<template>
  <div>
    <input
      :input-props="{ type: 'url' }"
      placeholder="Enter URL or paste text"
      v-model="inputData"
    />
    <div v-for="(param, index) in params" :key="index">
      <button>click</button>
      <input v-model="param.key" @input="handleInput(index)" />
      <input v-model="param.value" @input="handleInput(index)" />
      <input v-model="param.description" @input="handleInput(index)" />

      <button @click="removeParam(index)">Remove</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const params = ref([{ key: "", value: "", description: "" }]);

function handleInput(index) {
  if (index === params.value.length - 1) {
    params.value.push({ key: "", value: "", description: "" });
  }
}

function removeParam(index) {
  params.value.splice(index, 1);
}

0(() => {
  const lastParam = params.value[params.value.length - 1];
  if (lastParam.key || lastParam.value || lastParam.description) {
    params.value.push({ key: "", value: "", description: "" });
  }
});
</script>
