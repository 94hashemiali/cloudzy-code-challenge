import axios from "@/axios.config";
import type {Product, SampleResponse} from "@/types";
import type {AxiosResponse} from "axios";
import products from "@/makedata/products.json"

class ShopService {

    async listProducts(): Promise<SampleResponse<Product[]>> {
        // let response: AxiosResponse = await axios
        //     .get('products');
        return {data: products, result: true}
    }

}

export default new ShopService();