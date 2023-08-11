import type { Except } from 'type-fest';

interface label {
    name: string,
}

interface variant {
    name: string
}


interface storehouse_info{
    storehouse_id: string,
    storehouse_name: string,
    quantity: number,
    phone_no: string,
    storehouse_address: string,
}

interface restockInfo{
    restock_date: Datetime,
    restock_price: number,
    lowest_price: number,
    selling_price: number,
    quantity: number,
    supplier_name: string,
}

export interface ProductProperties{
    product_id: string,
    name: string,
    create_date: Date,
    labels: label[] | null,
    variation: variant[] | null,
    remarks: remark[] | null,
    new_restock_date: Datetime,
    new_restock_price: number,
    new_lowest_price: number,
    new_selling_price: number,
    total_stock: number,
    total_broken_products: number,
    storehouse_info: storehouseInfo[]
    restock: restockInfo[],
    average_restock_price: number,

}

export interface ProductInfo{
    product_id: string,
    name: string,
    new_supplier: string,
    new_restock_date: string,
    new_restock_price: number,
    new_lowest_price: number,
    new_selling_price: number,
    total_stock: number,
    average_restock_price: number,
}

export interface apiProductEntriesResponse {
    config: object
    data:   {
        data: tableEntry[]
        meta: object
    }
    header: object
    request:object
    status: number
    statusText: ''
}

    
export interface BrokenProduct{
    id:         string,
    numProduct: number,
    location:   string,
    date:       string,
    description: string,
}
export type NewBrokenProduct = Except<BrokenProduct, 'id'>