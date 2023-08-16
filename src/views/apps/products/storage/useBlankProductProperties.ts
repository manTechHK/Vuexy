import { ProductProperties } from "./type";

export const blankProductProperties = <ProductProperties>(
    {
        product_id: '',
        name: '',
        create_date: '',
        labels: {data: [{attributes: {name:'', createdAt:'', isShow: true, publishedAt:'', updatedAt: ''}, id: -1}]},
        variation: {data: [{attributes: {name:'', createdAt:'', isShow: true, publishedAt:'', updatedAt: ''}, id: -1}]},
        remarks: [{content: '', id: -1}] ,
        new_restock_date: '',
        new_restock_price: NaN,
        new_lowest_price: NaN,
        new_selling_price: NaN,
        total_stock: NaN,
        total_broken_products: NaN,
        storehouse_info: [],
        restock: [],
        average_restock_price: NaN,
      }
)