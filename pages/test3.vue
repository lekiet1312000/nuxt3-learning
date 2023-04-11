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
    <pre>{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
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

const inputParams = ref("https://dantri.com.vn/");

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
      });
    },
  },
];
const pagination = () => ({
  pageSize: 10,
});
const checkActive = (key) => {
  if (key.length !== 0) {
    let x = data.value[key];
    inputParams.value = `${inputParams.value}?${x.key}=${x.value}`;
    console.log("jkdsafjksdbfjkb", data.value[key]);
  } else {
    inputParams.value = "https://dantri.com.vn/";
  }
};
// ----------------------------Params------------------------
// const getRowIdByKey = (key) => {
//   const row = data.value.find((row) => row.key === key);
//   return row ? row.id : null;
// };
// const checkActive = (checkedRowKeys) => {
//   let url;
//   try {
//     url = new URL(inputParams.value);
//   } catch (error) {
//     console.log("Invalid URL:", inputParams.value);
//     return;
//   }

//   const searchParams = url.searchParams;

//   // Xóa các cặp key-value được thêm vào URL bởi checkActive
//   [...searchParams.keys()]
//     .filter(key => !checkedRowKeys.includes(getRowIdByKey(key)))
//     .forEach(key => searchParams.delete(key));

//   // Thêm các cặp key-value vào URL
//   const newParams = data.value
//     .filter(row => checkedRowKeys.includes(row.id))
//     .map(row => `${row.key}=${row.value}`)
//     .join('&');

//   // Thay đổi query parameter trên URL và lưu vào inputParams
//   url.search = newParams;
//   inputParams.value = url.href;
// };
// -----------cách2--------------
// -------------------------------------
// const checkActive = (checkedRowKeys) => {
//   let url;
//   try {
//     url = new URL(inputData.value);
//   } catch (error) {
//     console.log("Invalid URL:", inputData.value);
//     return;
//   }

//   const searchParams = url.searchParams;

//   const originalParams = {};

//   // Lưu giá trị query parameter ban đầu của URL vào originalParams
//   for (const [key, value] of searchParams) {
//     originalParams[key] = value;
//   }

//   // Xóa các cặp key-value được thêm vào URL bởi checkActive
//   for (const row of dataParams.value) {
//     if (!checkedRowKeys.includes(row.id) && searchParams.has(row.key)) {
//       searchParams.delete(row.key);
//     }
//   }

//   // Thêm các cặp key-value vào URL
//   let params = "";
//   for (let i = 0; i < dataParams.value.length; i++) {
//     const row = dataParams.value[i];
//     if (checkedRowKeys.includes(row.id)) {
//       if (params === "") {
//         params += `?${row.key}=${row.value}`;
//       } else {
//         params += `&${row.key}=${row.value}`;
//       }
//       searchParams.set(row.key, row.value);
//     }
//   }

//   // Thay đổi query parameter trên URL và lưu vào inputParams
//   url.search = params;
//   inputData.value = url.href;
// };
// --------------------------------------------
// const deleteRow = (index) => {
//   const deletedRow = dataParams.value.splice(index, 1)[0];

//   // Xóa các query parameter tương ứng khỏi URL
//   let url;
//   try {
//     url = new URL(inputData.value);
//   } catch (error) {
//     console.log("Invalid URL:", inputData.value);
//     return;
//   }

//   const searchParams = url.searchParams;
//   if (searchParams.has(deletedRow.key)) {
//     searchParams.delete(deletedRow.key);
//       // Cập nhật lại giá trị của ô input
//     inputData.value = url.href;
//   }
// };
</script>