<template>
  <div class="cart-list_wrap">
    <span class="cart-list__title">Товары в корзине</span>
    <form class="cart-form">
      <div class="cart-form__products-list cart-product">
        <div
          v-for="item in products"
          :key="item.id"
          class="goods-item_inner cart-product__item"
        >
          <div class="cart-product__item_inner dflex_nowrap">
            <div class="cart-product__img">
              <img :src="$options.Url.url + item.photo" alt="Изображение товара" />
            </div>
            <div class="cart-product__info dflex">
              <div class="cart-product__title">{{item.name}}</div>
              <div class="cart-product__price">{{item.price}}</div>
              <div class="cart-product__rating_wrap dflex">
                <div class="cart-product__rating-star">
                  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 3.125C10.2379 3.125 10.4552 3.26005 10.5605 3.47336L12.3464 7.09154L16.3404 7.67532C16.5758 7.70972 16.7712 7.87473 16.8445 8.10098C16.9179 8.32723 16.8565 8.57552 16.6861 8.74147L13.7966 11.5559L14.4785 15.5318C14.5187 15.7663 14.4223 16.0033 14.2299 16.1432C14.0374 16.283 13.7822 16.3014 13.5716 16.1907L10 14.3124L6.42843 16.1907C6.21785 16.3014 5.96267 16.283 5.77018 16.1432C5.5777 16.0033 5.48129 15.7663 5.52151 15.5318L6.20344 11.5559L3.31394 8.74147C3.14355 8.57552 3.08213 8.32723 3.15549 8.10098C3.22885 7.87473 3.42428 7.70972 3.65963 7.67532L7.6536 7.09154L9.43958 3.47336C9.54487 3.26005 9.76213 3.125 10 3.125ZM10 5.16203L8.62921 7.93914C8.53825 8.12342 8.36251 8.25121 8.15916 8.28093L5.09278 8.72913L7.3111 10.8898C7.45852 11.0334 7.52581 11.2403 7.49102 11.4432L6.96763 14.4948L9.70911 13.0531C9.89122 12.9573 10.1088 12.9573 10.2909 13.0531L13.0324 14.4948L12.509 11.4432C12.4742 11.2403 12.5415 11.0334 12.6889 10.8898L14.9073 8.72913L11.8409 8.28093C11.6375 8.25121 11.4618 8.12342 11.3708 7.93914L10 5.16203Z"
                      fill="#F2C94C"
                    />
                    <path
                      d="M6.5 11L4 8H10H16L13.5 11V14.5L13 15.5L10 14L9 14.5L6.5 15.5V14.5V11Z"
                      fill="#F2C94C"
                    />
                  </svg>
                </div>
                <div class="cart-product__rating-count">
                  <span>{{item.rating}}</span>
                </div>
              </div>
            </div>
            <div class="cart-product__delete_wrap">
              <div @click="deleteProduct(item.id)" class="cart-products__delete">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 10C6 9.44772 6.44772 9 7 9H25C25.5523 9 26 9.44772 26 10C26 10.5523 25.5523 11 25 11H7C6.44772 11 6 10.5523 6 10Z"
                    fill="#959DAD"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 7C13.7348 7 13.4804 7.10536 13.2929 7.29289C13.1054 7.48043 13 7.73478 13 8V9H19V8C19 7.73478 18.8946 7.48043 18.7071 7.29289C18.5196 7.10536 18.2652 7 18 7H14ZM21 9V8C21 7.20435 20.6839 6.44129 20.1213 5.87868C19.5587 5.31607 18.7956 5 18 5H14C13.2044 5 12.4413 5.31607 11.8787 5.87868C11.3161 6.44129 11 7.20435 11 8V9H9C8.44772 9 8 9.44772 8 10V24C8 24.7957 8.31607 25.5587 8.87868 26.1213C9.44129 26.6839 10.2043 27 11 27H21C21.7957 27 22.5587 26.6839 23.1213 26.1213C23.6839 25.5587 24 24.7957 24 24V10C24 9.44772 23.5523 9 23 9H21ZM10 11V24C10 24.2652 10.1054 24.5196 10.2929 24.7071C10.4804 24.8946 10.7348 25 11 25H21C21.2652 25 21.5196 24.8946 21.7071 24.7071C21.8946 24.5196 22 24.2652 22 24V11H10Z"
                    fill="#959DAD"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 14C14.5523 14 15 14.4477 15 15V21C15 21.5523 14.5523 22 14 22C13.4477 22 13 21.5523 13 21V15C13 14.4477 13.4477 14 14 14Z"
                    fill="#959DAD"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18 14C18.5523 14 19 14.4477 19 15V21C19 21.5523 18.5523 22 18 22C17.4477 22 17 21.5523 17 21V15C17 14.4477 17.4477 14 18 14Z"
                    fill="#959DAD"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-form__data-send_wrap">
        <input type="text" placeholder="Ваше имя" />
        <input type="text" placeholder="Телефон" />
        <input type="text" placeholder="Адрес" />
        <button class="cart-button">Отправить</button>
      </div>
    </form>
  </div>
</template>

<script>
import {Url} from "../../additionals/variables"
export default {
    Url,
  props: {
    products: Array
  },
  data() {
    return {
    //   url: "https://front-test.idalite.com"
    };
  },
  methods: {
    deleteProduct(id) {
      this.$emit("delete-product", id);
    }
  }
};
</script>

<style lang="scss">
.cart-list_wrap {
  .cart-product {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    &__item {
      width: 22.75rem;
      height: 7.5rem;
    }

    &__item_inner {
      width: 100%;
      height: 100%;
      padding: 0.9375rem 1.5625rem;
    }

    &__img {
      max-width: 8.125rem;
      height: 100%;

      img {
        height: 100%;
      }
    }

    &__info {
      flex-grow: 1;
      flex-direction: column;
      justify-content: space-between;
      font-size: 14px;
      line-height: 18px;
    }

    &__title {
      color: #59606d;
    }

    &__price {
      color: #1f1f1f;
    }

    &__rating {
      color: #f2c94c;
    }
  }
  .cart-products__delete > svg:hover > path {
    fill: #1f1f1f;
  }
}
</style>