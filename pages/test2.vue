<template>
  <div class="box menu">
    <div class="flex w-100%">
      <div class="relative w-17%">
        <n-space vertical>
          <n-select v-model:value="selectRef" :options="options" />
        </n-space>
      </div>
      <div class="w-70%">
        <n-input
          :input-props="{ type: 'url' }"
          placeholder="Enter URL or paste text"
          v-model:value="inputData"
          class="bg-gray-1"
        />
      </div>

      <div class="w-13% flex ml-7px">
        <n-button class="w-75%" type="info" @click="getApi"> Send </n-button>
        <n-button class="p-0" type="info">
          <div class="i-mdi:chevron-down text-xl"></div>
        </n-button>
      </div>
    </div>
  </div>
  <div class="Response p-4 w-300px min-h-screen box-border">
    <p>Response</p>
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>
    <pre>
            {{ JSON.stringify(responseData, null, 2) }}
            </pre
    >
    <n-config-provider :hljs="hljs">
      <my-app />
    </n-config-provider>
  </div>
</template>
<script setup>
import { h, defineComponent } from "vue"; //data-table
import { NButton, useMessage } from "naive-ui"; ////data-table
import axios from "axios";
import { ref, watchEffect } from "vue";
import { NInput } from "naive-ui";
const errorMsg = ref();
const bodyData = ref();
const inputData = ref(""); // lưu trữ phần tử của input và được sử dụng để gọi hàm useFetch() để tải dữ liệu từ API
const selectRef = ref(1);
const responseData = ref();
const options = [
  {
    label: "GET",
    value: 1,
  },
  {
    label: "POST",
    value: 2,
  },
  {
    label: "PUT",
    value: 3,
  },
  {
    label: "PATCH",
    value: 4,
  },
  {
    label: "DELETE",
    value: 5,
  },
];
const getApi = (params) => {
  // -------------------------loading----------------------

  // ---------------URL ko định dạng----------------------------
  if (!isValidUrl(inputData.value)) {
    console.log(isValidUrl);
    errorMsg.value = "URL không đúng định dạng";
    responseData.value = null;
    return;
  } else {
    errorMsg.value = null;
  }
  // ---------------------------------------------------------
  switch (selectRef.value) {
    case 1:
      console.log("get"); // case =1 =1 thì là GET
      handleGet(); // đặt hàm GET ở đây để chạy GET ở dưới
      break;
    case 2:
      console.log("post");
      handlePost();
      break;
    case 3:
      console.log("put");
      handlePut();
      break;
    case 4:
      console.log("patch");
      handlePatch();
      break;
    case 5:
      console.log("delete");
      handleDelete();
      break;
    default:
      break;
  }
};

const handleGet = async () => {
  try {
    const response = await axios.get(inputData.value);
    responseData.value = response.data;
    errorMsg.value = null;
    console.log("🚀 ~ file: detail.vue:365 ~ handleGet ~ x:", response.data);
  } catch (error) {
    console.error(error);
    responseData.value = error.response;
  }
};
// ---------------------POST-----------------------
const handlePost = async () => {
  try {
    const response = await axios.post(
      inputData.value,
      bodyData.value ? JSON.parse(bodyData.value) : null // nếu điều kiện về thứ nhất đúng sẽ lấy gtri vế t2-toán tử 3 ngôi
    ); //trả ra null ở bodyData chứ ko phải response
    responseData.value = response.data;
    console.log(
      "🚀 ~ file: detail.vue:373 ~ handlePost ~ data:",
      response.data
    );
  } catch (error) {
    //console.log(error);
    responseData.value = error.response;
  }
};

// --------------------------------------PUT---------------------------------
const handlePut = async () => {
  try {
    const response = await axios.put(
      inputData.value,
      JSON.parse(bodyData.value)
    );
    responseData.value = response.data;
    console.log(
      "🚀 ~ file: detail.vue:373 ~ handlePost ~ data:",
      response.data
    );
  } catch (error) {
    console.log(error);
    responseData.value = error.response;
  }
};

// ----------------------------------DELETE------------------------------
const handleDelete = async () => {
  try {
    const response = await axios.delete(inputData.value);
    responseData.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
    responseData.value = error.response;
  }
};
function isValidUrl(url) {
  const urlPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}
</script>
