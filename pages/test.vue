<template>
  <div class="content bg-white p-5 pt-2 pb-2 min-h-screen w-75%">
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
            <li class="ml-5 flex items-center">
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

      <n-button class="w-10% p-0 bg-blue" @click="getApi">
        <p class="w-6%">Send</p>
        <!-- <div class="i-mdi:chevron-down text-xl w-4%"></div> -->
      </n-button>
    </div>
    <div class="layout content">
      <div class="box content flex w-850px">
        <n-card clas="w-450px min-h-screen">
          <n-tabs type="line" animated class="">
            <!-- --------------------------Params------------------------- -->
            <n-tab-pane name="Params" tab="Params">
              <p class="">Query Params</p>
              <n-table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Key</th>
                    <th>Value</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(param, index) in params" :key="index">
                    <td></td>
                    <td>
                      <input
                        class="border-none"
                        placeholder="Key"
                        type="text"
                        v-model="param.key"
                        @input="handleInput(index)"
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Value"
                        class="border-none"
                        type="text"
                        v-model="param.value"
                        @input="handleInput(index)"
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Description"
                        class="border-none"
                        type="text"
                        v-model="param.description"
                        @input="handleInput(index)"
                      />
                      <button @click="removeParam(index)">Remove</button>
                    </td>
                  </tr>
                </tbody>
              </n-table>
            </n-tab-pane>

            <!-- --------------------------Headers------------------------- -->
            <n-tab-pane name="Headers" tab="Headers">
              <div class="flex w-100 mb-4">
                <test2 />
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
            <!-- ----- --------------------Body---------------------------- -->
            <n-tab-pane name="Body" tab="Body" class="">
              <div class="flex items-center mb-10px">
                <n-space vertical class="JSON w-20%">
                  <n-select v-model:value="valueRef" :options="optionsRaw" />
                </n-space>
                <n-space vertical class="JSON w-20%">
                  <n-select v-model:value="value1Ref" :options="optionsJson" />
                </n-space>
              </div>
              <input type="text" v-model="pageBody" />
              <!-- <pre>{{ JSON.stringify(value, null, 2) }}</pre> -->
              <div>{{ pageBody }}</div>
            </n-tab-pane>
          </n-tabs>
          <!-- <div class="text-green">Cookie</div> -->
        </n-card>
        <!-- ------------------------Response--------------------------------- -->
        <div class="Response p-4 w-400px min-h-screen">
          <p>Response</p>
          <pre>{{ JSON.stringify(receivedData, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Test2 from "./test2.vue";
import { h, defineComponent } from "vue"; //data-table
import { NButton, useMessage } from "naive-ui"; ////data-table
import axios from "axios";
import { ref, watchEffect } from "vue";
// ---------------------------------Params--------------------------------
const params = ref([{ key: "", value: "", description: "" }]);

function handleInput(index) {
  if (index === params.value.length - 1) {
    params.value.push({ key: "", value: "", description: "" });
  }
}

function removeParam(index) {
  params.value.splice(index, 1);
}

watchEffect(() => {
  const lastParam = params.value[params.value.length - 1];
  if (lastParam.key || lastParam.value || lastParam.description) {
    params.value.push({ key: "", value: "", description: "" });
  }
});

// const add = (inputKeyparams, inputValueparams) => {
//   inputData.value = inputData.value + inputKeyparams + inputValueparams;
// };

const inputData = ref("https://6406b120862956433e575082.mockapi.io/comment"); // lưu trữ phần tử của input và được sử dụng để gọi hàm useFetch() để tải dữ liệu từ API
const selectRef = ref(1);
const receivedData = ref(null); // lưu trữ dữ liệu nhận được từ API.Dữ liệu này sẽ được hiển thị trên màn hình để người dùng có thể xem
const pageBody = ref("");
// const getApi = async () => {
//   //hàm này được sử dụng để gọi hàm useFetch() để tải dữ liệu từ API. Sau đó, dữ liệu nhận được từ API sẽ được lưu trữ trong biến receivedData, và được hiển thị trên màn hình để người dùng có thể xem.
//   const { data: test } = await useFetch(inputData.value);
//   console.log(test);

//   receivedData.value = JSON.stringify(test.value, undefined, 2);
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
    receivedData.value = response.data;
    console.log("🚀 ~ file: detail.vue:365 ~ handleGet ~ x:", response.data);
  } catch (error) {
    console.log(error);
  }
};
// ---------------------POST-----------------------
const handlePost = async () => {
  try {
    const response = await axios.post(
      inputData.value,
      pageBody.value ? JSON.parse(pageBody.value) : null // nếu điều kiện về thứ nhất đúng sẽ lấy gtri vế t2-toán tử 3 ngôi
    ); //trả ra null ở pageBody chứ ko phải response
    receivedData.value = response.data;
    console.log(
      "🚀 ~ file: detail.vue:373 ~ handlePost ~ data:",
      response.data
    );
  } catch (error) {
    //console.log(error);
  }
};

// --------------sử dụng useFetch--------------------
// const handlePost = async () => {
//   const { data, error, pending, refresh } = await useFetch(inputData.value, {
//     method: "POST",

//     body: JSON.parse(pageBody.value),
//   });

//   receivedData.value = data.value;
//   console.log("🚀 ~ file: detail.vue:373 ~ handlePost ~ data:", data.value);
// };
// ------------------------PUT-------------------
const handlePut = async () => {
  try {
    const response = await axios.put(
      inputData.value,
      JSON.parse(pageBody.value)
    );
    receivedData.value = response.data;
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
    receivedData.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
  // const { data, error, pending, refresh } = await useFetch(inputData.value, {
  //   method: "DELETE",
  // });
  // receivedData.value = data.value;
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
const optionsJson = [
  {
    label: "JSON",
    value: "Option 7",
  },
];

// ---------------------Body---------------------
const optionsRaw = [
  {
    label: "Raw",
    // value: "Option 7",
  },
];
//-------------------Params------------

const columnsParams = [
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
    title: "...",
    key: "actions",
  },
  {
    title: "Bulk Edit",
    key: "length",
  },
];
</script>
