<script setup lang="ts">  
import { VDataTable } from 'vuetify/labs/VDataTable'
  const search = ref('')
  const productID = ref()
  const prodcutName = ref('')

  const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })

  interface Tag {
    name: string,
    id: number,
  }

  const TableData=[
    {latestStockingDate: '0', latestStockingTime: '1', latestStockingCost: '2', latestMinStockingCost: '3', latestPrice: '4', stocks: '5', defected: '6', stockingDate: '7', stockingTime: '8', stockingCost: '9', minStockingCost: '10', price: '11', stockingVolumn: '12', supplier:'13', avgStockingPrice:'14'},
  ]

  const headers=[
    [{title: '最新入貨日期', key: 'latestStockingDate', },
    {title: '最新入貨時間', key: 'latestStockingTime', },
    {title: '最新入貨價錢', key: 'latestStockingCost', },
    {title: '最新最低價錢', key: 'latestMinStockingCost', },
    {title: '最新售價', key: 'latestPrice', },
    {title: '存貨', key: 'stocks'},
    {title: '壞貨', key: 'defected'},
  ],[    
    {title: '入貨日期', key: 'stockingDate'},
    {title: '入貨時間', key: 'stockingTime'},
    {title: '入貨價錢', key: 'stockingCost'},
    {title: '最低價錢', key: 'minStockingCost'},
    {title: '售價', key: 'price'},
    {title: '入貨數', key: 'stockingVolumn'},
    {title: '供應商名稱', key: 'supplier'},
    {title: '入貨價平均價', key: 'avgStockingPrice'},]


  ]

  const TagItems = [
    'Red',
    'Hello Kitty',
  ]

  const Tags = ref<Tag[]>([])
  Tags.value[0]={name: '', id: 1}

//  const addTag = ()
</script>

<template>
  <VRow style="height: 100%">
    <VCol cols="4" class="d-flex flex-wrap " style="height: 100%">
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
            @click="Tags.push({id: Tags.length+1, name: ''})">
              添加標簽
            </VBtn>
          </VCol>
        </VRow>
          <VCol v-for= "Tag in Tags"
            :key="Tag.id"
            class="pa-2">
            <AppSelect
            append-icon="tabler-trash"
            placeholder="選擇標簽"
            :items="TagItems"
            @click:append="Tags.splice(Tags.indexOf(Tag), 1)"
            >

            </AppSelect>
          </VCol>
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

          class="pa-2"
          >
          fiewqhefeuiwhqghqbgbvd
          </AppTextField>
        <VCol cols="12" class="">
          <VSpacer/>
        </VCol>
        <VCol cols="12" class="">
          <VSpacer/>
        </VCol>
        <VCol cols="12" class="">
          <VSpacer/>
        </VCol>
        <VCol cols="12" class="">
          <VSpacer/>
        </VCol>
        <VCol cols="12" class="">
          <VSpacer/>
        </VCol>
        <VCol cols="12" class="mt-100 pt-100 pa-2">
          <VBtn block class="">
              儲存
          </VBtn>
        </VCol>
      </VCard>
    </VCol>

    <VCol cols="8" class="d-flex align-content-stretch flex-wrap">
      <VCard
      flat
      class="ma-2 pa-3"
      variant="flat">
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
        <VCol cols="12" class="d-flex align-self-stretch flex-wrap">
          <!-- <v-table 
          sortable="true">
            <thead class="text-left">
              <tr >
                <th v-for="header in headers[0]">
                  <VRow>
                    <VCol>
                      {{ header.title }}
                    </VCol>
                    <VCol class="d-flex ml-auto flex-shrink-1">
                      <v-icon icon="tabler-triangle">
                      </v-icon>
                    </VCol>
                  </VRow>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in TableData">
                <td>
                  {{ data.latestStockingDate }}
                </td>
                <td>
                  {{ data.latestStockingTime }}
                </td>
                <td>
                  {{ data.latestStockingCost }}
                </td>
                <td>
                  {{ data.latestMinStockingCost }}
                </td>
                <td>
                  {{ data.latestPrice }}
                </td>
                <td>
                  {{ data.stocks }}
                </td>
                <td>
                  {{ data.defected }}
                </td>
              </tr>
            </tbody>
          </v-table> -->
          <VCol cols="12" class="d-flex">
            <v-data-table
            :headers="headers[0]"
>
              <template #bottom>
                
              </template>
            </v-data-table>
          </VCol>
          <v-data-table
          :headers="headers[1]"
          height="200px"
          class="justify-center">
            <template #bottom>
              <VCardText class="pt-2">
                <VRow>
                  <VCol
                    class="d-flex justify-center"
                  >
                    <VPagination
                      variant="text"
                      rounded="circle"
                      v-model="options.page"
                      total-visible="5"
                      :length="Math.ceil(TableData.length / options.itemsPerPage)"
                    >

                  </VPagination>
                  </VCol>
                </VRow>
              </VCardText>
            </template>
          </v-data-table>
        </VCol>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.vdatatable-thread{
  color: 'primary'
}
.app-select {
  .v-select{
      .v-input__append path {
      color: red
    }
  }
}
.page-content-container{
  min-height: 100%
}
.page_content_container{
  min-height: 100%
}
</style>