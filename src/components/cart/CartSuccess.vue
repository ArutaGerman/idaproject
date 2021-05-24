<template>
  <div :class="$style.content">
    <img src="../../assets/succes-image.png" alt="Succes sign" />
    <!-- :srcset="require('@/assets/succes-image.png') + '1x,' + require('@/assets/success-image@2x.png') +'2x'" :class="$style.successSign"  -->
    <div :class="$style.contentText">
      <span>Заявка успешно отправлена</span>
      <br />
      <span>Вскоре наш менеджер свяжется с Вами</span>
    </div>
  </div>
</template>

<style lang="scss" module>
@import "../../../public/css/includes/_font";
@import "../../../public/css/includes/_colors";

.content {
  position: absolute;
  width: 100%;
  max-width: 22.75rem;
  top: 42.57%;

  .successSign {
    width: 5rem;
    height: 5rem;
  }

  .contentText {
    span {
      font-size: 1rem;
      line-height: $fz21px;
      color: $grey;
    }

    span:first-child {
      font-size: $fz24px;
      line-height: 1.9375rem;
      color: $black0;
    }
  }
}
</style>