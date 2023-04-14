<template >
  <!-- ------------------------------------------Page--------------------------------------------------- -->
  <div class="Page bg-white w-100% ">
    <div >
      <div class="layout-header flex justify-between p-2 ">
        <div>
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
                1
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
        <div class="box menu ">
          <n-card >
            <n-tabs type="line" animated>
              <n-tab-pane name="oasis" tab="Auth">  </n-tab-pane>
              <n-tab-pane name="the beatles" tab="Pre-req">
              
              </n-tab-pane>

              <n-tab-pane name="jay chou" tab="Variables">
                <div>
                  <p class="mb-5">
                    These variables are specific to this collection and its
                    request. Learn more about collection variables
                  </p>
                </div>
                <div>
                  <form action="" id="search" class="mb-2 relative">
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
                <div class="box content">
                  <div class="Table">
                    <n-data-table
                      :columns="columns"
                      :data="data"
                      :pagination="pagination"
                      :bordered="false"
                      class="text-xs"
                    />
                  </div>
                </div>
              </n-tab-pane>
            </n-tabs>
          </n-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, defineComponent } from "vue";
import { NButton, useMessage } from "naive-ui";

const columns = [
  {
    title: "No",
    key: "no",
  },
  {
    title: "Title",
    key: "title",
  },
  {
    title: "Length",
    key: "length",
  },
  {
    title: "Action",
    key: "actions",
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          onClick: () => play(row),
        },
        { default: () => "Play" }
      );
    },
  },
];
const play = (row) => {};
const data = [
  { no: 3, title: "Wonderwall", length: "4:18" },
  { no: 4, title: "Don't Look Back in Anger", length: "4:48" },
  { no: 12, title: "Champagne Supernova", length: "7:27" },
];
let pagination = false;
</script>
