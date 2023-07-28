<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
  const search = ref('')
  const productID = ref()
  const prodcutName = ref('')

  interface Tag {
    name: string,
    id: number,
  }

  const headers=[
    {title: '最新入貨日期', key: 'latest_date'},
    {title: '最新入貨時間', key: 'latest_time'},
    {title: '最新入貨價錢', key: 'latest_cost'},
    {title: '最新最低價錢', key: 'latest_min_cost'},
    {title: '最新售價', key: 'latest_price'},
    {title: '存貨', key: 'stocks'},
    {title: '壞貨', key: 'defected'},

  ]

  const Tags = ref<Tag[]>([])
  Tags.value[0]={name: 'red', id: 1}

//  const addTag = ()
</script>

<template>
  <VRow>
    <VCol cols="4" class="">
      <VCard
      flat
      height="100%"
      >
        <VTextField
          v-model="search"
          label=""
          placeholder="搜索"
          append-inner-icon="tabler-search"
          @click:append-inner=""
          class="pa-2"
          >

        </VTextField>
        <VCardText
        class="font-weight-bold text-primary pl-2"
        >
          產品編輯
        </VCardText>
        <VTextField
          v-model="productID"
          label="產品編號"
          class="pa-2"
          >

        </VTextField>
        <VTextField
          v-model="prodcutName"
          label="產品名稱"
          class="pa-2"
          >

        </VTextField>
        <VTextField
          v-model="search"
          label="建立日期"
          prepend-inner-icon="tabler-calendar"
          @click:prepend-inner=""
          class="pa-2"
          >

        </VTextField>

        <VRow class="pt-5 pa-2">
          <VCol cols="6">
            <VCardText
              class="font-weight-bold text-primary pa-1"
              >
              標簽
            </VCardText>
          </VCol>
          <VCol cols="6">
            <VBtn

            prepend-icon="tabler-circle-plus"
            density="compact"
            class="d-flex ml-auto text-normal"
            @click="">
              添加標簽
            </VBtn>
          </VCol>
        </VRow>
          <AppSelect v-for= "Tag in Tags"
  
          append-icon="tabler-trash"
          @click:append=""
          class="pa-2">

          </AppSelect>
          <VRow class="pa-2">
            <VCol cols="6">
              <VCardText
              
                class="font-weight-bold text-primary pa-1"
                >
                帳單顯示備註
              </VCardText>
  
            </VCol>
            <VCol cols="6" class="d-flex ml-auto text-normal">
              <VBtn
              prepend-icon="tabler-circle-plus"
              density="compact"
              class="d-flex ml-auto text-normal"
              @click="">
                添加顯示備註
              </VBtn>
  
            </VCol>

          </VRow>
          <AppTextField
          readonly
          class="pa-2"
          >
          fiewqhefeuiwhqghqbgbvd
          </AppTextField>
        <VCol cols="12" class="pa-2">
          <VBtn block class="">
              儲存
          </VBtn>
        </VCol>
      </VCard>
    </VCol>

    <VCol cols="8" class="d-flex">
      <VCard
      flat
      width="100%"
      class="ma-2 pa-3">
        <VRow class="d-flex gap-4 mb-3">
          <VBtn 
          prepend-icon="tabler-circle-plus">
            添加入貨訊息
          </VBtn>
          <VBtn
          variant="outlined" 
          prepend-icon="tabler-circle-minus">
            添加壞貨
          </VBtn>
          <VBtn 
          variant="outlined"
          prepend-icon="tabler-file-text"
          class="ml-auto"
          >
            入單
          </VBtn>
  
        </VRow>
        <VCol cols="12">
          <VDataTable
            class="bg-grey-200"
            :headers="headers">

          </VDataTable>
          
        </VCol>
        <VCol cols="12">
          <VDataTable
            class="bg-grey-200"
            :headers="headers">

          </VDataTable>
          
        </VCol>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.vdatatable-thread{
  color: 'primary'
}
</style>