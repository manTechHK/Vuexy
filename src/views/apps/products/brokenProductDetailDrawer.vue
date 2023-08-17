<script setup lang="ts">

import { brokenProductProperties } from '@/views/apps/products/types'
import { useBrokenProductStore } from '@/views/apps/products/useBrokenProductStore'

interface Props {
    isDrawerOpen: boolean,
    product_strapi_id?: number
}

interface Emit {
    (e: 'update:isDrawerOpen', value: boolean): void
    (e: 'deleteBrokenProduct', value: number): void
}
const brokenProductStore = useBrokenProductStore()

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const brokenProduct = ref<brokenProductProperties>()

const isConfirmDeleteBrokenProductDialogActive = ref(false)

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}

const fetchBrokenProductInfo = async() => {
    brokenProduct.value=undefined
    if(props.product_strapi_id){
        await brokenProductStore.fetchBrokenProduct(Number(props.product_strapi_id)).then(response => {
            brokenProduct.value = response.data.data.attributes
            console.log(response)
        })
    }
}

const closeBrokenProductDetailDrawer = () => {
    emit('update:isDrawerOpen', false)
}

const deleteBrokenProduct = async() => {
    if(props.product_strapi_id){
        emit('deleteBrokenProduct', props.product_strapi_id)
    }
}

watch(()=> props.product_strapi_id, fetchBrokenProductInfo, {immediate: true})


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
    :model-value="props.isDrawerOpen">
        <AppDrawerHeaderSection
        @cancel="closeBrokenProductDetailDrawer"
        title="壞貨詳情"/>
        <VCard 
        plain>
            <p>
                產品稱號：{{ brokenProduct?.product_id }}
            </p>
            <p class="text-disabled text-h6">
                產品名稱：{{ brokenProduct?.product_name }}
            </p>
        </VCard>
        <VCard
        outlined
        style="border-width: 4px;"
        class="d-flex flex-wrap flex-column">
            <VBtn
            icon="tabler-trash"
            icon-color="error"
            @click="isConfirmDeleteBrokenProductDialogActive = true"
            class="ml-auto"
            />

            <VCardText>
                <div>
                    數量
                </div>
                <div>
                    {{ brokenProduct?.quantity }}
                </div>
                <div>
                    壞貨位置
                </div>
                <div>
                    {{ brokenProduct?.storehouse_name }}
                </div>
                <div>
                    添加日期
                </div>
                <div>
                    {{ brokenProduct?.date }}
                </div>
                <div>
                    壞貨備註
                </div>
                <div>
                    {{ brokenProduct?.remarks }}
                </div>
            </VCardText>
        </VCard>
        
        <VDialog
        v-model="isConfirmDeleteBrokenProductDialogActive"
        width="500px">
            <VCard class="pa-4">
                <VCardTitle>
                    Delete Broken Product
                </VCardTitle>
                <VCardText>
                    Are you sure to delete broken products of {{ brokenProduct?.product_name }} ?
                </VCardText>
                <div class="d-flex justify-space-around">
                    <VBtn>
                        Delete
                    </VBtn>
                    <VBtn
                    @click="isConfirmDeleteBrokenProductDialogActive=false">
                        Cancel
                    </VBtn>
                </div>
            </VCard>
        </VDialog>
    </VNavigationDrawer>
</template>