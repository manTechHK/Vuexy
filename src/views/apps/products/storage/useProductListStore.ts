import type { ProductProperties } from '@/views/apps/products/storage/type'
import axios from '@axios'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

export const useProductListStore = defineStore('productListStore', {
  actions: {

    // 👉 Fetch products data
    fetchProducts() { 
      return new Promise<AxiosResponse>((resolve, reject) => {
        axios.get(`/products`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Add product
    addProduct(userData: ProductProperties) {
      return new Promise((resolve, reject) => {
        axios.post('/apps/users/user', {
          user: userData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single product
    fetchProduct(strapid: number) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axios.get(`/products/${strapid}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete product
    deleteProduct(id: number) {
      return new Promise((resolve, reject) => {
        axios.delete(`/products/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
