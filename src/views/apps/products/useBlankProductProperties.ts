import { ProductProperties } from "./storage/type";

export const blankProductProperties = <ProductProperties>(
    {
        product_id: '',
        name: '',
        create_date: '',
        labels: {data: []},
        variation: {data: [{attributes: {name:'', createdAt:'', isShow: true, publishedAt:'', updatedAt: ''}, id: -1}]},
        remarks: [{content: '', id: -1}] ,
        new_restock_date: '',
        new_restock_price: null,
        new_lowest_price: null,
        new_selling_price: null,
        total_stock: null,
        total_broken_products: null,
        storehouse_info: [],
        restocks: {data: []},
        average_restock_price: null,
      }
)