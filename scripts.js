const app = Vue.createApp({
  data () {
    return {
      uBikeStops: [],
      filterOption: {
        stopName: '',
        arena: 'all',
        available: false,
        count: 0,
      },
      pageOption: {
        currPage: 1,
        pageSize: 20,
      },
      sortOption: {
        obj: '', // sbi, tot
        sort: '', // asc or desc
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
      return this.uBikeStops.filter(stop => stop.sna.indexOf(this.filterOption.stopName) != -1);
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
    maxPage() {
      return Math.ceil(this.filterAvailable.length / this.pageOption.pageSize);
    },
    pageStops() {
      const { currPage, pageSize} = this.pageOption;
      return this.filterAvailable.slice(currPage * pageSize - pageSize, currPage *pageSize);
    },
    sortStops() {
      const sortObj = this.sortOption.obj;
      return sortObj ? this.pageStops.sort((a, b) => this.sortOption.sort ? a[sortObj] - b[sortObj] : b[sortObj] - a[sortObj]) : this.pageStops;
    },
  },
  methods: {
    timeFormat(t){
      let date = [], time = [];

      date.push(t.substr(0, 4));
      date.push(t.substr(4, 2));
      date.push(t.substr(6, 2));
      time.push(t.substr(8, 2));
      time.push(t.substr(10, 2));
      time.push(t.substr(12, 2));

      return date.join("/") + ' ' + time.join(":");
    },
    setSort(obj) {
      if(this.sortOption.obj === obj) {
        this.sortOption.sort = !this.sortOption.sort;
      } else {
        this.sortOption.obj = obj;
        this.sortOption.sort = true;
      }
    },
  },
  created () {
    fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
        .then(res => res.json())
        .then(json => {
          const stops = Object.keys(json.retVal).map(key => json.retVal[key]);
          this.uBikeStops = stops;
        });
  }
}).mount('#app');