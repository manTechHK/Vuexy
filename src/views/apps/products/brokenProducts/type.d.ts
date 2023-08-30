

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


export interface filterOption{
    storehouse? : number,
    date? : string,
    search : searchItem,
}

export interface searchItem {
    product_id: string,
    product_name: string,
}

export interface Options{
    filter : filterOption,
    itemsPerPage : number,
    page: number,
}

export interface newBrokenProductForm{
    product_id : string,
    quantity : string,
    storehouse_id : string,
    date    : string,
    remarks :string,
}