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

export interface apiSupplierInfo{

}

export interface supplierInfo {
    name: string,
    id: number,
    strapi_id: number,
}