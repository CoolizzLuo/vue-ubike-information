<template>
    <div class="searchBar">
      <label>站點名稱搜尋：<input type="text" :value="stopName" @input="updateHandler('stopName', $event)"></label>
      <label>行政區篩選：
        <select :value="arena" @change="updateHandler('arena', $event)">
          <option value="all">不限區域</option>
          <option>中正區</option>
          <option>大同區</option>
          <option>中山區</option>
          <option>松山區</option>
          <option>大安區</option>
          <option>萬華區</option>
          <option>信義區</option>
          <option>士林區</option>
          <option>北投區</option>
          <option>內湖區</option>
          <option>南港區</option>
          <option>文山區</option>
        </select>
      </label>
      <label>每頁顯示數量：
        <select :value="pageSize" @change="sendPageSize">
          <option>20</option>
          <option>25</option>
          <option>30</option>
          <option>35</option>
          <option>40</option>
        </select>
      </label>
      <label>
        <input type="checkbox" :value="available" @input="updateHandler('available')">僅顯示可用車輛大於
        <select :value="count" @change="updateHandler('count', $event)">
          <option>0</option>
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
        </select>
      </label>
    </div>
</template>

<script>
export default {
    props: {
        // filterOption
        stopName: String,
        arena: String,
        available: Boolean,
        count: Number,
        // pageOption
        pageSize: Number,
        
    },
    methods: {
      updateHandler(key, e) {
        if (key === 'available') return this.sendSearchFilter(key, !this.available);

        let value = e.target.value;
        value = (key === 'count' || key === 'pageSize') ? Number(value) : value.trim();
        this.sendSearchFilter(key, value);
      },
      sendSearchFilter(key, value) {
        this.$emit('updateSearch', key, value);
      },
      sendPageSize(e) {
        this.$emit('updatePageSize', Number(e.target.value));
      }
    },
}
</script>

<style>
.searchBar {
  display: flex;
  /* font-size: 20px; */
  margin-bottom: 10px;
}
.searchBar label {
  margin: 0 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  background: #f4f4f4;
  border-radius: 10px;
}
input[type=text] {
  font-size: 14px;
}
</style>