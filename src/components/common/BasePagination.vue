<template>
  <nav
    v-if="countPages > 0"
    id="nav"
    :class="[$style.wrapper, $style.dflexNoWrap]"
  >
    <div v-if="this.$route.query.page > 1" :class="$style.navBtnWrap">
      <div :class="$style.navBtnInner">
        <router-link
          :to="{
            name: 'GoodsList',
            params: { id: $route.params.id, name: $route.params.name },
            query: { page: this.$route.query.page - 1 },
          }"
          :class="$style.navBtnInnerBorder"
        >
          <div :class="$style.navBtn">&#60;</div>
        </router-link>
      </div>
    </div>

    <div v-for="i in countPages" :key="i">
      <div :class="$style.navBtnWrap">
        <div :class="$style.navBtnInner">
          <router-link
            :to="{
              name: 'GoodsList',
              params: { id: $route.params.id, name: $route.params.name },
              query: { page: i },
            }"
            :class="$style.navBtnInnerBorder"
          >
            <div :class="$style.navBtn">
              {{ i }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="this.hasNextPage" :class="$style.navBtnWrap">
      <div :class="$style.navBtnInner">
        <router-link
          :to="{
            name: 'GoodsList',
            params: { id: $route.params.id, name: $route.params.name },
            query: { page: updatePlusPage() },
          }"
          :class="$style.navBtnInnerBorder"
        >
          <div :class="$style.navBtn">&#62;</div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    countPages: Number,
    currentPage: Number,
    hasNextPage: Boolean,
  },

  watch: {
    $route() {
      const currentPage = JSON.parse(sessionStorage.getItem("page-of-a-goods"));
      if (this.$route.query.page) {
        this.$emit("update-current-page", +this.$route.query.page);
        sessionStorage.setItem(
          "page-of-a-goods",
          JSON.stringify(this.$route.query.page)
        );
      } else {
        this.$route.query.page = currentPage;
        return;
      }
    },
  },

  methods: {
    updatePlusPage() {
      const currentPage = +JSON.parse(
        sessionStorage.getItem("page-of-a-goods")
      );
      this.$route.query.page = currentPage ?? 1;
      return this.$route.query.page + 1;
    },
  },
};
</script>


<style lang="scss" module>
@import "../../../public/css/includes/_colors";
@import "../../../public/css/includes/_font";
@import "../../../public/css/includes/_flex";

.wrapper {
  max-width: 42rem;
  height: 100%;
  max-height: 3rem;
  padding-top: 2rem;
  justify-content: space-between;
}

.navBtnWrap {
  width: 3rem;
  height: 3rem;
}

.navBtnInner {
  width: 100%;
  height: 100%;
  padding: 0.25rem;
}

.navBtnInnerBorder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: 1px solid $shadow;
  border-radius: 8px;
  box-shadow: 0px 4px 16px $shadow;
}

.navBtn {
  width: 100%;
  display: block;
  padding: 0.25rem;
  color: $grey-light;
}
</style>