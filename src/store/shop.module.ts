import ShopService from "@/services/shop.service";
import {defineStore} from "pinia";
import {reactive} from "vue";
import type {Product, SampleResponse} from "@/types";
import {alertError} from "@/store/alert.module";

const useShopStore = defineStore("shop-store", () => {

    const state = reactive({
        products: new Map<string, Product>(),
        shoppingCart: new Map(),
        product: null,
    });

    async function listProducts(): Promise<SampleResponse<Product[]>> {
        try {
            const response: SampleResponse<Product[]> = await ShopService.listProducts();
            state.products = new Map<string, Product>();
            response.data?.forEach((item: Product): void => {
                state.products.set(item?.id, item)
            });
            return Promise.resolve(response);
        } catch (error) {
            let message = error?.response?.data?.error ?? "خطایی در دریافت لیست محصولات رخ داد!";
            alertError(message);
            return Promise.reject(error);
        }
    }

    function setCartItem(product: Product) {
        let cartItem = state.shoppingCart?.get(product.id) ?? {
            id: product.id,
            count: 0,
            total_price: 0
        };

        state.shoppingCart.set(product.id, {
            id: product.id,
            count: cartItem.count + 1,
            total_price: cartItem.total_price + product.price
        });
    }

    function removeCartItem(product: Product) {
        let cartItem = state.shoppingCart?.get(product.id) ?? {
            id: product.id,
            count: 0,
            total_price: 0
        };

        if (cartItem.count > 0) {
            state.shoppingCart.set(product.id, {
                id: product.id,
                count: cartItem.count - 1,
                total_price: cartItem.total_price - product.price
            });
        }
    }

    return {
        state,
        listProducts,
        setCartItem,
        removeCartItem,
    }

});

export default useShopStore;
