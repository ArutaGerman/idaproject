<template>
  <main :class="$style.mainContent">
    <div :class="$style.mainContentInner">
      <header :class="$style.mainContentHeaderWrap">
        <span :class="$style.title">Каталог</span>
        <aside :class="$style.sortBlockWrap">
          <span :class="$style.sortTitle">Сортировать по: </span>
          <sort-list
            :sortMenuVisible="sortMenuVisible"
            :sortedSelectParam="sortedSelectParam"
            :sortOptions="sortOptions"
            @sort-param="sortProducts"
            @show-sort="showSortList"
            @hide-sort="hideSortList"
          ></sort-list>
        </aside>
      </header>
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
          >
          </Pagination>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SortList from "@/components/SortList";
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
    SortList,
    GoodsList: () => import("@/components/GoodsList"),
    SideMenu: () => import("@/views/SideMenu"),    
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
      return Math.ceil(this.sortedProducts.length / this.goodsPerPage) || null
    },

    // Раскидываем товары по страницам для пагинации
    paginationGoods() {
      return this.countPaginationGoods();
    },
  },
  
  // Сохраняем номер просматриваемой страницы, чтобы она не скидывалась при обновлении (через f5 и т.п.)
  // Если номера страницы в адресной строке нет, то сбрасываем значение текущей страницы на 1
  watch:{
    $route() {
      this.$route.query.page ? this.currentPage = +this.$route.query.page : this.currentPage = 1
      }
    },

  mounted() {
    this["products/getID"];

    // Сохраняем номер текущей страницы из адресной строки, чтобы при обновлении страницы товары не сбросились на первую страницу
    if (this.$route.query.page) {
      this.currentPage = +this.$route.query.page;
    } else {
      this.currentPage = 1;
    }

    //Запускаем получение категорий оп api
    if (this.$route.params.id) {
      this["products/getID"](this.$route.params.id);
    } else {
      this["products/getID"];
    }
    this.getCategories; 

    this.getGoods(); //Запускаем получение товаров по api
  },

  methods: {
    ...mapActions(["products/getID"]),

    // Получаем категории товаров из api
    getCategories() {
      fetchCategories().then((answer) => this.categories.push(...answer));
    },

    // Получаем товары по выбранной категории из api
    getGoods() {
      const ID = this["products/idCategories"];
      this.goods = [];
      if (ID) {
        fetchProducts(ID).then((answer) => this.goods.push(...answer));
      }
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
      const START = (this.currentPage - 1) * this.goodsPerPage;
      const END = this.currentPage * this.goodsPerPage;
      this.hasNextPage = this.sortedProducts.length > END;
      return this.sortedProducts.slice(START, END);
    },

    // // Получаем текущую открытую страницу товаров из пагинации
    // getCurrentPage(i) {
    //   this.currentPage = i;
    // },
  },
};
</script>

<style lang="scss" module>
@import "../../public/css/scss/includes/_flex";
@import "../../public/css/scss/includes/_colors";
@import "../../public/css/scss/includes/_font";

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