import axios from "@axios"

export interface storehouseInfo{
    address: string,
    contact_person: string,
    createdAt: string,
    name: string,
    phone_num: string,
    publishedAt: string,
    updatedAt: string,
}

export interface storehouse{
    attributes: storehouseInfo,
    id: number
}

export interface State {
    storehouseStore: storehouse[]
}

export const useStorehouseStore = defineStore('storehouse', {
    state: (): State => ({
        storehouseStore: [],
    }),
    actions: {
        async fetchStorehouses() {
            const response = await axios.get('/storehouses')
            this.storehouseStore = response.data.data
            return response.data.data
        },
    }
})