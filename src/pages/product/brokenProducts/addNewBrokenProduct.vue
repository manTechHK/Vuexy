<script setup lang="ts">
import { newBrokenProductForm } from '@/views/apps/product/storage/type';
import { blankBrokenProductForm } from '@/views/apps/product/storage/useBrokenProductForm';
import { productInfo, useProductStore } from '@/views/apps/product/storage/useProductStore';
import { storehouseInfo, useStorehouseStore } from '@/views/apps/product/storage/useStorehouseStore';
import axios from '@axios';

const storehouseStore = useStorehouseStore()
const productStore = useProductStore()

const addNewBrokenProductForm = ref<newBrokenProductForm>(blankBrokenProductForm)
const options_Storehouse = ref<{text: string, value: number}[]>()
const options_Product_id = ref<{text :string, value: number}[]>()
const options_Product_name = ref<{text :string, value: number}[]>()

const numericRule =  (v:string) => [/^\d+$/.test(v) || 'Input must be a number']

const showStuff = () => {
    console.log(addNewBrokenProductForm.value.date)
}

const clearBrokenProductForm = () => {
    addNewBrokenProductForm.value = blankBrokenProductForm
}

const setStorehouseOptions = () => {
    storehouseStore.fetchStorehouses().then(response => {
        options_Storehouse.value = response.map((obj: { attributes: storehouseInfo; id: number; }) => ({
            text: obj.attributes.name,
            value: obj.id
        }))
    })
    console.log(storehouseStore.storehouseStore)
    console.log(options_Storehouse.value)
}
const setProductOptions = () => {
    productStore.fetchProducts().then(response => {
        options_Product_id.value = response.map((obj: { attributes: productInfo; id: number; }) => ({
            text: obj.attributes.product_id,
            value: obj.id
        }))
        options_Product_name.value = response.map((obj: { attributes: productInfo; id: number; }) => ({
            text: obj.attributes.name,
            value: obj.id
        }))
    })
    console.log(options_Product_id.value)
    console.log(options_Product_name.value)
}

const postBrokenProduct = () => {
    const response = axios.post('/broken-products', {product_id: +addNewBrokenProductForm.value.product_id, quantity: +addNewBrokenProductForm.value.quantity, storehouse_id: +addNewBrokenProductForm.value.storehouse_id, date: addNewBrokenProductForm.value.date, remarks: addNewBrokenProductForm.value.remarks})
    console.log(response)   
}

onBeforeMount(setStorehouseOptions)
onBeforeMount(setProductOptions)

</script>
<template>
<VRow>
    <VCol cols="4" >
        <VForm
        @submit.prevent="postBrokenProduct" class="d-flex flex-column gap-4">
            <VCardText>
                添加壞貨
            </VCardText>
            <VAutocomplete
            v-model="addNewBrokenProductForm.product_id"
            :items="options_Product_id"
            item-title="text"
            item-value="value"
            :rules="addNewBrokenProductForm.product_id?numericRule(addNewBrokenProductForm.product_id?.toString()):[]"
            label="產品編號"
            >
            
            </VAutocomplete>
            <VAutocomplete
            disabled
            readonly
            label="產品名稱">
                
            </VAutocomplete>
            <VTextField
            v-model="addNewBrokenProductForm.quantity"
            :rules="addNewBrokenProductForm.quantity?numericRule(addNewBrokenProductForm.quantity?.toString()):[]"
            label="數量">
                
            </VTextField>
            <AppSelect
            v-model="addNewBrokenProductForm.storehouse_id"
            :items="options_Storehouse"
            item-title="text"
            item-value="value"
            label="壞貨位置">
            </AppSelect>
            <AppDateTimePicker
            v-model="addNewBrokenProductForm.date"
            prepend-inner-icon="tabler-calendar"
            label="日期">
            </AppDateTimePicker>
            <VTextField
            v-model="addNewBrokenProductForm.remarks"
            label="備註">
            </VTextField>
            <VCol class="d-flex flex-row pa-0 gap-3">
                <VBtn class="flex-fill"
                @click="clearBrokenProductForm"
                :to="{ name: 'product-brokenProducts' }">
                    取消
                </VBtn>
                <VBtn class="flex-fill bg-secondary"
                @click="postBrokenProduct">
                    儲存
                </VBtn>
                
            </VCol>
        </VForm>
    </VCol>
</VRow>
</template>