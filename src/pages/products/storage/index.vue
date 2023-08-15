<script setup lang="ts">
import { paginationMeta } from '@/@fake-db/utils'
import { apiProductListItem, ProductInfo } from '@/views/apps/products/storage/type'
import { useProductListStore } from '@/views/apps/products/storage/useProductListStore'
import type { Options } from '@core/types'
import { VDataTable } from 'vuetify/labs/VDataTable'

const router = useRouter()
const productListStore = useProductListStore()
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

const tempProductList = [
    {
        product_id: '0',
        name: '1',
        new_supplier: '2',
        new_restock_date: '3',
        new_restock_time: '4',
        new_restock_price: '5',
        new_lowest_price: '6',
        new_selling_price: '7',
        average_restock_price: '8',
        total_stock: '9',
    },
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

const showData = () =>{
    console.log(productList.value)
}
onBeforeMount(fetchProductList)

</script>
<template>
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
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :headers="headers"
        :items="productList"

        class="d-flex flex-column justify-space-between text-no-wrap">
            <template #item = "{item}">
                <tr>
                    <td>
                        {{ item.raw.product_id }}
                    </td>
                    <td>
                        {{ item.raw.name }}
                    </td>
                    <td>
                        {{ item.raw.new_supplier}}
                    </td>
                    <td>
                        {{ item.raw.new_restock_date }}
                    </td>
                    <td>
                        {{ item.raw.new_restock_date }}
                    </td>
                    <td>
                        {{ item.raw.new_restock_price }}
                    </td>
                    <td>
                        {{ item.raw.new_lowest_price }}
                    </td>
                    <td>
                        {{ item.raw.new_selling_price }}
                    </td>
                    <td>
                        {{ item.raw.average_restock_price}}
                    </td>
                    <td>
                        {{ item.raw.total_stock }}
                    </td>
                    <div>
                        <text class="text-secondary">
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
                </tr>
            </template>

            <template #bottom>
                <VCardText class="pt-2 pb-2 ">
                    <VRow class="justify-space-between align-center">
                        <p class="text-sm text-disabled mb-0">
                            {{ paginationMeta(options, productList.length) }}
                        </p>
                            <VPagination
                            variant="text"
                            rounded="circle"
                            v-model="options.page"
                            :length="Math.ceil(productList.length / options.itemsPerPage)"
                            :total-visible="$vuetify.display.xs ? 1 : Math.ceil(productList.length / options.itemsPerPage)"
                            >

                            </VPagination>
                            <div class="d-flex flex-wrap align-center">
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
                    </VRow>
                </VCardText>
            </template>
        </VDataTable>
    </VCol>
</VRow>
</template>
