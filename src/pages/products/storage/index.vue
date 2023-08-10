<script setup lang="ts">  

import AddBrokenProductHandler from '@/views/apps/products/storage/addBrokenProductHandler.vue'
import { blankBrokenProduct } from '@/views/apps/products/storage/useBrokenProductForm'
import { VDataTable } from 'vuetify/labs/VDataTable'

  const search = ref('')
  const productID = ref()
  const prodcutName = ref('')
  const isBrokenProductHandlerSidebarActive = ref(false)
  const items = ref([])

  const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })

  interface Tag {
    name: string,
    id: number,
  }
  interface variant {
    name: string,
    id: number,
  }
  const numericRule =  (v:string) => [/^\d+$/.test(v) || 'Input must be a number']

  const brokenProduct = ref(structuredClone(blankBrokenProduct))


  const TableData=[
    {latestStockingDate: '0', latestStockingTime: '1', latestStockingCost: '2', latestMinStockingCost: '3', latestPrice: '4', stocks: '5', defected: '6', stockingDate: '7', stockingTime: '8', stockingCost: '9', minStockingCost: '10', price: '11', stockingVolumn: '12', supplier:'13', avgStockingPrice:'14'},
  ]


  const headers=[
    [{title: '最新入貨日期', key: 'latestStockingDate', },
    {title: '最新入貨時間', key: 'latestStockingTime', },
    {title: '最新入貨價錢', key: 'latestStockingCost', },
    {title: '最新最低價錢', key: 'latestMinStockingCost', },
    {title: '最新售價', key: 'latestPrice', },
    {title: '存貨', key: 'stocks', },
    {title: '壞貨', key: 'defected', },
  ],[
    {title: '倉庫名稱', key: 'warehouseName', },
    {title: '產品數量', key: 'numProduct', },
    {title: '聯繫電話', key: 'contactPhoneNum', },
    {title: '倉庫地址', key: 'warehouseLocation', },
  ],[    
    {title: '入貨日期', key: 'stockingDate'},
    {title: '入貨時間', key: 'stockingTime'},
    {title: '入貨價錢', key: 'stockingCost'},
    {title: '最低價錢', key: 'minStockingCost'},
    {title: '售價', key: 'price'},
    {title: '入貨數', key: 'stockingVolumn'},
    {title: '供應商名稱', key: 'supplier'},
  ],[
    {title: '入貨價平均價', key: 'avgStockingPrice'},
  ]
]

  const TagItems = [
    'Red',
    'Hello Kitty',
  ]
  const variantItems = [
    'Red',
    'Hello Kitty',
  ]

  const route = useRoute()

  const Tags = ref<Tag[]>([])
  const variants = ref<variant[]>([])
  Tags.value[0]={name: '', id: 1}
  variants.value[0]={name: '', id: 1}

  // productListStore.fetchProduct(Number(route.params.id)).then(response => )

//  const addTag = ()
</script>

<template>
  <div>
  <VRow style="height: 740px">
    <VCol cols="4" class="pa-0 d-flex flex-column" >
      <VCard
      flat
      class="d-flex flex-wrap flex-grow-1"
      >
        <VCol class="align-self-start">

          <VCardText
          class="font-weight-bold text-primary pl-2"
          >
            產品編輯
          </VCardText>
          <VTextField
            v-model="productID"
            label="產品編號"
            class="pa-2"
            :rules="numericRule(productID)"
            >

          </VTextField>
          <VTextField
            v-model="prodcutName"
            label="產品名稱"
            class="pa-2"
            >

          </VTextField>
          <AppDateTimePicker
            v-model="search"
            placeholder="建立日期"
            prepend-inner-icon="tabler-calendar"
            class="pa-2"
            :config="{ dateFormat: 'Y.m.d' }"
            />

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
              class="icon-trash"
              >

              </AppSelect>
            </VCol>
            <VRow class="pt-5 pa-2">
            <VCol cols="6">
              <VCardText
                class="font-weight-bold text-primary pa-1"
                >
                樣色
              </VCardText>
            </VCol>
            <VCol cols="6">
              <VBtn

              prepend-icon="tabler-circle-plus"
              density="compact"
              class="d-flex ml-auto text-normal"
              @click="variants.push({id: variants.length+1, name: ''})">
                添加樣色
              </VBtn>
            </VCol>
          </VRow>
            <VCol v-for= "variant in variants"
              :key="variant.id"
              class="pa-2">
              <AppSelect
              append-icon="tabler-trash"
              placeholder="選擇樣色"
              :items="variantItems"
              @click:append="variants.splice(variants.indexOf(variant), 1)"
              class="icon-trash"
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

            class="pa-2 "
            >
            沒有備註
            </AppTextField>
          </VCol>
        <VCol cols="12" class="align-self-end">
          <VBtn block class="">
              儲存
          </VBtn>
        </VCol>
      </VCard>
    </VCol>

    <VCol cols="8" class="d-flex flex-wrap flex-fill pb-2 px-0">
      <VCard
      flat
      class="my-2 pa-3 mb-0 pb-0 d-flex flex-column flex-fill"
      variant="flat">
        <VRow class=" flex-grow-0 gap-4 mb-3 ">
          <VBtn 
          prepend-icon="tabler-circle-plus">
            添加入貨訊息
          </VBtn>
          <VBtn
          variant="outlined" 
          prepend-icon="tabler-circle-minus"
          @click="isBrokenProductHandlerSidebarActive= true">
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
        <VCol cols="12" class="d-flex flex-fill pa-0 flex-column justify-space-between no-gutter" >
          <v-data-table
          
          no-data-text=""
          :headers="headers[0]"
          class="">
            <template #bottom>
              
            </template>
          </v-data-table>
          <v-data-table
          v-if="items.length!==0"
          no-data-text=""
          :headers="headers[1]"
          class="">
            <template #bottom>
              
            </template>
          </v-data-table>
          <v-data-table
          no-data-text=""
          :headers="headers[2]"
          class="">
            <template #bottom>
              
            </template>
          </v-data-table>
        </VCol>
        <VCol cols="12" class="d-flex flex-fill pa-0">
          <v-data-table
          no-data-text=""
          :headers="headers[3]"
          class="d-flex flex-column justify-space-between"
          >
            
            <template #bottom>
              <VCardText class="pt-2 pb-2 flex-grow-0">
                <VRow>
                  <VCol
                    class="d-flex justify-center"
                  >
                    <VPagination
                      variant="plain"
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
  <AddBrokenProductHandler
    v-model:isDrawerOpen="isBrokenProductHandlerSidebarActive"
    :brokenProduct="brokenProduct"
    
  />

  </div>
</template>

<style lang="scss">
.vdatatable-thread{
  color: 'primary'
}

.icon-trash{
    .v-input__append {
    color: red
  }
}





// .v-table{
//   .v-table__wrapper{
//     margin-bottom: 175px;
//   }
// }

.v-table{
  .v-table__wrapper{
    .v-data-table__th{
      white-space: nowrap;
    }
  }
}

#table .v-data-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}


#content{
border:0px ;
height: 100%;
}
</style>