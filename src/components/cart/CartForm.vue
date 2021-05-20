<template>
  <div ref="cartContainer" :class="$style.listWrap">
    <span :class="$style.listTitle"> Товары в корзине </span>
    <form @submit.prevent="validateForm" id="cart_form" :class="$style.form">
      <div :class="$style.products">
        <div
          v-for="(item, index) in this['cart/productsInCart']"
          :key="index"
          :class="$style.productsItemWrap"
        >
          <div :class="[$style.productsItem, $style.dflex]">
            <div :class="[$style.productsItemInner, $style.dflexNoWrap]">
              <router-link to="#" :class="$style.dflexNoWrap">
                <div :class="$style.productsImgWrap">
                  <img
                    :src="$options.Url.url + item.photo"
                    :class="$style.productsImg"
                    alt="Изображение товара"
                  />
                </div>
                <div :class="[$style.productsInfo, $style.dflex]">
                  <div>{{ item.name }}</div>
                  <div :class="$style.productsPrice">
                    {{ Intl.NumberFormat("ru").format(item.price) }} &#x20bd;
                  </div>
                  <div :class="[$style.dflex, $style.productsRatingWrap]">
                    <i :class="$style.productsRatingStar"></i>
                    <span>{{ item.rating }}</span>
                  </div>
                </div>
              </router-link>
              <div :class="[$style.productsDeleteWrap, $style.dflex]">
                <div
                  @click="deleteProduct(item)"
                  :class="$style.productsDelete"
                >
                  <basket-icon></basket-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="$style.formDataToSendWrap">
        <span>Оформить заказ</span>
        <div :class="$style.formDataToSendInputs">
          <div :class="$style.formDataToSend">
            <input v-model="name" type="text" placeholder="Ваше имя" />
            {{ checkInput }}
          </div>
          <div v-if="focused" :class="$style.formDataToSend">
            <input @focus="onFocus" type="text" placeholder="+7 (xxx) xxx - xx - xx" />
          </div>
          <div v-else :class="$style.formDataToSend">
            <input
              v-phone
              v-model="phone"
              maxlength="18"
              type="text"
              placeholder="Телефон"
            />
          </div>
          <div :class="$style.formDataToSend">
            <input v-model="address" type="text" placeholder="Адрес" />
          </div>
        </div>
        <base-button
          @has-click="validateForm"
          :class="{ [$style.errorForm]: !isActive }"
        >
          <slot>Отправить</slot>
        </base-button>
      </div>
    </form>
    <div v-if="error" :class="$style.dataNotValid">
      <span>Все поля обязательны к заполнению</span>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { Url } from "../../additionals/variables";
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
    };
  },

  components: {
    BasketIcon: () => import("@/components/common/icons/BasketIcon"),
    BaseButton: () => import("@/components/common/buttons/BaseButton"),
  },

  computed: {
    ...mapGetters(["cart/productsInCart"]),

    // Вычисляем заполнены ли все поля и если да, то кнопка отправки формы меняет теряет класс errorForm
    checkInput: function () {
      const fn = () => {
        if (
          !this.phone ||
          (this.phone && this.phone.length < 18) ||
          !this.name ||
          !this.address
        ) {
          this.isActive = false;
        } else {
          this.isActive = true;
        }
      };
      return fn();
    },
  },

  methods: {
    ...mapActions(["cart/deleteFromCart", "cart/showOrderSuccess"]),

    deleteProduct(item) {
      this["cart/deleteFromCart"](item);
      localStorage.setItem(
        "products",
        JSON.stringify(this["cart/productsInCart"])
      ); // Обновляем localStorage
    },

    // Флаг для фокуса на поле телефона, если он не введен или введен не до конца
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
        const container = this.$refs.cartContainer;
          this.error = true;
          this.$nextTick( () => container.scrollIntoView(false) )   
      } else if (this.name && this.address && phone.length == 11) {
        this.error = false;
        this["cart/showOrderSuccess"]();
      }
    },
  },
};
</script>


<style lang="scss" module>
@import "../../../public/css/style";
@import "../../../public/css/includes/_font";

.listWrap {
  text-align: left;
  padding-bottom: 3.25rem;

  .listTitle {
    font-size: $fz18px;
    line-height: $fz23px;
  }
  .form {
    padding-top: 1rem;

    .products {
      .productsItemWrap:first-child {
        padding-top: 0;
      }
      .productsItemWrap {
        padding-top: 0.75rem;

        .productsItem {
          min-height: 120px;
          box-shadow: 0rem 0.25rem 1rem rgba(0, 0, 0, 0.05);
          border-radius: 0.5rem;
        }

        .productsItemInner {
          width: 100%;
          padding: 0.75rem 0 0.75rem 1.5625rem;

          a {
            flex-grow: 1;

            .productsImgWrap {
              max-width: 8.125rem;
              height: auto;
              align-items: center;

              .productsImg {
                height: 100%;
                max-height: 5.625rem;
                width: auto;
              }
            }

            .productsInfo {
              font-size: $fz14px;
              line-height: $fz18px;
              color: $grey;
              flex-grow: 1;
              flex-direction: column;
              justify-content: space-between;
              align-items: flex-start;

              .productsPrice {
                padding-top: 0.375rem;
                font-size: $fz14px;
                font-weight: bold;
                line-height: $fz18px;
                color: $black;
              }

              .productsRatingWrap {
                padding-top: 1rem;
                align-items: center;

                .productsRatingStar {
                  width: 1.25rem;
                  height: 1.25rem;
                  background: url("../../assets/star.svg") no-repeat center;
                }

                .productsRatingStar + span {
                  font-size: 0.625rem;
                  line-height: 0.8125rem;
                }
              }
            }
          }
        }
        .productsDeleteWrap {
          align-items: center;
          padding: 0 1.375rem;

          .productsDelete {
            width: 2rem;
            height: 2rem;
          }
        }
      }
    }

    .formDataToSendWrap {
      padding-top: 2rem;

      span {
        font-size: $fz18px;
        line-height: 1.4375rem;
        color: $grey;
      }

      .formDataToSendInputs {
        padding-bottom: 1.5rem;

        .formDataToSend {
          padding-top: 1rem;

          input {
            width: 100%;
            height: 3.125rem;
            padding: 0.875rem 0 0.9375rem 0.875rem;
            line-height: $fz21px;
            background: $grey-extra-light;
            border: none;
            border-radius: 0.5rem;
          }
        }
      }

      .errorForm {
        background: $grey;
      }
    }
  }

  .dataNotValid {
    font-size: 1rem;
    line-height: $fz21px;
    padding-top: 2rem;
    text-align: center;
  }
}
</style>