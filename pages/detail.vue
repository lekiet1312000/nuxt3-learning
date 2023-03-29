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
          <n-select v-model:value="value" :options="options" />
        </n-space>
      </div>

      <input
        class="w-70%"
        :input-props="{ type: 'url' }"
        placeholder="Enter URL or paste text"
        v-model="inputData"
      />

      <n-button class="w-10% p-0">
        <p class="w-6%" @click="fetchData">Send</p>
        <div class="i-mdi:chevron-down text-xl w-4%"></div>
      </n-button>
    </div>
    <div class="layout content">
      <div class="box content flex w-850px">
        <n-card clas="w-450px min-h-screen">
          <n-tabs type="line" animated class="">
            <!-- --------------------------Params------------------------- -->
            <n-tab-pane name="Params" tab="Params">
              <p class="">Query Params</p>

              <n-data-table
                :columns="columnsParams"
                :data="data"
                :pagination="pagination"
                :bordered="false"
                class="text-xs"
              />
            </n-tab-pane>

            <!-- --------------------------Headers------------------------- -->
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
            <!-- ----- --------------------Body---------------------------- -->
            <n-tab-pane name="Body" tab="Body" class="flex items-center">
              <!-- <n-radio-group v-model:value="value" name="radiogroup">
                <n-radio
                  v-for="song in songs"
                  :key="song.value"
                  :value="song.value"
                  :label="song.label"
                  :radio="radio"
                ></n-radio>
              </n-radio-group> -->
              <n-space vertical class="JSON w-20%">
                <n-select v-model:value="value" :options="optionsRaw" />
              </n-space>
              <n-space vertical class="JSON w-20%">
                <n-select v-model:value="value" :options="optionsJson" />
              </n-space>
            </n-tab-pane>
          </n-tabs>
          <!-- <div class="text-green">Cookie</div> -->
        </n-card>
        <!-- ------------------------Response--------------------------------- -->
        <div class="Response p-4 w-400px min-h-screen">
          <p>Response</p>
          <div>
            {{ receivedData }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, defineComponent } from "vue"; //data-table
import { NButton, useMessage } from "naive-ui"; ////data-table

const inputData = ref(""); // lưu trữ phần tử của input và được sử dụng để gọi hàm useFetch() để tải dữ liệu từ API
const receivedData = ref(""); // lưu trữ dữ liệu nhận được từ API.Dữ liệu này sẽ được hiển thị trên màn hình để người dùng có thể xem
const fetchData = async () => {
  //hàm này được sử dụng để gọi hàm useFetch() để tải dữ liệu từ API. Sau đó, dữ liệu nhận được từ API sẽ được lưu trữ trong biến receivedData, và được hiển thị trên màn hình để người dùng có thể xem.
  const { data: test } = await useFetch(inputData.value);
  console.log(test);
  receivedData.value = JSON.stringify(test.value, undefined, 2);
};

// -----------------------hidden--------------------------

const showContent = ref(true);
function toggleContent() {
  showContent.value = !showContent.value; // ! thay đổi true flash
} // showContent.value hiển thị giá trị ref
// --------------------------------NewReques----------------------------
const options = [
  {
    label: "GET",
    value: "Option 1",
  },
  {
    label: "POST",
    value: "Option 2",
  },
  {
    label: "PUT",
    value: "Option 3",
  },
  {
    label: "PATCH",
    value: "Option 4",
  },
  {
    label: "DELETE",
    value: "Option 5",
  },
  {
    label: "COPY",
    value: "Option 6",
  },
];
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

  // {
  //   title: "...",
  //   key: "actions",
  //   render(row) {
  //     return h(
  //       NButton,
  //       {
  //         strong: true,
  //         tertiary: true,
  //         size: "small",
  //         onClick: () => play(row),
  //       },
  //       { default: () => "Play" }
  //     );
  //   },
  // },
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
    value: "Option 7",
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
    // render(row) {
    //   return h(
    //     NButton,
    //     {
    //       strong: true,
    //       tertiary: true,
    //       size: "small",
    //       onClick: () => play(row),
    //     },
    //     { default: () => "Play" }
    //   );
    // },
  },
  {
    title: "Bulk Edit",
    key: "length",
  },
  // {
  //   title: "Bulk Edit",
  //   key: "length",
  // },
];

// const play = (row) => {};
// const data = [
//   { no: 3, title: "Wonderwall", length: "4:18" },
//   { no: 4, title: "Don't Look Back in Anger", length: "4:48" },
//   { no: 12, title: "Champagne Supernova", length: "7:27" },
// ];
// let pagination = false;

// const columns = [
//   {
//     title: "No",
//     key: "no",
//   },
//   {
//     title: "Title",
//     key: "title",
//   },
//   {
//     title: "Length",
//     key: "length",
//   },
//   {
//     title: "Action",
//     key: "actions",
//     render(row) {
//       return h(
//         NButton,
//         {
//           strong: true,
//           tertiary: true,
//           size: "small",
//           onClick: () => play(row),
//         },
//         { default: () => "Play" }
//       );
//     },
//   },
// ];

// const data = [
//   { no: 3, title: "Wonderwall", length: "4:18" },
//   { no: 4, title: "Don't Look Back in Anger", length: "4:48" },
//   { no: 12, title: "Champagne Supernova", length: "7:27" },
// ];
</script>
