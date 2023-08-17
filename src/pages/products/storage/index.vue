<script setup lang="ts">

import productDetailDrawer from '@/views/apps/products/productDetailDrawer.vue'
import { apiProductListItem, ProductInfo } from '@/views/apps/products/storage/type'
import { useProductListStore } from '@/views/apps/products/storage/useProductListStore'
import type { Options } from '@core/types'
import { VDataTable } from 'vuetify/labs/VDataTable'

const router = useRouter()
const isProductDetailDrawerActive = ref(false)
const productListStore = useProductListStore()
const productDrawerIndex = ref(NaN)
const productList = ref<ProductInfo[]>([])
const options = ref<Options>({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

const headers=[
    {title: '產品編號', key: 'product_id'},
    {title: '產品名稱', key: 'name'},
    {title: '供應商', key: 'new_supplier'},
    {title: '最新入貨日期', key: 'new_restock_date'},
    {title: '最新入貨時間', key: 'new_restock_time'},
    {title: '最新入貨價錢', key: 'new_restock_price'},
    {title: '最新最低價錢', key: 'new_lowest_price'},
    {title: '最新售價', key: 'new_selling_price'},
    {title: '入貨價平均價', key: 'average_restock_price'},
    {title: '存貨', key: 'total_stock'},
]



const fetchProductList = async () => {
    await productListStore.fetchProducts().then(response => {
        productList.value = response.data.data.map((item : apiProductListItem) => {
            return {
            strapi_id: item.id,
            product_id: item.attributes.product_id,
            name: item.attributes.name,
            new_supplier:  item.attributes.new_supplier,
            new_restock_date: item.attributes.new_restock_date,
            new_restock_price: item.attributes.new_restock_price,
            new_lowest_price: item.attributes.new_lowest_price,
            new_selling_price: item.attributes.new_selling_price,
            total_stock: item.attributes.total_stock,
            average_restock_price: item.attributes.average_restock_price}
        })
        console.log(productList.value)
    })
}

// const navEditProduct = (selectedProduct:any) => {
//     for(var index = 0; index < productList.value.length; index++){
//         if(selectedProduct === productList.value[index].attributes.product_id){
//             router.push(`details/${productList.value[index].strapi_id}`) 
//             console.log(productList.value[index].strapi_id)
//             return
//         }
//     }
// }

const paginationMeta = computed(() => {
  return <T extends { page: number; itemsPerPage: number }>(options: T, total: number) => {
    const start = (options.page - 1) * options.itemsPerPage + 1
    const end = Math.min(options.page * options.itemsPerPage, total)

    return `${start} - ${end} of ${total}`
  }
})

const openProductDetailDrawer =  (strapi_id: number) => {
    updateProductDrawerIndex(strapi_id)
    isProductDetailDrawerActive.value = true
}

const updateProductDrawerIndex = (strapi_id: number) => {
    productDrawerIndex.value = strapi_id
}

const showData = () =>{
    console.log(productList.value)
}
onBeforeMount(fetchProductList)

</script>
<template>
<div>
<VRow class="d-flex flex-wrap flex-column">
    <VCol class="d-flex flex-grow-0 pa-2" >
        <VCardText class="text-primary font-weight-black text-h3 pa-0">
            產品列表
        </VCardText>
        <VBtn
        variant="outlined" 
         prepend-icon="tabler-file-text" 
         class="ml-auto"
         @click="showData">
            入單
        </VBtn>
    </VCol>
    <VCol class="d-flex flex-wrap flex-grow-0 pa-2">
        <VCol class="pa-1">
            <VAutocomplete></VAutocomplete>
        </VCol>
        <VCol class="pa-1">
            <VAutocomplete></VAutocomplete>
        </VCol>
        <VCol class="pa-1">
            <AppDateTimePicker
            prepend-inner-icon="tabler-calendar"
            />
        </VCol>
        <VCol class="pa-1">
            <AppTextField
            append-inner-icon="tabler-search"
            />
        </VCol>
        <VCol class="d-flex flex-grow-0 pa-1">
            <VBtn 
             prepend-icon="tabler-circle-plus">
                添加產品資料
            </VBtn>
        </VCol>
        <VCol class="d-flex flex-grow-0 pa-1">
            <VBtn
            variant="outlined" >
                列印產品列表
            </VBtn>
        </VCol>
    </VCol>
    <VCol class="d-flex pa-2">
        <VDataTable
        height="68vh"
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :headers="headers"
        :items="productList"

        class="d-flex flex-column justify-space-between text-no-wrap">
            <template #item.total_stock = "{item}">
                
                    <td class="d-flex align-center justify-space-between pr-0">
                        {{ item.raw.total_stock }}
                        <div>
                            <div>
                                <text class="text-secondary"
                                @click="openProductDetailDrawer(item.raw.strapi_id)">
                                    庫存詳情
                                </text>
                            </div>
                            <text class="text-base">
                                <RouterLink
                                :to="{ name: 'products-edit-id',params: { id: item.raw.strapi_id } }"
                                class="font-weight-medium user-list-name text-secondary"
                                >
                                編輯
                                </RouterLink>
                            </text>
        
        
                            <text style="color: red;">
                                刪除
                            </text>
                        </div>
                    </td>
            </template>

            <template #bottom>
                <VCardText class="pt-2 pb-2 ">
                    <VRow class="justify-space-between align-center">
                        <VCol>
                            <p class="text-sm text-disabled mb-0">
                                {{ paginationMeta(options, productList.length) }}
                            </p>
                        </VCol>
                        <VCol>
                            <VPagination
                            variant="text"
                            rounded="circle"
                            v-model="options.page"
                            :length="Math.ceil(productList.length / options.itemsPerPage)"
                            :total-visible="$vuetify.display.xs ? 1 : Math.ceil(productList.length / options.itemsPerPage)"
                            >
                            </VPagination>
                        </VCol>
                        <VCol class="d-flex flex-wrap justify-end">

                            <div class="d-flex align-center">
                                <p class="mb-0 pr-4">
                                    每頁數量
                                </p>
                                <AppSelect
                                    :model-value="options.itemsPerPage"
                                    :items="[
                                    { value: 10, title: '10' },
                                    { value: 25, title: '25' },
                                    { value: 50, title: '50' },
                                    { value: 100, title: '100' },
                                    { value: -1, title: 'All' },
                                    ]"
                                    style="width: 6.25rem;"
                                    @update:model-value="options.itemsPerPage = parseInt($event, 10)"
                                />
                            </div>
                        </VCol>
                    </VRow>
                </VCardText>
            </template>
        </VDataTable>
    </VCol>
</VRow>
<productDetailDrawer
    v-model:isDrawerOpen="isProductDetailDrawerActive"
    v-model:product_strapi_id="productDrawerIndex">

</productDetailDrawer>
</div>
</template>
