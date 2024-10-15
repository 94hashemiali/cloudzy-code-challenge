<script lang="ts" setup>

import useShopStore from "@/store/shop.module";

const props = withDefaults(
    defineProps<{
      product?: any;
    }>(),
    {
      product: {},
    },
);

const shopStore = useShopStore();

</script>

<template>
  <div class="card">
    <div class="card-body">
      <img class="product-image" :src="product?.image" alt="product-image">
      <div class="content">
        <p class="name">{{ product.name }}</p>
        <p class="description">{{ product.description }}</p>
      </div>
      <div class="price">
        <span class="price-value">${{ product.price }}</span>
        <div class="">
          <button
              v-if="!shopStore.state.shoppingCart?.get(product.id) || shopStore.state.shoppingCart?.get(product.id)?.count === 0"
              class="btn btn-sm btn-primary"
              @click="shopStore.setCartItem(product)">
            add to cart
          </button>
          <div v-else class="d-flex flex-wrap gap-1">
            <button
                class="btn btn-sm btn-primary"
                @click="shopStore.setCartItem(product)">
              +
            </button>
            <span>{{ shopStore.state.shoppingCart?.get(product.id)?.count }}</span>
            <button
                class="btn btn-sm btn-primary"
                @click="shopStore.removeCartItem(product)">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/style/variables";

.card {
  border: 1px solid $color-secondary;
  border-radius: 1rem;

  .product-image {
    border-radius: 1rem 1rem 0 0;
    width: 100%;
  }

  .content {
    padding: .5rem 1rem;

    .name {
      margin: 0 0 .5rem 0;
      font-size: 1rem;
    }

    .description {
      margin: 0;
      font-size: .85rem;
    }
  }

  .price {
    padding: .5rem 1rem;
    display: flex;
    justify-content: space-between;

    button {
      border-radius: .5rem;
    }

    * {
      align-content: center;
    }
  }
}


</style>