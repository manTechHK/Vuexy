<script setup lang="ts">

import { brokenProductProperties } from '@/views/apps/products/types'
import { useBrokenProductStore } from '@/views/apps/products/useBrokenProductStore'

interface Props {
    isDrawerOpen: boolean,
    product_strapi_id: number
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
    await brokenProductStore.fetchBrokenProduct(Number(props.product_strapi_id)).then(response => {
        brokenProduct.value = response.data.data
    })
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
        title="壞貨詳情"/>
        <VCard 
        plain>
            <p>
                產品稱號：{{  }}
            </p>
            <p class="text-disabled text-h6">
                產品名稱：{{  }}
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
    </VNavigationDrawer>
</template>