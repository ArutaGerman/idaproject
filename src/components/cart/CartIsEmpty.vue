<template>
<div class="cart-empty">
  <span>Пока что вы ничего не добавили
в корзину.</span>
<button @click.prevent="$router.go(-1)" class="cart-button">Перейти к выбору</button>
</div>
</template>

<script>
export default {
methods:{
  
}
}
</script>

<style>

</style>