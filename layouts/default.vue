<template>
  <!-- -wp-content-- -->
  <div class="flex ">
    <!-- ----------Sidebar------- -->
    <div class="bg-#F5F5F5 min-h-screen w-25% p-2">
      <!-- ----header-sb---------- -->
      <div class="flex">
        <button class="h-26px border-none bg-#f5f5f5" @click="addCollection">
          <div class="i-mdi:plus text-xl"></div>
        </button>

        <form action="" id="search" class="relative">
          <input class="pt-1 pb-1 pr-8 pl-10" type="text" />
          <div class="w-5 p-1 absolute top-0 right-51 bg-none border-none">
            <div class="i-mdi:equal text-xl"></div>
          </div>
        </form>

        <button class="w-9 h-26px border-none bg-#f5f5f5">
          <div class="i-mdi:dots-horizontal text-xl"></div>
        </button>
      </div>
      <!-- -----------------------------------content-sb-------------------------------------------- -->

      <div>
        <!-- <ul class="list-none">
          <li v-for="(i, index) in items" :key="index" >
            {{ i }}</li>   // vif sao o collapse không cần {{ i }}- vì đã có title="" ở n-collapse-item
        </ul> -->
        <n-collapse
          class="flex justify-between mt-4"
          v-for="(i, index) in items"
          :key="index"
        >
          <n-collapse-item title="New Collection" name="">
            <n-collapse-item
              :title="x.title"
              v-for="(x, index) in i.data"
              :key="index"
            >
            <nuxt-link to="/detail" class="flex space-x-2 decoration-none">
            <p class="text-green text-lg">Get</p>
            <p>NewReques</p>
            </nuxt-link>
              <!-- <div
                :title="x.title"
                v-for="(x, index) in i.data"
                :key="index"
              ></div> -->
            </n-collapse-item>

            <!-- <ClientOnly>
              <n-dropdown
                placement="bottom-start"
                trigger="click"
                size="small"
                :options="optionss"
                @select="clickRequest(index)"
              >
                <n-button> = </n-button>
              </n-dropdown>
            </ClientOnly> -->
          </n-collapse-item>
          <!-- --------------------dropdown----------------------- -->

          <n-dropdown
            placement="bottom-start"
            trigger="click"
            size="small"
            :options="options"
            @select="(key) => clickFolder(index, key)"
          >
            <n-button class="p-2">
              <div class="i-mdi:dots-horizontal text-xl"></div>
            </n-button>
          </n-dropdown>
        </n-collapse>
      </div>
    </div>
    <slot />
  </div>
</template>
<script setup>
//import { title } from "process";

const items = ref([]);

const addCollection = () => {
  let newItem = {
    title: "New Collection",
    data: [],
  };
  items.value.push(newItem);
  console.log(newItem);
};

// const addCollection = () => {
//   let newItem =
//      "New Collection"

//   items.value.push(newItem);
//   console.log(newItem);
// };

//--------bật dropdown--------

// const optionss = [
//   {
//     label: "Add Folder",
//     //value: "option1",
//     key: 1,
//   },
//   {
//     label: "Edit",
//     // value: "option2",
//     key: 2,
//   },
//   {
//     label: "Delete",
//     // value: "option3",
//     key: 3,
//   },
// ];

const options = [
  {
    label: "Add Folder",
    //value: "option1",
    key: 1,
  },
  {
    label: "Edit",
    // value: "option2",
    key: 2,
  },
  {
    label: "Delete",
    // value: "option3",
    key: 3,
  },
];
// ----add folder------
// const alldata = [
//   {

//     title: "new colection",
//     data: [],
//   },
// ];

const clickFolder = (index, key) => {
  if (key === 1) {
    let dataFolder = {
      title: "New Folder",
      data: [],
    };
    items.value[index].data.push(dataFolder);
  } else if (key === 2) {
    console.log("key 2")
  }else {

  }
};

// // ------------------------Request----------------------
// const clickRequest = (index) => {
//   console.log(
//     "🚀 ~ file: index.vue:165 ~ clickRequest ~ clickRequest:",
//     clickRequest,
//     index,
//     items.value[index]
//   );

//   let dataRequest = {
//     title: "New request",
//     data: [],
//   };
//   items.value[index].data.push(dataRequest);
// };

// -------------checkbox-----------------

// Từ addfold push vào new collection
</script>
