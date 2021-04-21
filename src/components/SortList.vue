<template>
  <ul @click="showSortList" class="filter">
    {{ sorted }}
    <li>
      <ul v-if="sortMenu">
        <li
          v-for="(item, index) in sortOptions"
          :key="index"
          @click="sortProducts(index, sorted)"
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
  methods: {
    // Показываем/скрываем опции фильтра сотрировки
    showSortList() {
      this.sortMenu = !this.sortMenu;
    },
    sortProducts(index, param) {
      this.sorted = this.sortOptions[index].value;
      param = this.sorted;

      this.$emit("sort-param", param);
    }
  }
};
</script>

<style>
</style>

