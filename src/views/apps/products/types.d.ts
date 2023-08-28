

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



export interface brokenProductInfo extends brokenProductAttributes {
    strapi_id: number
}

interface brokenProductAttributes {
    date: string,
    product_id: string,
    product_name: string,
    quantity: number,
    remarks: string,
    storehouse_name: string
}

interface nestedBrokenProductInfo {
    id: number,
    attributes: brokenProductAttributes,
}

export interface apiBrokenProductEntriesResponse {
    config: object
    data:   {
        data: nestedBrokenProductInfo[]
        meta: object
    }
    header: object
    request:object
    status: number
    statusText: ''
}


export interface filterOptions{
    product_id: string,
    product_name: string,
    period: string,
}

export interface Options{
    filter : filterOptions,
    itemsPerPage : number,
    page: number,
    query: queryOptions = {}
}

interface queryOptions{
    new_restock_date: string,
    supplier?: number 
    label?: number,
    search?: {
        member_id: number,
        name: string,
        phone_num: number,
        email: string
    } 
}

export interface newBrokenProductForm{
    product_id : string,
    quantity : string,
    storehouse_id : string,
    date    : string,
    remarks :string,
}


interface labelAttributes {
    name: string,
    createdAt: Date | string,
    isShow: boolean,
    publishedAt: Date | string,
    updatedAt: Date | string,
}

export interface label{
    attributes: labelAttributes,
    id: number,
}

interface variantAttributes {
    name: string,
    createdAt: Date | string,
    isShow: boolean,
    publishedAt: Date | string,
    updatedAt: Date | string,
}

interface variant {
    attributes: variantAttributes
    id: number
}


interface storehouse_info{
    storehouse_id: string,
    storehouse_name: string,
    quantity: number,
    phone_no: string,
    storehouse_address: string,
}

interface supplierData{
    data: supplierInfo
}

interface supplierInfo{
    id: number,
    attributes: supplierAttributes
}

interface supplierAttributes{
    name: string
}

interface restockAttributes{
    createdAt: string,
    lowest_price: number,
    publishedAt: string,
    quantity: number,
    restock_date: string,
    restock_price: number,
    selling_price: number,
    supplier: supplierData,
    updatedAt: string,
}


interface restockInfo{
    id: number,
    attributes: restockAttributes
}

interface restockList {
    data: restockInfo[]
}

interface labelData{
    data: label[]
}

interface variantData{
    data: variant[]
}

export interface remark {
    content: string,
    id: number,
}

export interface storehouseInfo{
    storehouse_id: string,
    storehouse_name: string,
    quantity: number,
    phone_no: string,
    storehouse_address: string,
}

export interface ProductProperties{
    product_id: string,
    name: string,
    create_date: string,
    labels: labelData ,
    variation: variantData,
    remarks: remark[],
    new_restock_date: string ,
    new_restock_price: number | null = null,
    new_lowest_price: number | null = null,
    new_selling_price: number | null = null,
    total_stock: number | null = null,
    total_broken_products: number | null,
    storehouse_info: storehouseInfo[],
    restocks: restockList,
    average_restock_price: number | null = null,

}

export interface ProductDetails {
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


export interface apiProductList{
    data: apiProductListItem[]
}

export interface apiProductListItem{
    attributes: ProductDetails
    id: number
}

export interface apiProductItem{
    attributes: ProductProperties,
    id: number,
}

export interface ProductInfo{
    strapi_id: number | undefined,
    product_id: string,
    name: string,
    new_supplier: string,
    new_restock_date: string,
    new_restock_time: string,
    new_restock_price: number,
    new_lowest_price: number,
    new_selling_price: number,
    total_stock: number,
    average_restock_price: number,
}

export interface newProductForm{
    product_id: string,  //unique
    name: string,
    create_date: string,
    labels: (number | null)[],
    variation: number[],
    remarks: string[]
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

    
export interface BrokenProductInfo{
    strapi_id:  number,
    product_id: string,
    name: string,
    quantity:   number,
    storehouse_id:  number,
    date:       string,
    remarks:    string,
}

export  interface NewBrokenProduct {
    product_id: number,
    quantity:   number,
    storehouse_id:  number,
    date:       string,
    remarks:    string,
}

export interface Response <T= any>{
    data: T;
    meta: pagination;
}

interface pagination{
    page: number,
    pageCount: number,
    pageSize: number,
    total: number,
}