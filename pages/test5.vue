<template>
  <div class="flex">
    <div
      class="bg-gray-100 min-h-screen pt-15px pb-10px pr-10px pl-10px box-border w-300px"
    >
      <div class="flex justify-between">
        <button class="p-0 border-none bg-gray-100" @click="addCollection">
          <div class="i-mdi:plus text-xl text-gray-500"></div>
        </button>

        <form action="" id="search" class="relative">
          <input class="pt-1.5 pb-1.5 pl-7 pr-4" type="text" />
          <div class="w-5 p-1 absolute top-0.001 right-45 bg-none border-none">
            <div class="i-mdi:equal text-xl text-gray-500"></div>
          </div>
        </form>

        <button class="p-0 border-none bg-gray-100">
          <div
            class="i-mdi:dots-horizontal text-xl pl-1 text-gray-500 p-"
          ></div>
        </button>
      </div>
      <!-- ---------------------------- -->
      <div>
        <n-collapse
          class="flex justify-between mt5"
          v-for="(collection, collectionIndex) in collections"
          :key="collection.id"
        >
          <n-collapse-item :title="collection.name" name="">
            <n-collapse-item
              class="justify-between items-center"
              :title="folder.name"
              v-for="(folder, folderIndex) in collection.folders"
              :key="folder.id"
            >
              <nuxt-link
                to="/detail"
                class="flex space-x-2 decoration-none items-center ml-5"
              >
                <p class="text-green text-3 m-0 font font-400">GET</p>
                <p class="mt-0 mb-0 text-gray-700">NewRequest</p>
              </nuxt-link>
            </n-collapse-item>
          </n-collapse-item>

          <n-dropdown
            placement="bottom-start"
            trigger="click"
            size="small"
            :options="options"
            @select="(key) => clickFolder(collectionIndex, key)"
          >
            <button
              class="p-2 pr-19px cursor-pointer border-none text-gray-500 i-mdi:dots-horizontal text-xl"
            ></button>
          </n-dropdown>
        </n-collapse>
        <!-- --------------------------- -->
        <n-collapse
          class="flex justify-between mt-4"
          v-for="(collection, collectionIndex) in items"
          :key="collectionIndex"
        >
          <n-collapse-item :title="collection.title" name="" class="pl-2.5px">
            <n-collapse-item
              :title="folder.title"
              v-for="(folder, folderIndex) in collection.data"
              :key="folderIndex"
            >
              <nuxt-link
                to="/detail"
                class="flex space-x-2 decoration-none items-center ml-5"
              >
                <p class="text-green text-3 m-0 font font-400">GET</p>
                <p class="mt-0 mb-0 text-gray-700">NewRequest</p>
              </nuxt-link>
            </n-collapse-item>
          </n-collapse-item>

          <n-dropdown
            placement="bottom-start"
            trigger="click"
            size="small"
            :options="options"
            @select="(key) => clickFolder(collectionIndex, key)"
          >
            <button
              class="p-2 pr-19px cursor-pointer border-none text-gray-500 i-mdi:dots-horizontal text-xl"
            ></button>
          </n-dropdown>
        </n-collapse>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const items = ref([]);
const collections = ref([]);

// Khôi phục dữ liệu từ localStorage

const savedItems = localStorage.getItem("items");
if (savedItems) {
  items.value = JSON.parse(savedItems);
}
const collectionhhhDdata = await axios.get("http://127.0.0.1:8000/collection");
collections.value = collectionhhhDdata.data;

// Lưu trữ dữ liệu vào localStorage trước khi trang được tải lại
window.addEventListener("beforeunload", () => {
  localStorage.setItem("items", JSON.stringify(items.value));
});

const addCollection = () => {
  return new Promise((resolve, reject) => {
    let newItem = { title: "New Collection", data: [] };
    axios
      .post("http://127.0.0.1:8000/collection", {
        name: newItem.title,
      })
      .then((response) => {
        newItem.id = response.data.id;
        newItem.name = response.data.name;
        collections.value.push(newItem);
        resolve(newItem); // trả về giá trị mới của bộ sưu tập
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const options = [
  { label: "Add Folder", key: 1 },
  { label: "Rename", key: 2 },
  { label: "Delete", key: 3 },
];
// --------------------------------------
const deleteCollection = (collectionIndex) => {
  let collectionToDelete = collections.value[collectionIndex];

  // delete the collection from the database
  axios
    .delete(`http://127.0.0.1:8000/collection`, {
      params: { id: collectionToDelete.id },
    })
    .then(async (response) => {
      console.log(response.data);
      if (response.status) {
        console.log(response.data);
        const collectionhhhDdata = await axios.get(
          "http://127.0.0.1:8000/collection"
        );
        collections.value = collectionhhhDdata.data;
      } else {
        // Nếu trả về false, xử lý lỗi ở đây
      }
      // Xóa bộ sưu tập khỏi cơ sở dữ liệu thành công
    })
    .catch((error) => {
      console.error(error);
      // Xóa bộ sưu tập không thành công, xử lý lỗi ở đây
      // Ví dụ: hiển thị thông báo lỗi cho người dùng
    });
};

// ----------------------------------
const clickFolder = (collectionIndex, key) => {
  if (key === 1) {
    // add a new folder to the selected collection
  } else if (key === 2) {
    // rename the selected collection
    let newName = prompt("Enter new collection name:");
    if (newName) {
      collections.value[collectionIndex].name = newName;
      const updatedCollection = {
        id: collections.value[collectionIndex].id,
        name: newName,
      };
      axios
        .put(`http://127.0.0.1:8000/collection`, updatedCollection)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  } else if (key === 3) {
    // delete the selected collection
    deleteCollection(collectionIndex);
  }
};
</script>
