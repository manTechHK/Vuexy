<script setup lang="ts">
import { storehouseInfo } from '@/views/apps/products/storage/type';
import { requiredValidator } from '@validators';
import { VForm } from 'vuetify/components/VForm';

interface Props {
    isDrawerOpen: boolean,
    storehouse: storehouseInfo
}

interface Emit {
    (e: 'update:isDrawerOpen', value: boolean): void
    (e: 'updateStock', value: any): void
}




const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const refForm = ref<VForm>()

const isFormValid = ref<boolean>(false)

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}

const onSubmit = ():void =>{
    // var empty_flag = false
    // Object.keys(search.value).forEach(element => {
    //     const temp = search.value[element as keyof typeof search.value]
    //     if(temp.length <=0){
    //         empty_flag = true
    //     }
    // })
    // if(empty_flag){
    //     return
    // }
    console.log('submit')


    emit('update:isDrawerOpen', false)
}

const closeDrawer = () => {
    emit('update:isDrawerOpen', false)
    nextTick(() => {
        refForm.value?.resetValidation()
        refForm.value?.reset()
    })
}

</script>
<template>
  <VNavigationDrawer
  temporary
    location="end"
    width="420"
    border="0"
    class="scrollable-content d-flex flex-wrap pa-2"
    @update:model-value="dialogModelValueUpdate"
    scrim="rgb(0, 0, 0, 0)"
    :model-value="props.isDrawerOpen">
    <AppDrawerHeaderSection
    title="倉庫庫存"
    @cancel="closeDrawer"/>
        <VForm
        ref="refForm"
        v-model="isFormValid"
        @submit.prevent="onSubmit"
        class="d-flex flex-wrap flex-column gap-5 pa-4">
            <VCardText>
                倉庫名稱：{{ props.storehouse.storehouse_name }}
            </VCardText>
            <VCardTitle>
                產品數量
            </VCardTitle>
            <VCardText>
                {{ props.storehouse.quantity }}
            </VCardText>
            <VCardTitle>
                產品調貨
            </VCardTitle>
            <AppSelect

            :rules="[requiredValidator]"
            label="入貨倉貨"
            />
            <AppTextField
            type="number"
            :rules="[requiredValidator]"
            label="調貨數量"
            />
        </VForm>

  </VNavigationDrawer>

</template>