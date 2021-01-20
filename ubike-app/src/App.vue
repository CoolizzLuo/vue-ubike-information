<template>
  <h1>YouBike 臺北市公共自行車即時資訊</h1>
  <p>
    Day2 練習8：YouBike 臺北市公共自行車即時資訊 <br>
    1. 將搜尋單獨切成 Search.vue 組件 |
    2. 表格部分獨立切成 UbikeTable.vue 組件 |
    3. ⾴碼部分獨立切成 Pagination.vue 組件
  </p>
  <hr>
  <search-component v-bind="filterOption" :pageSize="pageOption.pageSize" @updateSearch="updateSearch" @updatePageSize="updatePageSize"/>
  <ubike-component :objTemp="sortOption.obj" :isAscTemp="sortOption.isAsc" :list="pageStops" @sortChange="updateSort" />
  <page-component :currPage="pageOption.currPage" :maxPage="maxPage" @updatePage="updatePage"/>
  
</template>

<script>
import searchComponent from './components/Search.vue'
import ubikeComponent from './components/UbikeTable.vue'
import pageComponent from './components/Pagination.vue'

export default {
  components: {
    searchComponent,
    ubikeComponent,
    pageComponent
  },
  data () {
    return {
      uBikeStops: [],
      filterOption: {
        stopName: '',
        arena: 'all',
        available: false,
        count: 0,
      },
      sortOption: {
        obj: '', // sbi, tot
        isAsc: false,
      },
      pageOption: {
        currPage: 1,
        pageSize: 20,
      },
    }
  },
  watch: {
    filterAvailable() {
      this.pageOption.currPage = 1;
    },
    'pageOption.pageSize'() {
      this.pageOption.currPage = 1;
    },
  },
  computed: {
    filterStops() {
      return this.uBikeStops.filter(stop => stop.sna.includes(this.filterOption.stopName));
    },
    filterArena() {
      if(this.filterOption.arena === 'all') return this.filterStops;
      return this.filterStops.filter(stop => stop.sarea === this.filterOption.arena);
    },
    filterAvailable() {
      const { available, count } = this.filterOption;
      if(!available) return this.filterArena;
      return this.filterArena.filter(stop => stop.sbi > count);
    },
    sortStops() {
      const { obj, isAsc } = this.sortOption;
      let sortArr = [...this.filterAvailable];
      return obj ? sortArr.sort((a, b) => isAsc ? a[obj] - b[obj] : b[obj] - a[obj]) : sortArr;
    },
    maxPage() {
      return Math.ceil(this.filterAvailable.length / this.pageOption.pageSize);
    },
    pageStops() {
      const { currPage, pageSize} = this.pageOption;
      return this.sortStops.slice(currPage * pageSize - pageSize, currPage *pageSize);
    },

  },
  methods: {
    updateSearch(obj, value) {
      this.filterOption[obj] = value;
    },
    updateSort(obj, isAsc) {
      this.sortOption = {obj, isAsc};
    },
    updatePage(currpage) {
      this.pageOption.currPage = currpage;
    },
    updatePageSize(size) {
      this.pageOption.pageSize = size;
    }
  },
  created () {
    fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
        .then(res => res.json())
        .then(json => {
          const stops = Object.keys(json.retVal).map(key => json.retVal[key]);
          this.uBikeStops = stops;
        });
  }
}
</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css";
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

body {
  padding: 1em;
}
</style>