import axios from "@axios"

export interface productInfo{
    product_id: string,
    name: string,
    new_restock_date: string,
    new_restock_price: number,
    new_lowest_price: number,
    new_selling_price: number,
    total_stock: number,
    new_supplier: string,
    average_restock_price: number
}

export interface product{
    attributes: productInfo,
    id: number
}

export interface State {
    productStore: product[]
}

export const useProductStore = defineStore('product', {
    state: (): State => ({
        productStore: [],
    }),
    actions: {
        async fetchProducts() {
            const response = await axios.get('/products')
            this.productStore = response.data.data
            console.log(response)
            return response.data.data
        },
    }
})