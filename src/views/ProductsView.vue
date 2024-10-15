<script lang="ts" setup>

import useShopStore from "@/store/shop.module";
import {computed, onMounted} from "vue";
import ProductCard from "@/components/shopping/ProductCard.vue";

const shopStore = useShopStore();

const products = computed(() => {
  return [...shopStore.state.products?.values()];
});

onMounted(() => {
  shopStore.listProducts();
})

</script>

<template>
  <div class="products-div">
    <product-card v-for="product in products" :key="product" :product="product"/>
  </div>
</template>

<style lang="scss" scoped>

.products-div {
  width: auto !important;
  grid-template-columns: repeat(3, minmax(186px, 1fr));
  padding: 0;
  gap: 1rem;
  display: grid;
  margin: 2rem auto !important;

  @media (min-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(164px, 1fr));
  }
}

</style>