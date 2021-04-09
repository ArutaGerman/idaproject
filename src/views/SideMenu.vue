<template>
  <nav id="nav" class="nav">
    <ul>
      <li v-for="(item, index) in categories" :key="index"  @click="getCategoryId(item.id)" class="nav__item">
        <router-link :to="'/goods/' + rus_to_latin(item.name)">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { Translit } from "@/additionals/translit";
import "whatwg-fetch";
export default {
  mixins: [Translit],
  props: {
    categories: Array,
    id: Number
  },
  data() {
    return {
      
    };
  },
  mounted() {
    this.$emit("get-categories");
  },
  methods:{
    getCategoryId(id){
      this.$emit("get-id", id)
      this.$emit("get-goods")
    },
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