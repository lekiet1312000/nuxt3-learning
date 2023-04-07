<template>

  <div class="content bg-white p-5 pt-2 pb-2 min-h-screen w-75%">
  <!-- -----------------------------------------HEADER-------------------------------------------- -->
    <div class="layout-header flex justify-between">
      <div class="flex">
        <div>
          <Nuxt-link to="/" class="decoration-none text-gray">
            <p>New Collection</p>
          </Nuxt-link>
        </div>
        <p class="text-gray pr-2 pl-2">/</p>
        <div class="text-gray">
          <p>New Folder</p>
        </div>
        <p class="text-gray pr-2 pl-2">/</p>
        <div class="">
          <p>New Request</p>
        </div>
      </div>
      <div class="mr-5">
        <nav>
          <ul class="flex list-none">
            <li class="ml-5 flex">
              <n-button class="bg-gray-1">
                <div class="i-mdi:content-save text-xl mr-1"></div>
                <p>Save</p>
              </n-button>
              <n-button class="p-0 bg-gray-1">
                <div class="i-mdi:chevron-down text-xl"></div>
              </n-button>
            </li>
            <li class="ml-5 items-center">
              <n-button class="i-mdi:dots-horizontal text-xl"></n-button>
            </li>
            <li class="ml-5 flex items-center bg-gray-1 p-1">
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
    <div class="box menu flex">
      <div class="relative w-20%">
        <n-space vertical>
          <n-select v-model:value="selectRef" :options="options" />
        </n-space>
      </div>

      <input
        class="w-70%"
        :input-props="{ type: 'url' }"
        placeholder="Enter URL or paste text"
        v-model="inputData"
      />

      <n-button class="w-10% p-0" type="info" @click="getApi">
        Send
        <!-- <div class="i-mdi:chevron-down text-xl w-4%"></div> -->
      </n-button>
    </div>
    <!-- ----------------------------------------------------------------CONTENT--------------------------------------------------------------- -->
    <div class="layout content">
      <div class="box content flex w-850px">
        <n-card clas="w-450px min-h-screen">
          <n-tabs type="line" animated class="">
            <!-- --------------------------Params------------------------- -->
            <n-tab-pane name="Params" tab="Params">
              <p class="">Query Params</p>
              <n-data-table
                :columns="columnsParams"
                :data="dataParams"
                :pagination="paginationParams"
                :row-key="rowKey"
                @update:checked-row-keys="checkActive"
                class="text-xs"
              />
            </n-tab-pane>

            <!-- --------------------------------------------Headers------------------------------------------- -->
            <n-tab-pane name="Headers" tab="Headers">
              <div class="flex w-100 mb-4">
                <p class="mr-3">Header</p>
                <div
                  class="bg-gray-1 border-none cursor-pointer flex items-center"
                  @click="toggleContent"
                  v-if="showContent"
                >
                  <div class="i-mdi:eye-arrow-right-outline text-xl mr-1"></div>

                  <div class="text-xs">display</div>
                  <!-- Hide auto-generated headers -->
                </div>

                <div
                  class="bg-gray-1 border-none cursor-pointer flex items-center"
                  @click="toggleContent"
                  v-if="!showContent"
                >
                  <div class="i-mdi:eye-arrow-right-outline text-xl mr-1"></div>
                  <p class="mr-1">0</p>
                  <div class="text-xs">hidden</div>
                </div>
              </div>
              <!-- v-if để check xem componet có được hiển thị hay không nếu là true hiển thị flash thì không -->
              <n-data-table
                v-if="showContent"
                :columns="columns"
                :data="data"
                :pagination="pagination"
                :bordered="false"
                class="text-xs"
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
              ></textarea>
              <!-- <pre>{{ JSON.stringify(value, null, 2) }}</pre> -->
              <!-- <div>{{ bodyData }}</div> -->
            </n-tab-pane>
          </n-tabs>
        
        </n-card>
        <!-- ------------------------------------------------------Response-------------------------------------------------------- -->
        <div class="Response p-4 w-400px min-h-screen">
          <p>Response</p>
          <pre>{{ JSON.stringify(responseData, null, 2) }}</pre>
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

const value2 = ref(2);
const value1 = ref(1);
const bodyData = ref();
const inputData = ref("https://6406b120862956433e575082.mockapi.io/comment"); // lưu trữ phần tử của input và được sử dụng để gọi hàm useFetch() để tải dữ liệu từ API
const selectRef = ref(1);
const responseData = ref(null); // lưu trữ dữ liệu nhận được từ API.Dữ liệu này sẽ được hiển thị trên màn hình để người dùng có thể xem
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
    console.log("🚀 ~ file: detail.vue:365 ~ handleGet ~ x:", response.data);
  } catch (error) {
    console.error(error);
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

//-------------------Params------------

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
      return h("div", [
        h(
          "button",
          {
            onClick() {
              dataParams.value.splice(index, 1);
            },
          },
          "X"
        ),
      ]);
    },
  },
];

const paginationParams = () => ({
  pageSize: 10,
});

const checkActive = (keys) => {
  if (keys.length > 0) {
    let params = "";
    keys.forEach((key) => {
      let x = dataParams.value[key];
      params += `${x.key}=${x.value}&`;
    });
    inputData.value = `?${params.slice(0, -1)}`;
  } else {
    inputData.value = "";
  }
};
</script>
