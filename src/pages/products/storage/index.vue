<script setup lang="ts">
import { ProductInfo } from '@/views/apps/products/storage/type'
import { useProductListStore } from '@/views/apps/products/storage/useProductListStore'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const productListStore = useProductListStore()
const productList = ref<ProductInfo[]>([])
const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })

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
        for(let i = 0; i < response.data.data.length; i++){
            productList.value[i] = response.data.data[i].attributes
        }
    })
}

const showData = () =>{
    console.log(productList.value)
}
onBeforeMount(fetchProductList)

</script>
<template>
<VRow class="d-flex flex-wrap flex-column">
    <VCol class="d-flex flex-grow-0">
        <VCardText class="text-primary font-weight-black text-h3 pa-0">
            產品列表
        </VCardText>
        <VBtn
         prepend-icon="tabler-file-text" 
         class="ml-auto"
         @click="showData">
            入單
        </VBtn>
    </VCol>
    <VCol class="d-flex flex-wrap flex-grow-0">
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
            <VBtn>
                列印產品列表
            </VBtn>
        </VCol>
    </VCol>
    <VCol class="d-flex ">
        <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:pages="options.page"
        :headers="headers"
        :items="productList"
        :items-length="productList.length"
        class="d-flex flex-column justify-space-between">
            <template #body>
                <tr v-for="item in productList" :key="item.product_id">
                    <td>
                        {{ item.product_id }}
                    </td>
                    <td>
                        {{ item.name }}
                    </td>
                    <td>
                        {{ item.new_supplier}}
                    </td>
                    <td>
                        {{ item.new_restock_date }}
                    </td>
                    <td>
                        {{ item.new_restock_date }}
                    </td>
                    <td>
                        {{ item.new_restock_price }}
                    </td>
                    <td>
                        {{ item.new_lowest_price }}
                    </td>
                    <td>
                        {{ item.new_selling_price }}
                    </td>
                    <td>
                        {{ item.average_restock_price}}
                    </td>
                    <td>
                        {{ item.total_stock }}
                    </td>
                </tr>
            </template>

            <template #bottom>
                <VCardText class="pt-2 pb-2 flex-grow-0">
                    <VRow>
                    <VCol
                        class="d-flex justify-center"
                    >
                        <VPagination
                        variant="text"
                        rounded="circle"
                        v-model="options.page"

                        total-visible="5"
                        >

                    </VPagination>
                    </VCol>
                    </VRow>
                </VCardText>
            </template>
        </VDataTableServer>
    </VCol>
</VRow>
</template>
