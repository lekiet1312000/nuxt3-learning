<template>
  <div class="content text-4 bg-white p-5 pt-1 pb-1 min-h-screen w-1200px">
    <!-- -----------------------------------------HEADER-------------------------------------------- -->
    <div class="layout-header flex justify-between">
      <div class="flex ml-4">
        <div>
          <Nuxt-link to="/" class="decoration-none text-gray">
            <p class="font-500">New Collection</p>
          </Nuxt-link>
        </div>
        <p class="text-gray pr-2 pl-2">/</p>
        <div class="text-gray">
          <p class="font-500">New Folder</p>
        </div>
        <p class="text-gray pr-2 pl-2">/</p>
        <div>
          <p class="font-500">New Request</p>
        </div>
      </div>
      <div class="mr-4">
        <nav>
          <ul class="flex list-none items-center">
            <li class="ml-5 flex">
              <n-button class="bg-gray-1">
                <div class="i-mdi:content-save text-xl mr-1 text-gray-4"></div>
                <p>Save</p>
              </n-button>
              <n-button class="p-0 bg-gray-2">
                <div class="i-mdi:chevron-down text-xl"></div>
              </n-button>
            </li>
            <li class="ml-5">
              <n-button class="i-mdi:dots-horizontal text-xl p-3"></n-button>
            </li>
            <li>
              <div class="h-7 w-px bg-gray-400 mx-4"></div>
            </li>
            <li class="ml-5 flex items-center bg-gray-2 p-1 b-rounded-2">
              <div class="bg-white p-1">
                <div class="i-mdi:pencil-outline text-orange"></div>
              </div>
              <n-button
                class="i-mdi:message-text-outline bg-gray-300"
              ></n-button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- ---------------------------------------------INPUT-SEND-METHOD-------------------------------------------- -->
    <hr />

    <div class="box menu">
      <div class="flex w-100%">
        <div class="relative w-15%">
          <n-space vertical>
            <n-select
              size="large"
              v-model:value="selectRef"
              :options="options"
            />
          </n-space>
        </div>
        <div class="w-75%">
          <n-input
            :input-props="{ type: 'url' }"
            placeholder="Enter URL or paste text"
            v-model:value="inputData"
            class="bg-gray-1 p-0.75"
          />
        </div>

        <div
          class="w-10% flex ml-7px text-white bg-#097BED border-rounded p-0.75"
        >
          <n-button class="w-70%" type="bg-#097BED" @click="getApi"
            >Send</n-button
          >
          <div class="relative">
            <n-button
              class="i-mdi:chevron-down p-0 text-xl absolute top-5px left-6px border-none"
            ></n-button>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <!-- ----------------------------------------------------------------CONTENT--------------------------------------------------------------- -->
    <div class="layout content w-100%">
      <div class="box content flex">
        <n-card clas=" min-h-screen w-3/5 box-border ">
          <n-tabs type="line" animated class="">
            <!-- --------------------------Params------------------------- -->
            <n-tab-pane name="Params" tab="Params" class="text-4">
              <p class="">Query Params</p>
              <n-data-table
                :columns="columnsParams"
                :data="dataParams"
                :row-key="rowKey"
                @update:checked-row-keys="checkActive"
                class="text-4"
              />
            </n-tab-pane>

            <!-- --------------------------------------------Headers------------------------------------------- -->
            <n-tab-pane name="Headers" tab="Headers">
              <div class="flex w-100 mb-4 items-center">
                <div>
                  <p class="mr-3">Header</p>
                </div>
                <div>
                  <div
                    class="bg-gray-1 border-none cursor-pointer flex b-rounded-3 h-20px p1 items-center"
                    @click="toggleContent"
                    v-if="showContent"
                  >
                    <div
                      class="i-mdi:eye-arrow-right-outline text-xl mr-1 text-gray-5"
                    ></div>

                    <div class="text-xs font-500 text-gray-5">
                      Hide auto-generated headers
                    </div>
                    <!-- Hide auto-generated headers -->
                  </div>

                  <div
                    class="bg-gray-1 border-none cursor-pointer flex items-center b-rounded-3 h-20px p1"
                    @click="toggleContent"
                    v-if="!showContent"
                  >
                    <div
                      class="i-mdi:eye-arrow-right-outline text-xl mr-1"
                    ></div>
                    <p class="mr-1">0</p>
                    <div class="text-xs text-gray-5">hidden</div>
                  </div>
                </div>
              </div>
              <!-- v-if để check xem componet có được hiển thị hay không nếu là true hiển thị flash thì không -->
              <n-data-table
                v-if="showContent"
                :columns="columns"
                :data="data"
                :pagination="pagination"
                :bordered="false"
                class="text-4"
              />

              <n-data-table
                v-if="!showContent"
                :columns="columns"
                :pagination="pagination"
                :bordered="false"
                class="text-xs"
              />
            </n-tab-pane>
            <!-- ----- -----------------------------------------------Body------------------------------------------------------ -->
            <n-tab-pane name="Body" tab="Body" class="">
              <div class="flex items-center mb-10px">
                <n-space vertical class="Raw w-20%">
                  <n-select v-model:value="value1" :options="optionsRaw" />
                </n-space>
                <n-space vertical class="JSON w-20%">
                  <n-select v-model:value="value2" :options="optionsJson" />
                </n-space>
              </div>
              <textarea
                ref="input"
                v-model="bodyData"
                @keyup.enter.prevent="submitInput"
                class="w-180 h-100"
              ></textarea>
              <!-- <pre>{{ JSON.stringify(value, null, 2) }}</pre> -->
              <!-- <div>{{ bodyData }}</div> -->
            </n-tab-pane>
          </n-tabs>
        </n-card>
        <!-- ------------------------------------------------------Response-------------------------------------------------------- -->
        <div
          class="Response pr-0.5 p-4 w-600px flex flex-col relative items-center"
        >
          <h3 class="text-gray-4 mr-70 mt-0">Response</h3>

          <div class="overflow-auto max-h-550px">
            <div v-if="loading" class="spinner absolute top-60"></div>
            <div v-else class="w-350px whitespace-pre-wrap pl-1 m-0">
              <n-config-provider :hljs="hljs">
                <n-code
                  :code="JSON.stringify(responseData, null, 2)"
                  language="json"
                />
              </n-config-provider>
            </div>
          </div>
          <!-- ----------------Lỗi Url------------------- -->
          <div v-if="errorMsg">
            <p>{{ errorMsg }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, defineComponent } from "vue"; //data-table
