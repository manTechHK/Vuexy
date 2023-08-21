<script setup lang="ts">  

import brokenProductDetailDrawer from '@/views/apps/products/brokenProductDetailDrawer.vue'
import restockDrawer from '@/views/apps/products/restockDrawer.vue'
import AddBrokenProductHandler from '@/views/apps/products/storage/addBrokenProductHandler.vue'
import { BrokenProductInfo, NewBrokenProduct, ProductProperties } from '@/views/apps/products/storage/type'
import { useProductListStore } from '@/views/apps/products/storage/useProductListStore'
import { restockForm } from '@/views/apps/products/types'
import axios from '@axios'
import { VDataTable } from 'vuetify/labs/VDataTable'

  const productListStore = useProductListStore()
  const search = ref('')
  const isRestockDrawerActive = ref(false)
  const isBrokenProductHandlerSidebarActive = ref(false)
  const isBrokenProductDetailDrawerActive = ref(false)
  const items = ref([])
  const productData = ref<ProductProperties>({
    product_id: '',
    name: '',
    create_date: '',
    labels: {data: [{attributes: {name:'', createdAt:'', isShow: true, publishedAt:'', updatedAt: ''}, id: -1}]},
    variation: {data: [{attributes: {name:'', createdAt:'', isShow: true, publishedAt:'', updatedAt: ''}, id: -1}]},
    remarks: [{content: '', id: -1}] ,
    new_restock_date: '',
    new_restock_price: NaN,
    new_lowest_price: NaN,
    new_selling_price: NaN,
    total_stock: NaN,
    total_broken_products: NaN,
    storehouse_info: [],
    restock: [],
    average_restock_price: NaN,
  })
  type productKey = keyof ProductProperties

  interface remark {
    content: string,
    id: number,
}

  const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })

  interface label {
    id: number,
    name: string,
  }
  interface variant {
    name: string,
    id: number,
  }



  const numericRule =  (v:string) => [/^\d+$/.test(v) || 'Input must be a number']

  const brokenProduct = ref<BrokenProductInfo>({
    strapi_id: NaN,
    product_id: '',
    name: '',
    quantity: 1,
    storehouse_id: NaN,
    date: '',
    remarks: '',
  })


  const TableData=[
    {latestStockingDate: '0', latestStockingTime: '1', latestStockingPrice: '2', latestMinStockingPrice: '3', latest_selling_price: '4', stocks: '5', defected: '6', stockingDate: '7', stockingTime: '8', stockingPrice: '9', minStockingPrice: '10', price: '11', stockingVolumn: '12', supplier:'13', avgStockingPrice:'14'},
  ]


  const headers=[
    [
    {title: '最新入貨日期', key: 'new_restock_date', },
    {title: '最新入貨時間', key: 'new_restock_time', },
    {title: '最新入貨價錢', key: 'new_restock_price', },
    {title: '最新最低價錢', key: 'new_lowest_pice', },
    {title: '最新售價', key: 'new_selling_price', },
    {title: '存貨', key: 'total_stock', },
    {title: '壞貨', key: 'total_broken_products', },
  ],[
    {title: '倉庫名稱', key: 'storehouse_name', },
    {title: '產品數量', key: 'quantity', },
    {title: '聯繫電話', key: 'phone_num', },
    {title: '倉庫地址', key: 'storehouse_address', },
  ],[    
    {title: '入貨日期', key: 'restock_date'},
    {title: '入貨時間', key: 'restock_time'},
    {title: '入貨價錢', key: 'restock_price'},
    {title: '最低價錢', key: 'lowest_price'},
    {title: '售價', key: 'selling_price'},
    {title: '入貨數', key: 'quantity'},
    {title: '供應商名稱', key: 'supplier_name'},
  ],[
    {title: '入貨價平均價', key: 'average_restock_price'},
  ]
]

  const labelItems = [
    'Red',
    'Hello Kitty',
  ]
  const variantItems = [
    'Red',
    'Hello Kitty',
  ]

  const route = useRoute()

  const labels = ref<label[]>([{name: '', id: -1}])
  const variants = ref<variant[]>([{name: '', id: -1}])
  const remarks = ref<remark[]>([{content: '', id: -1}])


  remarks.value[0] = {content : '', id:1}

  
  const setFieldDefaultValue = async() => {
    await productListStore.fetchProduct(Number(route.params.id)).then(response => {
      productData.value = response.data.data.attributes
      brokenProduct.value.strapi_id = response.data.data.id
      brokenProduct.value.product_id = response.data.data.attributes.product_id
      brokenProduct.value.name = response.data.data.attributes.name

      console.log(productData.value)
    })
    labels.value = productData.value.labels? productData.value.labels.data.map(label => ({name: label.attributes.name, id: label.id})):
    variants.value = productData.value.variation.data.map(variant => ({name: variant.attributes.name, id: variant.id}))
    remarks.value = productData.value.remarks.length>0?productData.value.remarks:remarks.value

  }

  const postBrokenProduct = (data: NewBrokenProduct) => {
    console.log({product_id: data.product_id, quantity: data.quantity, storehouse_id: data.storehouse_id, date: data.date, remarks: data.remarks})
    const response = axios.post('/broken-products', {product_id: data.product_id, quantity: data.quantity, storehouse_id: data.storehouse_id, date: data.date, remarks: data.remarks})
    console.log(response)
  }

  const deleteBrokenProduct = async (strapi_id: number) => {
    await axios.delete(`/broken-products/${strapi_id}`).then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  }

  const postRestock = async (restockInfo: restockForm) => {
    console.log(restockInfo)
    await axios.post('/restocks/', {stock_date: restockInfo.restock_date, quantity: restockInfo.quantity, restock_price: restockInfo.restock_price, lowest_price: restockInfo.lowest_price, selling_price: restockInfo.selling_price, restock_distribute: restockInfo.restock_distribute, product: restockInfo.product, supplier: restockInfo.supplier}).then(response =>{
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  }
  
  onMounted(setFieldDefaultValue)

//  const addlabel = ()
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
            v-model="productData.product_id"
            label="產品編號"
            class="pa-2"
            >

          </VTextField>
          <VTextField
            v-model="productData.name"
            label="產品名稱"
            class="pa-2"
            >

          </VTextField>
          <AppDateTimePicker
            v-model="productData.create_date"
            label="建立日期"
            prepend-inner-icon="tabler-calendar"
            readonly
            class="pa-2"
            disabled
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
              @click="labels.push({id: labels.length+1, name: ''})">
                添加標簽
              </VBtn>
            </VCol>
          </VRow>
            <VCol v-for= "label in labels"
              :key="label.id"
              class="pa-2">
              <AppSelect
              v-model="label.name"
              append-icon="tabler-trash"
              placeholder="選擇標簽"
              :items="labelItems"
              @click:append="labels.splice(labels.indexOf(label), 1)"
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
            <div v-for="remark in productData.remarks">
              <AppTextField
              class="pa-2 "
              >
              {{ remark.content }}
              </AppTextField>
            </div>
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
          prepend-icon="tabler-circle-plus"
          @click="isRestockDrawerActive=true">
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
            <template #body>
              <tr>
                <!-- <td v-for="header in headers[0]" >
                  {{ productData[header.key as keyof typeof productData] }}
                </td> -->
                <td>
                  {{ productData.new_restock_date }}
                </td>
                <td>
                  {{ productData.new_restock_date }}
                </td>
                <td>
                  {{ productData.new_restock_price }}
                </td>
                <td>
                  {{ productData.new_lowest_price }}
                </td>
                <td>
                  {{ productData.new_selling_price }}
                </td>
                <td>
                  {{ productData.total_stock }}
                </td>
                <td class="d-flex align-center justify-space-between pr-0">
                  {{ productData.total_broken_products }}
                  <text class="text-secondary"
                  @click="isBrokenProductDetailDrawerActive=true">詳情</text>
                </td>
              </tr>
            </template>
            <template #bottom>
              
            </template>
          </v-data-table>
          <v-data-table
          v-if="productData.storehouse_info.length!==0"
          no-data-text=""
          :headers="headers[1]"
          class="">
            <template #body>
              <tr v-for="item in productData.storehouse_info">
                <td v-for="header in headers[1]" >
                  {{ item[header.key as keyof typeof item] }}
                </td>
              </tr>
            </template>
            <template #bottom>
              
            </template>
          </v-data-table>
          <v-data-table
          no-data-text=""
          :headers="headers[2]"
          class="">
            <template #body>
              <tr v-for="item in productData.restock">
                <td v-for="header in headers[2]" >
                  {{ item[header.key as keyof typeof item] }}
                </td>
              </tr>
            </template>
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
            <template #body>
              <tr>
                <td v-for="header in headers[3]" >
                  {{ productData[header.key as productKey] }}
                </td>
              </tr>
            </template>
            <template #bottom>
              <VCardText class="pt-2 pb-2 flex-grow-0">
                <VRow>
                  <VCol
                    class="d-flex justify-center">
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
    @add-broken-product="postBrokenProduct"
  />
  <brokenProductDetailDrawer
    v-model:isDrawerOpen="isBrokenProductDetailDrawerActive"
    :product_strapi_id="Number(route.params.id)"
    @delete-broken-product="deleteBrokenProduct"/>

  <restockDrawer
    v-model:is-drawer-open="isRestockDrawerActive"
    :product_strapi_id="Number(route.params.id)"
    @restock="postRestock"
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