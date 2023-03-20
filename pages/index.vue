<template>
  <!-- -wp-content-- -->
  <div class="flex">
    <!-- ----------Sidebar------- -->
    <div class="bg-#F5F5F5 min-h-screen w-78 p-2">
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

        <button class="w-9 h-26px border-none bg-#f5f5f5 ">
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
          class="flex justify-between"
          v-for="(i, index) in items"
          :key="index"
        >
          <n-collapse-item title="New Collection" name="">
            <n-collapse-item
              :title="x.title"
              v-for="(x, index) in i.data"
              :key="index"
            >
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
          <!-- --------dropdown------ -->
          <ClientOnly>
            <n-dropdown
              placement="bottom-start"
              trigger="click"
              size="small"
              :options="options"
              @select="clickFolder(index)"
            >
              <n-button class="p-2"> 
                <div class="i-mdi:equal text-xl "></div>
               </n-button>
            </n-dropdown>
          </ClientOnly>
        </n-collapse>
      </div>
    </div>

    <!-- ------------------------------------------Content--------------------------------------------------- -->
    <div class="content bg-white w-700 p-5 pt-2 pb-2">
      <div>
        <div class="layout-header flex justify-between">
          <div class="">
            <p>New Collection</p>
          </div>
          <div class="mr-5">
            <nav>
              <ul class="flex list-none">
                <li class="ml-5 flex">
                  <div class="i-mdi:share text-xl"></div>
                  <div>Share</div>
                </li>
                <li class="ml-5 flex">
                  <div class="i-mdi:source-fork text-xl"></div>
                  <div>Fork</div>
                </li>
                <li class="ml-5 flex">
                  <div class="i-mdi:eye-arrow-right-outline text-xl"></div>
                  <div>Watch</div>
                </li>
                <li class="ml-5 flex">
                  <div class="i-mdi:play-box-multiple-outline text-xl"></div>
                  <div>Run</div>
                </li>

                <li class="ml-5 flex">
                  <div class="i-mdi:content-save text-xl"></div>
                  <div>Save</div>
                </li>
                <li class="ml-5 flex">
                  <div class="i-mdi:dots-horizontal text-xl"></div>
                  <div></div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <hr />
        <div class="layout content">
          <div class="box menu">
            <ul class="list-none flex p-0 m-0">
              <li class="mr-5">
                <a href="" class="decoration-none text-black"> Authorization</a>
              </li>

              <li class="mr-5">
                <a href="" class="decoration-none text-black"
                  >Pre-request Scriat
                </a>
              </li>
              <li class="mr-5">
                <a href="" class="decoration-none text-black">Test</a>
              </li>
              <li class="mr-5">
                <a href="" class="decoration-none text-black"> Variables</a>
              </li>
              <li class="mr-5">
                <a href="" class="decoration-none text-black">Runs </a>
              </li>
            </ul>

            <div>
              <p class="mb-5">
                These variables are specific to this collection and its request.
                Learn more about collection variables
              </p>
            </div>
          </div>
          <div class="box content">
            <div>
              <form action="" id="search" class="relative mb-2">
                <input
                  class="pt-1 pb-1 pr-8 pl-10"
                  type="text"
                  placeholder="Filter variables"
                />
                <div class="w-5 p-1 absolute top-0 leth-55">
                  <div class="i-mdi:magnify text-xl"></div>
                </div>
              </form>
            </div>
            <div class="Table">
              <n-table :bordered="false" :single-line="false">
                <thead>
                  <tr>
                    <th></th>
                    <th>VARIABLE</th>
                    <th>INTIAL VAULE</th>
                    <th>CURRENT VALUE</th>
                    <th>...</th>
                    <th>Pesist All</th>
                    <th>Reset All</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value=""
                      />
                    </td>
                    <td>
                      <input type="text" class="b-none" />
                    </td>
                    <td>
                      <input type="text" class="b-none" />
                    </td>
                    <td>
                      <input type="text" class="b-none" />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <input
                        type="text"
                        class="b-none"
                        placeholder="Add new variable"
                      />
                    </td>
                    <td><input type="text" class="b-none" /></td>
                    <td><input type="text" class="b-none" /></td>
                  </tr>
                </tbody>
              </n-table>
            </div>
          </div>
        </div>
      </div>
    </div>
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

const optionss = [
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

const clickFolder = (index) => {
  console.log(
    "🚀 ~ file: index.vue:108 ~ clickFolder ~ clickFolder:",
    index,
    items.value[index]
  );

  let dataFolder = {
    title: "New Folder",
    data: [],
  };
  items.value[index].data.push(dataFolder);
};
// ------------------------Request----------------------
const clickRequest = (index) => {
  console.log(
    "🚀 ~ file: index.vue:165 ~ clickRequest ~ clickRequest:",
    clickRequest,
    index,
    items.value[index]
  );

  let dataRequest = {
    title: "New request",
    data: [],
  };
  items.value[index].data.push(dataRequest);
};

// -------------checkbox-----------------

// Từ addfold push vào new collection
</script>
