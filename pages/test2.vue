<template>
  <input
    type="text"
    placeholder="Enter URL"
    v-model="inputData"
    class="w-1/2 h-1/2"
  />
  <button @click="fetchData">Send</button>
  <div class="Response p-4">
    <p>Response</p>
    <div>
      {{ receivedData }}
    </div>
  </div>
</template>

<script setup>
const inputData = ref("");
// const childData = ref("");
const receivedData = ref("");

const fetchData = async () => {
  const { data: test } = await useFetch(inputData.value);
  console.log(test);
  receivedData.value = JSON.stringify(test.value, undefined, 2);
};
</script>
