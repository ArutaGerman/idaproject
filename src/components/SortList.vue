<template>
  <ul @click="showSortList" class="filter">
    {{ sorted }}
    <li>
      <ul v-if="sortMenu">
        <li
          v-for="(item, index) in sortOptions"
          :key="index"
          @click="sortProducts(index)"
        >{{ item.name }}</li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
        sorted: "популярности",
      sortOptions: [
        { name: "По цене", value: "цене" },
        { name: "По популярности", value: "популярности" }
      ],
      sortMenu: false
    };
  },
  methods:{
      // Показываем/скрываем опции фильтра сотрировки
    showSortList() {
      this.sortMenu = !this.sortMenu;
    },
    sortProducts(index) {
      this.sorted = this.sortOptions[index].value;
    }
  }
};
</script>

<style>
</style>

