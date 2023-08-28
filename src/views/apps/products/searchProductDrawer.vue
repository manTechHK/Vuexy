<script setup lang="ts">
import { filterOptions } from '@/views/apps/products/types';
import { requiredValidator } from '@validators';
import { VForm } from 'vuetify/components/VForm';

interface Props {
    isDrawerOpen: boolean,
}

interface Emit {
    (e: 'update:isDrawerOpen', value: boolean): void
    (e: 'search', value: Omit<filterOptions, 'period'>): void
}


const search = ref<Omit<filterOptions, 'period'>>({
    product_id: '',
    product_name: '',
})
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
    emit('search', search.value)

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
    title="搜索產品"
    @cancel="closeDrawer"/>
        <VForm
        ref="refForm"
        v-model="isFormValid"
        @submit.prevent="onSubmit"
        class="d-flex flex-wrap flex-column gap-5 pa-4">
            <AppTextField
            v-model="search.product_id"
            :rules="[requiredValidator]"
            label="產品編號"
            />
            <AppTextField
            v-model="search.product_name"
            :rules="[requiredValidator]"
            label="產品名稱"
            />
            <VBtn
            type="submit">
                搜索
            </VBtn>
        </VForm>

  </VNavigationDrawer>

</template>