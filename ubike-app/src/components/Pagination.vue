<template>
    <ul class="pageBar">
        <li @click="currPage--" v-show="currPage > 1"><i class="fa fa-arrow-left"></i></li>
        <li v-for="i in maxPage" :key=i :class="{'active': currPage === i}" @click="currPage=i">{{ i }}</li>
        <li @click="currPage++" v-show="currPage !== maxPage && maxPage > 1"><i class="fa fa-arrow-right"></i></li>
    </ul>
</template>

<script>
export default {
    props: {
            page: Number,
            maxPage: Number,
    },
    data() {
        return {
            currPage: this.page,
        }
    },
    watch: {
        currPage() {
            this.$emit('updatePage', this.currPage);
        }
    },
}
</script>

<style>
.pageBar {
  display: flex;
  justify-content: center;
  list-style: none;
}
.pageBar li{
  display: inline-block;
  width: 30px;
  text-align: center;
  border: 1px solid #000;
  font-size: 22px;
  margin: 0 5px;
  cursor: pointer;
}
.pageBar li:hover {
  background: rgb(66, 64, 64);
  color: #eee;
}
.pageBar li.active {
  background: rgb(66, 64, 64);
  color: #eee;
}
</style>