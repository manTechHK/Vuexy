import axios from '@axios'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

//incomplete, wip
export const useBrokenProductStore = defineStore('brokenProductStore', {
  actions: {

    // 👉 Fetch products data
    fetchBrokenProducts() { 
      return new Promise<AxiosResponse>((resolve, reject) => {
        axios.get(`/broken-products`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Add product
    // addBrokenProduct(userData: ProductProperties) {
    //   return new Promise((resolve, reject) => {
    //     axios.post('/broken-products', {
    //       user: userData,
    //     }).then(response => resolve(response))
    //       .catch(error => reject(error))
    //   })
    // },

    // 👉 fetch single product
    fetchBrokenProduct(strapid: number) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axios.get(`/broken-products/${strapid}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete product
    deleteBrokenProduct(strapi_id: number) {
      return new Promise((resolve, reject) => {
        axios.delete(`/products/${strapi_id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
