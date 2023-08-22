import { NewBrokenProduct } from '@/views/apps/products/storage/type'
import axios from '@axios'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

export const useBrokenProductStore = defineStore('brokenProductStore', {
  actions: {

    // 👉 Fetch products data
    fetchBrokenProducts() { 
      return new Promise<AxiosResponse>((resolve, reject) => {
        axios.get(`/broken-products`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Add product
    addBrokenProduct(brokenProduct: NewBrokenProduct) {
      return new Promise((resolve, reject) => {
        axios.post('/broken-products', { 
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
        axios.get(`/broken-products/${strapid}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete product
    deleteBrokenProduct(strapi_id: number) {
      return new Promise((resolve, reject) => {
        axios.delete(`/broken-products/${strapi_id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
