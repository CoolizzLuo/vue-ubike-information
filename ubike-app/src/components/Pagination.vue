<template>
  <ul class="pageBar">
    <li @click="updatePage(currPage - 1)" v-show="currPage > 1">
      <i class="fa fa-arrow-left"></i>
    </li>
    <li
      v-for="i in maxPage"
      :key="i"
      :class="{ active: currPage === i }"
      @click="updatePage(i)"
    >
      {{ i }}
    </li>
    <li
      @click="updatePage(currPage + 1)"
      v-show="currPage !== maxPage && maxPage > 1"
    >
      <i class="fa fa-arrow-right"></i>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    currPage: Number,
    maxPage: Number,
  },
  methods: {
    updatePage(page) {
      this.$emit("updatePage", page);
    },
  },
};
</script>

<style>
.pageBar {
  display: flex;
  justify-content: center;
  list-style: none;
}
.pageBar li {
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
