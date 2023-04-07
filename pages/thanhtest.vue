<template>
  <div>
    <input
      :input-props="{ type: 'url' }"
      placeholder="Enter URL or paste text"
      v-model="inputData"
      class="w-50%"
    />
    <div v-for="(param, index) in params" :key="index">
      <n-checkbox></n-checkbox>
      <input v-model="param.key" @input="handleInput(index)" />
      <input v-model="param.value" @input="handleInput(index)" />
      <input v-model="param.description" @input="handleInput(index)" />
      <button @click="removeParam(index)">Remove</button>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { ref, watchEffect, watch } from "vue";

const params = ref([{ key: "", value: "", description: "" }]);
const inputData = ref("http://google.com");

function handleInput(index) {
  if (index === params.value.length - 1) {
    params.value.push({ key: "", value: "", description: "" });
  }
}

function removeParam(index) {
  params.value.splice(index, 1);
}

function updateInputData() {
  let result = "";
  for (let i = 0; i < params.value.length; i++) {
    const param = params.value[i];
    if (param.key && param.value) {
      result += `${param.key}=${param.value}&`;
    }
  }
  if (result.length > 0) {
    result = "?" + result.slice(0, -1);
  }
  inputData.value = "http://google.com" + result;
}

watchEffect(() => {
  updateInputData();
});

watch(inputData, (newVal, oldVal) => {
  // Split the input data by "?" and "&" to get the key-value pairs
  const paramsArr = newVal.split(/[?&]/).slice(1);
  params.value = paramsArr.map((param) => {
    const [key, value] = param.split("=");
    return { key, value, description: "" };
  });
});
</script>