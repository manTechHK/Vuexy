import { NewBrokenProduct, Response } from '@/views/apps/products/storage/type'
import axios from '@axios'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { nestedBrokenProductInfo } from './types'

export const useBrokenProductStore = defineStore('brokenProductStore', {
  state: ()=>({url: '/broken-products'}),
  actions: {

    // 👉 Fetch products data
    fetchBrokenProducts(storehouse?: number, date?: string, product?: number) { 
      const query = (storehouse? `?storehouse=${storehouse}`: '') + (date? `?date=${date}`: '') + (product? `?product=${product}`: '')
      return new Promise<AxiosResponse<Response<nestedBrokenProductInfo[]>>>((resolve, reject) => {
        axios.get(`${this.url}${query}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Add product
    addBrokenProduct(brokenProduct: NewBrokenProduct) {
      return new Promise((resolve, reject) => {
        axios.post(`${this.url}`, { 
            product_id: brokenProduct.product_id, 
            quantity: brokenProduct.quantity, 
            storehouse_id: brokenProduct.storehouse_id, 
            date: brokenProduct.date, 
            remarks: brokenProduct.remarks},
        ).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single product
    fetchBrokenProduct(strapid: number) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axios.get(`${this.url}/${strapid}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete product
    deleteBrokenProduct(strapi_id: number) {
      return new Promise((resolve, reject) => {
        axios.delete(`${this.url}/${strapi_id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
