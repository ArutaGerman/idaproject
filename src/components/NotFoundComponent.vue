<template>
  <div :class="$style.notFoundBlock">
    <Header></Header>
    <div :class="$style.notFoundContent">
    <h1>Упс! 404! Cтраница не найдена!</h1>
    <p>
      Страница создана не для дизайна и работает только, чтобы не показывать
      стандартную 404 страницу от хостинга.
      Да, она сделана костыльно, чтобы не менять концепцию приложения, которая была в тз 
    </p>
  </div>
  </div>
</template>

<script>
export default {
components: {
    Header: () => import("@/components/TheHeader"),
  }
}
</script>

<style lang="scss" module>
@import "../../public/css/includes/_colors";

.notFoundBlock{
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;  
}

.notFoundContent {
  min-width: 100%;
  height: 100%;
  background: url("../assets/sea-5059912_1920.jpg") no-repeat center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  * {
    font-size: 3rem;
    color: #f2c94c;
  }
}
</style>