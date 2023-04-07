<template>
  <div>
    <n-input v-model:value="inputParams" class="my-5" />
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :row-key="rowKey"
      @update:checked-row-keys="checkActive"
    />
  </div>
  <!-- <pre>{{ JSON.stringify(data, null, 2) }}</pre> -->
</template>

<script setup>
import { NInput } from "naive-ui";

const rowKey = (row) => {
  return row.id;
};

const data = ref([
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

const inputParams = ref("https://642541e49e0a30d92b2ccf2a.mockapi.io/comment");

const columns = [
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
          data.value[index].key = v;
        },
        onInput() {
          // Thêm một dòng mới vào mảng data nếu ô input cuối cùng có giá trị khác rỗng
          const lastIndex = data.value.length - 1;
          if (
            data.value[lastIndex].key !== "" ||
            data.value[lastIndex].value !== "" ||
            data.value[lastIndex].description !== ""
          ) {
            data.value.push({
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
          data.value[index].value = v;
        },
        onInput() {
          // Thêm một dòng mới vào mảng data nếu ô input cuối cùng có giá trị khác rỗng
          const lastIndex = data.value.length - 1;
          if (
            data.value[lastIndex].key !== "" ||
            data.value[lastIndex].value !== "" ||
            data.value[lastIndex].description !== ""
          ) {
            data.value.push({
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
          data.value[index].description = v;
        },
        onInput() {
          // Thêm một dòng mới vào mảng data nếu ô input cuối cùng có giá trị khác rỗng
          const lastIndex = data.value.length - 1;
          if (
            data.value[lastIndex].key !== "" ||
            data.value[lastIndex].value !== "" ||
            data.value[lastIndex].description !== ""
          ) {
            data.value.push({
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
      return h("div", [
       
        h(
          "button",
          {
            onClick() {
              data.value.splice(index, 1);
            },
          },
          "Delete"
        ),
      ]);
    },
  },
];

const pagination = () => ({
  pageSize: 10,
});

const checkActive = (keys) => {
  if (keys.length > 0) {
    let params = "";
    keys.forEach((key) => {
      let x = data.value[key];
      params += `${x.key}=${x.value}&`;
    });
    inputParams.value = `${inputParams.value}?${params.slice(0, -1)}`;
  } else {
    inputParams.value = "https://642541e49e0a30d92b2ccf2a.mockapi.io/comment";
  }
};
</script>
