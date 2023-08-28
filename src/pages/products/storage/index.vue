<script setup lang="ts">

import productDetailDrawer from '@/views/apps/products/productDetailDrawer.vue'
import SearchProductDrawer from '@/views/apps/products/searchProductDrawer.vue'
import { ProductInfo } from '@/views/apps/products/storage/type'
import { useProductListStore } from '@/views/apps/products/storage/useProductListStore'
import { filterOptions, Options } from '@/views/apps/products/types'
import { useLabelStore } from '@/views/apps/products/useLabelStore'
import { VDataTable } from 'vuetify/labs/VDataTable'

interface labelItem{
    id: number,
    name: string,
}

const router = useRouter()
const isProductDetailDrawerActive = ref(false)
const isSearchProductDrawerActive = ref(false)

const selectedLabel = ref()
const selectedDate = ref<string>()

const productListStore = useProductListStore()
const labelStore = useLabelStore()

const productDrawerIndex = ref(NaN)
const labelOptions = ref<labelItem[]>([])
const productList = ref<ProductInfo[]>([])
const options = ref<Options>({
  page: 1,
  itemsPerPage: 10,
  filter: {
    period: '',
    product_id: '',
    product_name: ''
    },
  query: {
    new_restock_date: '',
  }
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
    await productListStore.fetchProducts(options.value.query.label, options.value.query.supplier, options.value.query.new_restock_date).then(response => {
        // console.log(options.value.query)
        productList.value = response.data.data.map(item => {
            return {
            strapi_id: item.id,
            product_id: item.attributes.product_id,
            name: item.attributes.name,
            new_supplier:  item.attributes.new_supplier,
            new_restock_date: item.attributes.new_restock_date?.match(RegExp(/\d{4}\-\d{2}\-\d{2}/))![0],
            new_restock_time: item.attributes.new_restock_date?.match(RegExp(/\d{2}\:\d{2}\:\d{2}/))![0],
            new_restock_price: item.attributes.new_restock_price,
            new_lowest_price: item.attributes.new_lowest_price,
            new_selling_price: item.attributes.new_selling_price,
            total_stock: item.attributes.total_stock,
            average_restock_price: item.attributes.average_restock_price}
        })
        
    }).catch(error => console.log(error))
}

const getLabelOptions = async() => {
    await labelStore.fetchLabels().then(response =>{
        if(response.data.data.length){
            response.data.data.forEach(label => (
            labelOptions.value.push({
                id: label.id,
                name: label.attributes.name
            })))
        }
    }).catch(err => console.log(err))
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
const filterTableItems = (product : ProductInfo ):boolean  => {
  return searchFilter({product_id: product.product_id, product_name: product.name, period: product.new_restock_time})
}

// const labelFilter = (labels: labelItem[]):boolean => {
//     if(!selectedLabel.value){
//         return true
//     }
//     return labels.some(({id}) => {
//         id === selectedLabel.value.id
//     })
// }



const searchFilter = (search : filterOptions) => {
  return (options.value.filter.product_id? search.product_id.includes(options.value.filter.product_id):true) && (options.value.filter.product_name?  search.product_name.includes(options.value.filter.product_name ):true)
}

const openProductDetailDrawer =  (strapi_id: number) => {
    updateProductDrawerIndex(strapi_id)
    isProductDetailDrawerActive.value = true
}

const updateProductDrawerIndex = (strapi_id: number) => {
    productDrawerIndex.value = strapi_id
}

const updateSearchQuery = (query: Omit<filterOptions, 'period'>) => {
    options.value.filter = {product_id: query.product_id, product_name: query.product_name, period: options.value.filter.period}
}

const showData = () =>{
    console.log(productList.value)
}
watchEffect(fetchProductList)
watch(()=>options.value.query, fetchProductList)
watchEffect(getLabelOptions)

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
            <VAutocomplete
            v-model="options.query.label"
            hide-selected
            label="標籤"
            :items="labelOptions"
            item-title="name"
            item-value="id">

            </VAutocomplete>
        </VCol>
        <VCol class="pa-1">
            <VAutocomplete
            v-model="options.filter.period"
            />
        </VCol>
        <VCol class="pa-1">
            <AppDateTimePicker
            v-model="options.query.new_restock_date"
            prepend-inner-icon="tabler-calendar"
            />
        </VCol>
        <VCol class="pa-1">
            <AppTextField
            readonly
            @click="isSearchProductDrawerActive=true"
            append-inner-icon="tabler-search"
            />
        </VCol>
        <VCol class="d-flex flex-grow-0 pa-1">
            <VBtn 
             prepend-icon="tabler-circle-plus"
             :to="{ name: 'products-storage-addNewProduct' }">
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
        :items="productList.filter(filterTableItems)"

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
                                {{ paginationMeta(options, productList.filter(filterTableItems).length) }}
                            </p>
                        </VCol>
                        <VCol>
                            <VPagination
                            variant="text"
                            rounded="circle"
                            v-model="options.page"
                            :length="Math.ceil(productList.filter(filterTableItems).length / options.itemsPerPage)"
                            :total-visible="$vuetify.display.xs ? 1 : Math.ceil(productList.filter(filterTableItems).length / options.itemsPerPage)"
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
<SearchProductDrawer
    v-model:is-drawer-open="isSearchProductDrawerActive"
    @search="updateSearchQuery"/>
</div>
</template>
