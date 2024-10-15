import StorageService from "@/services/storage.service";
import {RouteRecordRaw, createRouter, createWebHistory} from 'vue-router';
import ProductsView from "@/views/ProductsView.vue";
import ShoppingCartView from "@/views/ShoppingCartView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import BaseShoppingView from "@/components/BaseShoppingView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'baseShopping',
        component: BaseShoppingView,
        children: [
            {
                path: '/shop',
                name: 'shop',
                component: ProductsView,
            },
            {
                path: '/shopping-cart',
                name: 'shoppingCart',
                component: ShoppingCartView,
            },
            {
                path: '/checkout',
                name: 'checkout',
                component: CheckoutView,
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
});

const publicPages = new Map<string, string>([
    ["shop", "/shop"],
    ["shopping-cart", "/shopping-cart"],
    ["checkout", "/checkout"],
]);

router.beforeEach(async (to, from, next) => {
    const authRequired = !publicPages.get(to.name);
    const isLogin = StorageService.getItem("isLogin") ?? false;
    if (authRequired && !isLogin) {
        next('/login');
    } else if (to.name === "baseShopping") {
        next('/shop');
    } else {
        next()
    }
});
export default router
