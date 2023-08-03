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
    class="scrollable-content d-flex flex-wrap"
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
        </VCard>
      </PerfectScrollbar>

      


    </VNavigationDrawer>
</template>

<style lang="scss">
.v-navigation-drawer{
  .app-drawer-header-section{
    .v-btn{
      border-radius: 6px; /* Adjust the radius as needed */
      padding: 6px 8px; /* Adjust the padding as needed */
      font-size: 8px; /* Adjust the font-size as needed */
      border: 2px solid currentColor;
    }
  }
}
</style>