import { NButton, useMessage } from "naive-ui"; ////data-table
import axios from "axios";
import { ref, watchEffect } from "vue";
import { NInput } from "naive-ui";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";

const loading = ref(false);
const errorMsg = ref();
const value2 = ref(2);
const value1 = ref(1);
const bodyData = ref();
const inputData = ref(""); // lưu trữ phần tử của input và được sử dụng để gọi hàm useFetch() để tải dữ liệu từ API
const selectRef = ref(1);
const responseData = ref();
hljs.registerLanguage("json", json);
// lưu trữ dữ liệu nhận được từ API.Dữ liệu này sẽ được hiển thị trên màn hình để người dùng có thể xem
// const getApi = async () => {
//   //hàm này được sử dụng để gọi hàm useFetch() để tải dữ liệu từ API. Sau đó, dữ liệu nhận được từ API sẽ được lưu trữ trong biến responseData, và được hiển thị trên màn hình để người dùng có thể xem.
//   const { data: test } = await useFetch(inputData.value);
//   console.log(test);
//   responseData.value = JSON.stringify(test.value, undefined, 2);
// };
// -----------------------hidden--------------------------
const showContent = ref(true);
function toggleContent() {
  showContent.value = !showContent.value; // ! thay đổi true flash
} // showContent.value hiển thị giá trị ref
// --------------------------------NewReques----------------------------
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
  loading.value = true;
  setTimeout(() => {
    loading.value = false; // ẩn spinner
  }, 1000);
  // ---------------URL ko định dạng----------------------------
  if (!isValidUrl(inputData.value)) {
    console.log(isValidUrl);
    errorMsg.value = "URL không đúng định dạng";
    // responseData.value = null;
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
    errorMsg.value = "Could not send request";
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
// --------------------------sử dụng axios-----------------------------
// const handlePost = async () => {
//   const { data, error, pending, refresh } = await useFetch(inputData.value, {
//     method: "POST",
//     body: JSON.parse(bodyData.value),
//   });
//   responseData.value = data.value;
//   console.log("🚀 ~ file: detail.vue:373 ~ handlePost ~ data:", data.value);
// };
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
  // const { data, error, pending, refresh } = await useFetch(inputData.value, {
  //   method: "DELETE",
  // });
  // responseData.value = data.value;
  // console.log("🚀 ~ file: detail.vue:373 ~ handleDelete ~ data:", data);
};
// -----------------------------Header--------------------
const columns = [
  {
    title: "Key",
    key: "no",
  },
  {
    title: "Value",
    key: "title",
  },
  {
    title: "Description",
    key: "length",
  },
  {
    title: "Bulk Edit",
    key: "length",
  },
];
const play = (row) => {};
const data = [
  { no: 3, title: "Wonderwall", length: "4:18" },
  { no: 4, title: "Don't Look Back in Anger", length: "4:48" },
  { no: 12, title: "Champagne Supernova", length: "7:27" },
  { no: 12, title: "Champagne Supernova", length: "7:27" },
];
let pagination = false;
// --------------------end--data-Table----------------
// ---------------------Body---------------------
const optionsRaw = [
  {
    label: "Raw",
    value: 1,
  },
];
const optionsJson = [
  {
    label: "JSON",
    value: 2,
  },
];
//--------------------Params--------------------------
const rowKey = (row) => {
  return row.id;
};
const dataParams = ref([
  {
    id: 0,
    key: "",
    value: "",
    description: "",
  },
  {
    id: 1,
    key: "",
    value: "",
    description: "",
  },
]);
const columnsParams = [
  {
    type: "selection",
  },
  {
    title: "Key",
    key: "key",
    render(row, index) {
      console.log(row);
      return h(NInput, {
        value: row.key,
        onUpdateValue(v) {
          dataParams.value[index].key = v;
        },
        onInput() {
          // Thêm một dòng mới vào mảng data nếu ô input cuối cùng có giá trị khác rỗng
          const lastIndex = dataParams.value.length - 1;
          if (
            dataParams.value[lastIndex].key !== "" ||
            dataParams.value[lastIndex].value !== "" ||
            dataParams.value[lastIndex].description !== ""
          ) {
            dataParams.value.push({
              id: lastIndex + 1,
              key: "",
              value: "",
              description: "",
            });
          }
        },
      });
    },
  },
  {
    title: "Value",
    key: "value",
    render(row, index) {
      return h(NInput, {
        value: row.age,
        onUpdateValue(v) {
          dataParams.value[index].value = v;
        },
        onInput() {
          // Thêm một dòng mới vào mảng data nếu ô input cuối cùng có giá trị khác rỗng
          const lastIndex = dataParams.value.length - 1;
          if (
            dataParams.value[lastIndex].key !== "" ||
            dataParams.value[lastIndex].value !== "" ||
            dataParams.value[lastIndex].description !== ""
          ) {
            dataParams.value.push({
              id: lastIndex + 1,
              key: "",
              value: "",
              description: "",
            });
          }
        },
      });
    },
  },
  {
    title: "Description",
    key: "description",
    render(row, index) {
      return h(NInput, {
        value: row.address,
        onUpdateValue(v) {
          dataParams.value[index].description = v;
        },
        onInput() {
          // Thêm một dòng mới vào mảng data nếu ô input cuối cùng có giá trị khác rỗng
          const lastIndex = dataParams.value.length - 1;
          if (
            dataParams.value[lastIndex].key !== "" ||
            dataParams.value[lastIndex].value !== "" ||
            dataParams.value[lastIndex].description !== ""
          ) {
            dataParams.value.push({
              id: lastIndex + 1,
              key: "",
              value: "",
              description: "",
            });
          }
        },
      });
    },
  },
  {
    title: "",
    key: "value",
    render(row, index) {
      return (
        "div",
        [
          h(
            "button",
            {
              onClick() {
                deleteRow(index);
              },
              class:
                "bg-slate-100 rounded-full border-none hover:bg-origin-content hover:bg-state-500",
            },
            [
              h(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  class: "w-6 h-6",
                },
                [
                  h("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
                  }),
                ]
              ),
            ]
          ),
        ]
      );
    },
  },
];
const getRowIdByKey = (key) => {
  const row = dataParams.value.find((row) => row.key === key);
  return row ? row.id : null;
};
const checkActive = (checkedRowKeys) => {
  let url;
  try {
    url = new URL(inputData.value);
  } catch (error) {
    console.log("Invalid URL:", inputData.value);
    return;
  }
  const searchParams = url.searchParams;
  //Xóa các cặp key-value được thêm vào URL bởi checkActive
  [...searchParams.keys()] //...được sử dụng để bóc tách một mảng hoặc một đối tượng thành các phần tử riêng lẻ
    .filter((key) => !checkedRowKeys.includes(getRowIdByKey(key)))
    .forEach((key) => searchParams.delete(key));
  // Thêm các cặp key-value vào URL
  const newParams = dataParams.value
    .filter((row) => checkedRowKeys.includes(row.id))
    .map((row) => `${row.key}=${row.value}`)
    .join("&");
  // Thay đổi query parameter trên URL và lưu vào inputParams
  url.search = newParams;
  inputData.value = url.href;
};
// Xóa các query parameter tương ứng khỏi URL
const deleteRow = (index) => {
  const deletedRow = dataParams.value.splice(index, 1)[0];
  let url;
  try {
    url = new URL(inputData.value);
  } catch (error) {
    console.log("Invalid URL:", inputData.value);
    return;
  }
  const searchParams = url.searchParams;
  if (searchParams.has(deletedRow.key)) {
    searchParams.delete(deletedRow.key);
    inputData.value = url.href;
  }
};
// ----------------------------url không dịnh dạng---------------------
function isValidUrl(url) {
  const urlPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}
</script>

<style>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: green;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
