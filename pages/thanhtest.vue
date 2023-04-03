<template>
  <div>
    <input v-model="inputData" />
    <input v-model="data" type="text" />
    <input v-model="data2" type="text" />
    <button @click="add('?' + data, '=' + data2)">adđ</button>
  </div>
  
</template>
<script setup>
const inputData = ref("http://google.com");
const data = ref("");
const data2 = ref("");
const add = (data, data2) => {
  inputData.value = inputData.value + data + data2;
};


</script>
