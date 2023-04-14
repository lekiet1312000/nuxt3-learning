<template>
  <!-- -wp-content-- -->
  <div class="flex ">
    <!-- ----------Sidebar------- -->
    <div class="bg-#F5F5F5 min-h-screen pt-15px pb-10px pr-10px pl-10px box-border w-300px">
      <!-- ----header-sb---------- -->
      <div class="flex justify-between ">
        <button class="p-0 border-none bg-#f5f5f5" @click="addCollection">
          <div class="i-mdi:plus text-xl text-gray-5"></div>
        </button>

        <form action="" id="search" class="relative">
          <input class="pt-1.5 pb-1.5 pl-7 pr-4" type="text" />
          <div class="w-5 p-1 absolute top-0.001 right-45 bg-none border-none">
            <div class="i-mdi:equal text-xl text-gray-5"></div>
          </div>
        </form>

        <button class="p-0 border-none bg-#f5f5f5">
          <div class="i-mdi:dots-horizontal text-xl pl-1 text-gray-5 p-"></div>
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
          <n-collapse-item title="New Collection" name="" class="pl-2.5px">
            <n-collapse-item
              :title="x.title"
              v-for="(x, index) in i.data"
              :key="index"
            >
              <nuxt-link to="/detail" class="flex space-x-2 decoration-none items-center">
                <p class="text-green text-3 m-0 font font-400 ">GET</p>
                <p class="mt-0 mb-0 text-#212121 ">NewRequest</p>
              </nuxt-link>
            </n-collapse-item>
          </n-collapse-item>
          <!-- --------------------dropdown----------------------- -->

          <n-dropdown
            placement="bottom-start"
            trigger="click"
            size="small"
            :options="options"
            @select="(key) => clickFolder(index, key)"
          >
            <button class="p-2 pr-19px cursor-pointer border-none text-gray-5 i-mdi:dots-horizontal text-xl ">
              
            </button>
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

const clickFolder = (index, key) => {
  if (key === 1) {
    let dataFolder = {
      title: "New Folder",
      data: [],
    };
    items.value[index].data.push(dataFolder);
  } else if (key === 2) {
    console.log("key 2");
  } else {
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
