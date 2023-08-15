

export type tableEntry = {
    id: number,
    attributes: brokenProductInfo
}

export interface brokenProductInfo{
    date: string,
    product_id: string,
    product_name: string,
    quantity: number,
    remarks: string,
    storehouse_name: string
}

export interface apiBrokenProductEntriesResponse {
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


interface filterOption{
    period? : string,
    date? : string,
    search? : string,
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