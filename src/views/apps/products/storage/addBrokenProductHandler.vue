<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VNavigationDrawer } from 'vuetify/components'
import { VForm } from 'vuetify/components/VForm'

import { NewBrokenProduct } from './type'


const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:isDrawerOpen', val: boolean): void
  (e: 'addBrokenProduct', val: NewBrokenProduct): void
}>()

interface Props {
  isDrawerOpen: boolean
  brokenProduct: (NewBrokenProduct)
}

const refForm = ref<VForm>()

const newBrokenProduct = ref<NewBrokenProduct>(JSON.parse(JSON.stringify(props.brokenProduct)))

const resetForm = () => {
  newBrokenProduct.value = JSON.parse(JSON.stringify(props.brokenProduct))
  nextTick(() => {
    refForm.value?.resetValidation()
  })
}

watch(() => props.isDrawerOpen, resetForm)

const DeductNumProd = () =>{
  if(newBrokenProduct.value.numProduct > 1){
    newBrokenProduct.value.numProduct--
  }
}

const IncreaceNumProd = () =>{
  newBrokenProduct.value.numProduct++
}

const handleSubmit = () => {
  refForm.value?.validate()
    .then(({ valid }) => {
      if (valid) {

        emit('addBrokenProduct', newBrokenProduct.value)

        // Close drawer
        emit('update:isDrawerOpen', false)
      }
    })
}

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}

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
      @cancel="$emit('update:isDrawerOpen', false)"
      class="app-drawer-header-section"
      />

      <PerfectScrollbar :options="{ wheelPropagation: false }">
        <VCard flat>
          <VCardTitle >
            <p>產品編號{{  }}</p>
            <h6>產品名稱</h6>
          </VCardTitle>
          <VCardText>
            <VRow>
              <VCol cols="6" class="justify-space-between d-flex">
                <VBtn
                icon="tabler-minus"
                variant="outlined"
                @click="DeductNumProd"
                />
                <p class="ma-3 pa-1">{{ newBrokenProduct.numProduct }}</p>
                <VBtn
                icon="tabler-plus"
                variant="outlined"
                class=""
                @click="IncreaceNumProd"
                />
                
              </VCol>
              <VCol cols="12" class="py-1">
                <AppSelect 
                  label="壞貨位置"
                  placeholder="請選擇"
                >

                </AppSelect>
              </VCol>
              <VCol cols="12" class="py-1">
                <AppDateTimePicker
                  label="添加日期"
                  placeholder="請選擇"
                  prepend-inner-icon="tabler-calendar"
                  :config="{ dateFormat: 'Y.m.d' }"
                />
              </VCol>
              <VCol cols="12">
                <AppTextarea
                 label="壞貨備註" 
                >
                  
                </AppTextarea>
              </VCol>
              <VCol cols="12" class="pt-5">
                <VBtn block>
                  儲存
                  
                </VBtn>
              </VCol>
            </VRow>
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