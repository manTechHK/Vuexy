export interface brokenProductProperties {
    product_id: string,
    product_name: string,
    product: object,
    quantity: number,
    storehouse_id: number,
    storehouse_name: string,
    date: string,
    remarks: string,
}

export interface restockForm{
    restock_date: string | null,
    quantity: number | null,
    restock_price:number | null,
    lowest_price:number | null,
    selling_price:number | null,
    restock_distribute: {storehouse: number, quantity: number | null}[],
    product: number | null,
    supplier: number | null,
}
export interface supplierInfo {
    name: string,
    id: number,
    strapi_id: number,
}