<template>
  <main :class="$style.mainContent">
    <div :class="$style.mainContentInner">
      <div :class="$style.mainContentHeaderWrap">
        <span :class="$style.title">Каталог</span>
        <div :class="$style.sortBlockWrap">
          <span :class="$style.sortTitle">Сортировать по: </span>
          <sort-list
            :sortMenuVisible="sortMenuVisible"
            :sortedSelectParam="sortedSelectParam"
            :sortOptions="sortOptions"
            @sort-param="sortProducts"
            @show-sort="showSortList"
            @hide-sort="hideSortList"
          ></sort-list>
        </div>
      </div>
      <div :class="$style.dflexNoWrap">
        <side-menu
          :categories="categories"
          @get-categories="getCategories"
          @get-goods="getGoods"
        ></side-menu>
        <div :class="[$style.contentWrap, $style.dflex]">
          <goods-list
            :paginationGoods="paginationGoods"
            @get-goods="getGoods"
          ></goods-list>
          <Pagination
            :countPages="countPages"
            :hasNextPage="hasNextPage"
            :currentPage="currentPage"
            @update-current-page="getCurrentPage"
          >
          </Pagination>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import "whatwg-fetch";
import { mapGetters, mapActions } from "vuex";
import { fetchProducts, fetchCategories } from "../api/api";

export default {
  data() {
    return {
      // SortList data
      sortedSelectParam: "популярности",
      sortOptions: [
        { name: "По цене", value: "цене" },
        { name: "По популярности", value: "популярности" },
      ],
      sortMenuVisible: false,
      // Goods data
      categories: [],
      goods: [],
      // Pagination data
      currentPage: 1,
      goodsPerPage: 12,
      hasNextPage: true,
    };
  },

  components: {
    GoodsList: () => import("@/components/GoodsList"),
    SideMenu: () => import("@/views/SideMenu"),
    SortList: () => import("@/components/SortList"),
    Pagination: () => import("@/components/common/BasePagination"),
  },

  computed: {
    ...mapGetters(["products/idCategories"]),

    // Отслеживаем изменения в параметре сортировки. По-умолчанию сортируется по популярности
    sortedProducts() {
      const sort = (param) => {
        switch (param) {
          case "цене":
            this.goods.sort((prev, curr) => prev.price - curr.price);
            return this.goods;
          case "популярности":
            this.goods.sort((prev, curr) => curr.rating - prev.rating);
            return this.goods;
          default:
            this.goods.sort((prev, curr) => curr.rating - prev.rating);
            return this.goods;
        }
      };
      return sort(this.sortedSelectParam);
    },

    // Расчет количества страниц товаров для пагинации
    countPages() {
      let quantity = null;
      quantity = Math.ceil(this.sortedProducts.length / this.goodsPerPage);
      return quantity;
    },

    // Раскидываем товары по страницам для пагинации
    paginationGoods() {
      return this.countPaginationGoods();
    },
  },

  mounted() {
     // Если есть sessionStorage, для отправки запроса в api, id запрашиваемой категории товаров берется из sessionStorage, иначе id = 1
    JSON.parse(sessionStorage.getItem("idCategory"))
      ? this["products/getID"](JSON.parse(sessionStorage.getItem("idCategory")))
      : this["products/getID"](1);
    
    this.getCategories; //Запускаем получение категорий оп api
    this.getGoods(); //Запускаем получение товаров по api
  },

  methods: {
    ...mapActions(["products/getID"]),

    // Получаем категории товаров из api
    getCategories() {
      fetchCategories().then(answer => this.categories.push(...answer))
    },

    // Получаем товары по выбранной категории из api
    getGoods() {
      this.goods = [];      
      fetchProducts(this["products/idCategories"]).then(answer => this.goods.push(...answer))
    },

    // Получаем параметр для сортировки из SortList.vue
    sortProducts(param) {
      this.sortedSelectParam = param;
    },

    // Показываем/скрываем опции фильтра сортировки
    showSortList() {
      this.sortMenuVisible = !this.sortMenuVisible;
    },

    // Скрываем опции фильтра сортировки по клику вне списка сортировки
    hideSortList() {
      this.sortMenuVisible = false;
    },

    // Отображаем this.goodsPerPage товаров и создаем пагинацию для переключения по страницам
    countPaginationGoods() {
      const start = (this.currentPage - 1) * this.goodsPerPage;
      const end = this.currentPage * this.goodsPerPage;
      this.hasNextPage = this.sortedProducts.length > end;
      return this.sortedProducts.slice(start, end);
    },

    // Получаем текущую открытую страницу товаров из пагинации
    getCurrentPage(i) {
      this.currentPage = i;
    },
  },
};
</script>

<style lang="scss" module>
@import "../../public/css/includes/_flex";
@import "../../public/css/includes/_colors";
@import "../../public/css/includes/_font";

.mainContent {
  position: relative;
  z-index: 1;

  .mainContentInner {
    padding: 2rem 5.5rem 4.125rem 5.5rem;

    .sort-arrow {
      height: 100%;
    }

    .mainContentHeaderWrap {
      display: flex;
      padding-bottom: 2.125rem;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 101;
    }

    .sortBlockWrap {
      display: flex;
      align-items: center;
    }

    .title {
      font-size: 2rem;
      font-weight: 700;
      line-height: $fz41px;
      height: 100%;
    }

    .sortTitle {
      color: $black;
      margin-right: 0.375rem;
    }
  }
}
.contentWrap {
  min-height: 74vh;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>