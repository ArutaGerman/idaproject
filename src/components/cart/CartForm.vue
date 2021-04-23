<template>
  <div :class="$style['cart-list_wrap']">
    <span class="cart-list__title">Товары в корзине</span>
    <form @submit.prevent="validateForm" id="cart_form" class="cart-form">
      <div :class="$style['cart-product']">
        <div
          v-for="(item, index) in productsInCart"
          :key="index"
          :class="[$style['goods-item_inner'], $style['cart-product__item']]"
        >
          <div :class="[$style['cart-product__item_inner'], $style['dflex_nowrap']]">
            <div :class="$style['cart-product__img_wrap']">
              <img
                :src="$options.Url.url + item.photo"
                :class="$style['cart-product__img']"
                alt="Изображение товара"
              />
            </div>
            <div :class="[$style['cart-product__info'], $style.dflex]">
              <div class="cart-product__title">{{item.name}}</div>
              <div :class="$style['cart-product__price']">{{item.price}} &#x20bd;</div>
              <div class="cart-product__rating_wrap dflex">
                <i :class="$style['cart-product__rating-star']"></i>
                <div class="cart-product__rating-count">
                  <span>{{item.rating}}</span>
                </div>
              </div>
            </div>
            <div :class="[$style['cart-product__delete_wrap'], $style.dflex]">
              <div @click="deleteFromCart(item)" :class="$style['cart-product__delete']">
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
        <input v-model="name" type="text" placeholder="Ваше имя" />
        <input v-if="focused" @focus="onFocus" type="text" placeholder="+7(___)-__-__" />
        <input v-else v-phone v-model="phone" maxlength="18" type="text" placeholder="Телефон" />
        <input v-model="address" type="text" placeholder="Адрес" />
        <BaseButton @has-click="validateForm"></BaseButton>
      </div>
    </form>
    <div v-if="error" class="cart-list__validate">
      <span>Все поля обязательные. После удачной отправки формы содержимое корзины очищается</span>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { Url } from "../../additionals/variables";
import { mapMutations } from "vuex";
export default {
  Url,
  data() {
    return {
      name: null,
      phone: null,
      focused: false,
      address: null,
      isActive: false,
      error: false,
      btnText: "Назад"
    };
  },
  components: {
    BaseButton: () => import("@/components/buttons/BaseButton")
  },
  computed: mapGetters(["productsInCart", "successCart"]),
  methods: {
    ...mapMutations(["deleteFromCart"]),

    // Флаг для фокуса на поле телефона при ошибке ввода
    onFocus() {
      this.focused = false;
    },

    // Метод проверки заполнена ли верно форма заказа
    validateForm() {
      let phone = this.phone;
      // Проверяем верно ли заполнено поле телефона
      // если phone имеет хоть один символ, то включаем маску, чтобы нельзя было ввести буквы
      if (phone) {
        phone = this.phone.replace(/\D/g, "").substring(0, 11); // Создаём переменную phone, которая преобразовывается в телефон без знаков для передачи на сервер
        // если телефон не полностью заполнен, то показываем ошибку и пример формата телефона
        if (phone.length != 11) {
          this.focused = true;
        }
        // если телефон вообще не заполнялся, то показываем ошибку и пример формата телефона
      } else {
        this.focused = true;
      }
      //проверяем заполнены ли все инпуты формы и если успешно, то показываем компонент успешно оформленного заказа
      if (!this.name || !this.address || !phone || phone.length != 11) {
        this.error = true;
      } else if (this.name && this.address && phone) {
        this.error = false;
        this.$store.dispatch("CountProductsInCart");
        this.$store.dispatch("showOrderSuccess");
      }
    }

    // closeCart
  }
};
</script>


<style lang="scss" module>
@import "../../../public/css/style";
@import "../../../public/css/includes/_font";

.cart-list_wrap {
  padding-top: 7.3125rem;

  .cart-product {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    .cart-product__item {
      width: 22.75rem;
      height: 7.5rem;
    }

    .cart-product__item_inner {
      width: 100%;
      height: 100%;
      padding: 0.9375rem 1.5625rem;

      .cart-product__img_wrap {
        max-width: 8.125rem;
        height: 100%;

        .cart-product__img {
          height: 100%;
          width: auto;
        }
      }

      .cart-product__info {
        font-size: 14px;
        line-height: 18px;
        color: $grey;
        flex-grow: 1;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        .cart-product__price {
          font-size: $fz14px;
          font-weight: bold;
          line-height: 18px;
          color: $black;
        }

        .cart-product__rating-star {
          width: 1.25rem;
          height: 1.25rem;         
          background: url("../../assets/star.svg") no-repeat center;
        }
      }
    }
    .cart-product__delete_wrap {
      align-items: center;

      .cart-product__delete {
        width: 2rem;
        height: 2rem;
      }
    }
  }
}
</style>