const app = Vue.createApp({
  data () {
    return {
      uBikeStops: [],
      filterOption: {
        stopName: '',
        arena: 'all',
        available: false,
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
  computed: {
    filterStops() {
      return this.uBikeStops.filter(stop => stop.sna.indexOf(this.filterOption.stopName) != -1);
    },
    filterArena() {
      if(this.filterOption.arena === 'all') return this.filterStops;
      return this.filterStops.filter(stop => stop.sarea === this.filterOption.arena);
    },
    filterAvailable() {
      if(!this.filterOption.available) return this.filterArena;
      return this.filterArena.filter(stop => stop.sbi > 0);
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