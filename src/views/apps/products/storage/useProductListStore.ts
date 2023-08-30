import axios from '@axios'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { apiProductItem, apiProductListItem, Response } from './type'

export const useProductListStore = defineStore('productListStore', {
  state: () => ({url : `/products`})
  ,actions: {
    // 👉 Fetch products data
    fetchProducts(label? : number, supplier?: number, restock_date?: string, search?: {member_id: number, phone_num: number, email:string, name: string}) { 
      const query = (label?`?label=${label}` : '') + (supplier? `?supplier=${supplier}` : '') +(restock_date? `?new_restock_date=${restock_date}`:'')
      console.log(`${this.url}${query}`)
      return new Promise<AxiosResponse<Response<apiProductListItem[]>>>(async(resolve, reject) => {
        return axios.get(`${this.url}${query}`).then(response => resolve(response)).catch(error => reject(error))
      })
      // return new Promise<AxiosResponse<Response<apiProductListItem[]>>>((resolve, reject) => {
      //   axios.get(`${this.url}`, {...(label && {label: label}), ...(supplier&&{supplier: supplier}), ...(restock_date&&{restock_date: restock_date}), ...(search&&{search: search})}).then(response => resolve(response)).catch(error => reject(error))
      // })
    },

    // 👉 Add product
    // addProduct(userData: ProductProperties) {
    //   return new Promise((resolve, reject) => {
    //     axios.post('/apps/users/user', {
    //       user: userData,
    //     }).then(response => resolve(response))
    //       .catch(error => reject(error))
    //   })
    // },

    // 👉 fetch single product
    fetchProduct(strapid: number) {
      return new Promise<AxiosResponse<Response<apiProductItem>>>((resolve, reject) => {
        axios.get(`${this.url}/${strapid}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete product
    deleteProduct(id: number) {
      return new Promise((resolve, reject) => {
        axios.delete(`${this.url}/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
