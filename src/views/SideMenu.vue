<template>
  <nav id="nav" class="nav">
    <ul>
      <li
        v-for="(item, index) in categories"
        :key="index"
        @click="getCategoryId(item.id)"
        class="nav__item"
      >
        <router-link :to="'/goods/' + rus_to_latin(item.name)">{{ item.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { Translit } from "@/additionals/translit";
import "whatwg-fetch";
import { mapGetters } from "vuex";
export default {
  mixins: [Translit],
  props: {
    categories: Array
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["idCategories"])
  },
  mounted() {
    this.$emit("get-categories");
  },
  methods: {
    getCategoryId(id) {
      this.$store.dispatch("getID", id);
      this.$emit("get-goods");      
    }
  }
};
</script>

<style lang="scss">
.nav {
  width: 100%;
  max-width: 10rem;
  text-align: left;
  line-height: 21px;

  li:not(li:last-child) {
    padding-bottom: 1rem;
  }

  a {
    color: #959dad;

    &:hover {
      color: #1f1f1f;
    }
  }
}
</style>