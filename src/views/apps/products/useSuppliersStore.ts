import axios from '@axios'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

export const useSuppliersStore = defineStore('suppliersStore', {
    actions: {
        fetchSuppliers(){
            return new Promise<AxiosResponse>((resolve, reject) => {
                axios.get(`/suppliers`).then(response => resolve(response)).catch(error => reject(error))
            })
        },
    }
})