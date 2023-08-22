import axios from '@axios'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { label, Response } from './storage/type'
//incomplete, wip
export const useLabelStore = defineStore('LabelStore', {
  actions: {

    // 👉 Fetch labels
    fetchLabels() { 
      return new Promise<AxiosResponse<Response<label[]>>>((resolve, reject) => {
        axios.get(`/labels`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Add label
    // addLabel(label: NewLabel) {
    //   return new Promise((resolve, reject) => {
    //     axios.post('/labels', {},
    //     ).then(response => resolve(response))
    //       .catch(error => reject(error))
    //   })
    // },

    // 👉 fetch single label
    fetchLabel(strapid: number) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axios.get(`/labels/${strapid}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete label
    // deleteLabel(strapi_id: number) {
    //   return new Promise((resolve, reject) => {
    //     axios.delete(`/labels/${strapi_id}`).then(response => resolve(response)).catch(error => reject(error))
    //   })
    // },
  },
})
