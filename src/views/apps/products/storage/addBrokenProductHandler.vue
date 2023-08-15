<script setup lang="ts">
import { storehouseInfo, useStorehouseStore } from '@/views/apps/products/brokenProducts/useStorehouseStore';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { VNavigationDrawer } from 'vuetify/components';
import { VForm } from 'vuetify/components/VForm';

import { BrokenProductInfo, NewBrokenProduct } from './type';

const storehouseStore = useStorehouseStore()
const options_Storehouse = ref<{text: string, value: number}[]>()

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:isDrawerOpen', val: boolean): void
  (e: 'addBrokenProduct', val: NewBrokenProduct): void
}>()

interface Props {
  isDrawerOpen: boolean
  brokenProduct: (BrokenProductInfo)
}

const formIsValid = ():boolean => {
  return !!((!!newBrokenProduct.value.date) && (!!newBrokenProduct.value.storehouse_id) && (!!newBrokenProduct.value.remarks))
}

const refForm = ref<VForm>()

const newBrokenProduct = ref<BrokenProductInfo>(JSON.parse(JSON.stringify(props.brokenProduct)))

const rules = (value: any)=> [!!value || 'Input Missing!']

const resetForm = () => {
  newBrokenProduct.value = JSON.parse(JSON.stringify(props.brokenProduct))
    refForm.value?.resetValidation()
    refForm.value?.reset()
}

const DeductNumProd = () =>{
  if(newBrokenProduct.value.quantity > 1){
    newBrokenProduct.value.quantity--
  }
}

const IncreaceNumProd = () =>{
  newBrokenProduct.value.quantity++
}

const handleSubmit = () => {
    if (formIsValid()) {
      console.log('form is valid')
      emit('addBrokenProduct', {
        product_id: newBrokenProduct.value.strapi_id,
        quantity: newBrokenProduct.value.quantity,
        storehouse_id: newBrokenProduct.value.storehouse_id,
        date: newBrokenProduct.value.date,
        remarks: newBrokenProduct.value.remarks
      })

      // Close drawer
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        newBrokenProduct.value = JSON.parse(JSON.stringify(props.brokenProduct))
        refForm.value?.resetValidation()
        refForm.value?.reset()
      })
    }
}

const closeAddBrokenProductDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    newBrokenProduct.value = JSON.parse(JSON.stringify(props.brokenProduct))
    refForm.value?.resetValidation()
    refForm.value?.reset()
  })

}

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}

const setStorehouseOptions = async () => {
    await storehouseStore.fetchStorehouses().then(response => {
        options_Storehouse.value = response.map((obj: { attributes: storehouseInfo; id: number; }) => ({
            text: obj.attributes.name,
            value: obj.id
        }))
    })
}

watch(props.brokenProduct, ()=> (newBrokenProduct.value = JSON.parse(JSON.stringify(props.brokenProduct))), {immediate: true})

onMounted(setStorehouseOptions)
</script>

<template>
    <VNavigationDrawer
    temporary
    location="end"
    width="420"
    border="0"
    class="scrollable-content d-flex flex-wrap pa-3 pt-5"
    @update:model-value="dialogModelValueUpdate"
    scrim="rgb(0, 0, 0, 0)"
    :model-value="props.isDrawerOpen">

      <AppDrawerHeaderSection
      title= "壞貨"
      @cancel="closeAddBrokenProductDrawer"
      class="app-drawer-header-section"
      />

      <PerfectScrollbar :options="{ wheelPropagation: false }">
        <VCard flat>
          <VCardTitle >
            <p class="mb-0">產品編號：{{ newBrokenProduct.product_id }}</p>
            <h6 class="text-disabled">產品名稱：{{ newBrokenProduct.name }}</h6>
          </VCardTitle>
          <VCardText>
            <VForm 
              ref="refForm"
              @submit.prevent="handleSubmit">
              <VRow>
                <VCol cols="6" class="justify-space-between d-flex align-center">
                  <VBtn
                  icon="tabler-minus"
                  variant="outlined"
                  @click="DeductNumProd"
                  />
                  <p class="ma-3 pa-1">{{ newBrokenProduct.quantity }}</p>
                  <VBtn
                  icon="tabler-plus"
                  variant="outlined"
                  class=""
                  @click="IncreaceNumProd"
                  />
                  
                </VCol>
                <VCol cols="12" class="py-1">
                  <AppSelect 
                    v-model="newBrokenProduct.storehouse_id"
                    label="壞貨位置"
                    placeholder="請選擇"
                    :items="options_Storehouse"
                    item-title="text"
                    item-value="value"
                    :rules="rules(newBrokenProduct.storehouse_id)"
                    validate-on="submit"
                  >

                  </AppSelect>
                </VCol>
                <VCol cols="12" class="py-1">
                  <AppDateTimePicker
                    v-model="newBrokenProduct.date"
                    label="添加日期"
                    placeholder="請選擇"
                    prepend-inner-icon="tabler-calendar"
                    :config="{ dateFormat: 'Y.m.d' }"
                    :rules="rules(newBrokenProduct.date)"
                    validate-on="submit"
                  />
                </VCol>
                <VCol cols="12">
                  <AppTextarea
                  v-model="newBrokenProduct.remarks"
                  label="壞貨備註" 
                  :rules="rules(newBrokenProduct.remarks)"
                  validate-on="submit"
                  >
                    
                  </AppTextarea>
                </VCol>
                <VCol cols="12" class="pt-5">
                  <VBtn block
                  type="submit">
                    儲存
                    
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </PerfectScrollbar>

    </VNavigationDrawer>
</template>

<style lang="scss">
.v-navigation-drawer{
  .app-drawer-header-section{
    .v-btn{
      border-radius: 6px; /* Adjust the radius as needed */
      border: 2px solid grey;
    }
  }
}
.v-navigation-drawer{
  .v-card-text{
    .v-btn{
      border-radius: 6px; /* Adjust the radius as needed */
      border: 2px solid grey;
    }
  }
}
</style>