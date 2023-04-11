<template>
  <div>
    <n-input v-model:value="inputData" class="my-5" />
    <n-data-table
      :columns="columnsParams"
      :data="dataParams"
      :row-key="rowKey"
      @update:checked-row-keys="checkActive"
    />
  </div>
</template>

<script setup>
import { NInput } from "naive-ui";

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

const inputData = ref("");

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
              deleteRow(index);
            },
          },
          "delete"
        ),
      ]);
    },
  },
];

// ----------------------------------------cachs2---------------------
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
  [...searchParams.keys()]
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
const deleteRow = (index) => {
  const deletedRow = dataParams.value.splice(index, 1)[0];

  // Xóa các query parameter tương ứng khỏi URL
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
    // Cập nhật lại giá trị của ô input
    inputData.value = url.href;
  }
};
</script>
