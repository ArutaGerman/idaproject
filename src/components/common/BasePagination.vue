<template>
  <nav
    v-if="countPages > 0"
    id="nav"
    :class="[$style.wrapper, $style.dflexNoWrap]"
  >
    <div v-if="this.$route.query.page > 1" :class="$style.navBtnWrap">
      <div :class="$style.navBtnInner">
        <div :class="$style.navBtnInnerBorder">
          <router-link
            :to="{
              name: 'GoodsList',
              params: { id: $route.params.id, name: $route.params.name },
              query: { page: this.$route.query.page - 1 },
            }"
            :class="$style.navBtn"
          >
            &#60;
          </router-link>
        </div>
      </div>
    </div>
    <div v-for="i in countPages" :key="i" :class="$style.navBtnWrap">
      <div :class="$style.navBtnInner">
        <div :class="$style.navBtnInnerBorder">
          <router-link
            :to="{
              name: 'GoodsList',
              params: { id: $route.params.id, name: $route.params.name },
              query: { page: i },
            }"
            :class="$style.navBtn"
          >
            {{ i }}
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="this.hasNextPage" :class="$style.navBtnWrap">
      <div :class="$style.navBtnInner">
        <div :class="$style.navBtnInnerBorder">
          <router-link
            :to="{
              name: 'GoodsList',
              params: { id: $route.params.id, name: $route.params.name },
              query: { page: updatePlusPage() },
            }"
            :class="$style.navBtn"
          >
            &#62;
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    countPages: Number,
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
      if (!this.$route.query.page) {
        this.$route.query.page = 1;
      } else {
        this.$route.query.page = currentPage;
      }
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
  width: 100%;
  max-width: 40rem;
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