<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>場站名稱</th>
        <th>場站區域</th>
        <th @click="setSort('sbi')">
          目前可用車輛
          <template v-if="obj === 'sbi'">
            <i class="fa fa-sort-asc" aria-hidden="true" v-show="!isAsc"></i>
            <i class="fa fa-sort-desc" aria-hidden="true" v-show="isAsc"></i>
          </template>
        </th>
        <th @click="setSort('tot')">
          總停車格
          <template v-if="obj === 'tot'">
            <i class="fa fa-sort-asc" aria-hidden="true" v-show="!isAsc"></i>
            <i class="fa fa-sort-desc" aria-hidden="true" v-show="isAsc"></i>
          </template>
        </th>
        <th>資料更新時間</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ sno, sna, sarea, sbi, tot, mday } in list" :key="sno">
        <td>{{ sno }}</td>
        <td>{{ sna }}</td>
        <td>{{ sarea }}</td>
        <td>{{ sbi }}</td>
        <td>{{ tot }}</td>
        <td>{{ timeFormat(mday) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["list", "objTemp", "isAscTemp"],
  computed: {
    obj: {
      get() {
        return this.objTemp;
      },
      set(val) {
        this.sendChangeSort(val, this.isAscTemp);
      },
    },
    isAsc: {
      get() {
        return this.isAscTemp;
      },
      set(val) {
        this.sendChangeSort(this.objTemp, val);
      },
    },
  },
  methods: {
    timeFormat(t) {
      let date = [],
        time = [];

      date.push(t.substr(0, 4));
      date.push(t.substr(4, 2));
      date.push(t.substr(6, 2));
      time.push(t.substr(8, 2));
      time.push(t.substr(10, 2));
      time.push(t.substr(12, 2));

      return date.join("/") + " " + time.join(":");
    },
    setSort(obj) {
      this.obj !== obj ? (this.obj = obj) : (this.isAsc = !this.isAsc);
    },
    sendChangeSort(obj, isAsc) {
      this.$emit("sortChange", obj, isAsc);
    },
  },
};
</script>
