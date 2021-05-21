<template>
  <nav
    v-if="countPages > 0"
    id="nav"
    :class="[$style.wrapper, $style.dflexNoWrap]"
  >
    <div v-if="this.$route.query.page > 1" :class="$style.navBtnWrap">
      <div :class="$style.navBtnInner">
        <div :class="$style.navBtn">
          <router-link
            :to="{
              name: 'GoodsList',
              params: { id: $route.params.id, name: $route.params.name },
              query: { page: this.$route.query.page - 1 },
            }"
            :class="$style.navBtnInnerBorder"
          >
            &#60;
          </router-link>
        </div>
      </div>
    </div>
    <div v-for="i in countPages" :key="i">
      <div :class="$style.navBtnWrap">
        <div :class="$style.navBtnInner">
          <div :class="$style.navBtn">
            <router-link
              :to="{
                name: 'GoodsList',
                params: { id: $route.params.id, name: $route.params.name },
                query: { page: i },
              }"
              :class="$style.navBtnInnerBorder"
            >
              {{ i }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.hasNextPage" :class="$style.navBtnWrap">
      <div :class="$style.navBtnInner">
        <div :class="$style.navBtn">
          <router-link
            :to="{
              name: 'GoodsList',
              params: { id: $route.params.id, name: $route.params.name },
              query: { page: showNextPage() },
            }"
            :class="$style.navBtnInnerBorder"
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
    currentPage: Number,
    hasNextPage: Boolean,
  },

  watch: {
    $route() {
      if (this.$route.query.page) {
        this.$emit("update-current-page", +this.$route.query.page);
      }
    },
  },

  methods: {
    showNextPage() {
      if (!this.$route.query.page) {
        this.$route.query.page = 1;
        return this.$route.query.page + 1;
      } else {
        return this.$route.query.page + 1;
      }
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
  justify-content: center;
  align-items: center;
  border: 1px solid $shadow;
  border-radius: 8px;
  box-shadow: 0px 4px 16px $shadow;
  color: $grey-light;
}

.navBtn {
  width: 100%;
  height: 100%;
  display: block;

  &:hover > a {
    color: $black;
  }
}
</style>