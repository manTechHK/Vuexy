<script setup lang="ts">
import { ProductProperties } from './storage/type'
import { blankProductProperties } from './storage/useBlankProductProperties'
import { useProductListStore } from './storage/useProductListStore'


interface Props {
    isDrawerOpen: boolean,
    product_strapi_id: number,
}

interface Emit {
    (e: 'update:isDrawerOpen', value: boolean):void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const productListStore = useProductListStore()
const product = ref<ProductProperties>(blankProductProperties)

const headers=[
    [
        {title: '標籤', key: 'labels'}
    ],
    [
        {title: '樣色', key: 'variation'}
    ],
    [
        {title: '最新入貨日期', key: 'new_restock_date', },
        {title: '最新入貨價錢', key: 'new_restock_price', },
        {title: '最新最低價錢', key: 'new_lowest_pice', },
        {title: '最新售價', key: 'new_selling_price', },
        {title: '存貨', key: 'total_stock', },
    ],
    [    
        {title: '入貨日期', key: 'restock_date'},
        {title: '入貨時間', key: 'restock_time'},
        {title: '入貨價錢', key: 'restock_price'},
        {title: '最低價錢', key: 'lowest_price'},
        {title: '售價', key: 'selling_price'},
        {title: '入貨數', key: 'quantity'},
        {title: '供應商名稱', key: 'supplier_name'},
    ],[
        {title: '入貨價平均價', key: 'average_restock_price'},
    ]
]

const fetchProductInfo = async() => {
    //current major delay is api fetch, can consider fetching entire page of product when getting product list
    await productListStore.fetchProduct(Number(props.product_strapi_id)).then(response => {
        product.value = response.data.data.attributes
    })
    console.log(product.value)
}

const closeProductDetailDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    product.value = blankProductProperties
  })
}

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
  if(!val){
    nextTick(() => {
        product.value = blankProductProperties
    })
  }
}

watch(()=>props.isDrawerOpen, async(val) => {
    if(val){
        fetchProductInfo()
    }
}, {immediate: true})
</script>
<template>
    <VNavigationDrawer
    temporary
    location="end"
    width="800"
    border="0"
    class="d-flex flex-wrap pa-3 pt-5"
    @update:model-value="dialogModelValueUpdate"
    scrim="rgb(0, 0, 0, 0)"
    :model-value="props.isDrawerOpen"
    >
        <AppDrawerHeaderSection
        @cancel="closeProductDetailDrawer"
        title="庫存詳情"
        class="app-drawer-header-section"/>
        <VCard
        variant="tonal"
        class="ma-2">
            <VCardText class="pa-2 ">
                <p class="mb-0" style="height: 22px;">{{ product.product_id }}</p>
                <p class="mb-0" style="height: 22px;">{{ product.name }}</p>
            </VCardText>
        </VCard>

        <VTable class="ma-2">
            <thead style="background: rgb(238, 238, 238)">
                <tr>
                    <th v-for="header in headers[0]">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in product.labels.data">
                    <td>
                        {{ item.attributes.name }}
                    </td>
                </tr>
            </tbody>
        </VTable>
        <VTable
        class="ma-2">
            <thead style="background: rgb(238, 238, 238)">
                <tr>
                    <th v-for="header in headers[1]">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in product.variation.data">
                    <td>
                        {{ item.attributes.name }}
                    </td>
                </tr>
            </tbody>
        </VTable>
        <VTable
        class="ma-2">
            <thead>
                <tr>
                    <th v-for="header in headers[2]">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr >
                    <th v-for="header in headers[2]">
                        {{ product[header.key as keyof typeof product] }}
                    </th>
                </tr>
                <tr></tr>
            </tbody>
        </VTable>
        <VTable
        class="ma-2"
        >
            <thead>
                <tr>
                    <th v-for="header in headers[3]">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in product.restock">
                    <th v-for="header in headers[3]">
                        {{ item[header.key as keyof typeof item] }}
                    </th>
                </tr>
                <tr></tr>
            </tbody>
        </VTable>
        <VTable class="ma-2">
            <thead>
                <tr>
                    <th v-for="header in headers[4]">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th v-for="header in headers[4]">
                        {{ product[header.key as keyof typeof product] }}
                    </th>
                </tr>
            </tbody>
        </VTable>
    </VNavigationDrawer>
</template>
