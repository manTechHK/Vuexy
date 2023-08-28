<script setup lang="ts">  

import brokenProductDetailDrawer from '@/views/apps/products/brokenProductDetailDrawer.vue'
import restockDrawer from '@/views/apps/products/restockDrawer.vue'
import stockReallocateDrawer from '@/views/apps/products/stockReallocateDrawer.vue'
import AddBrokenProductHandler from '@/views/apps/products/storage/addBrokenProductHandler.vue'
import { BrokenProductInfo, NewBrokenProduct, newProductForm, ProductProperties, storehouseInfo } from '@/views/apps/products/storage/type'
import { useProductListStore } from '@/views/apps/products/storage/useProductListStore'
import { restockForm } from '@/views/apps/products/types'
import { blankProductForm } from '@/views/apps/products/useBlankProductForm'
import { blankProductProperties } from '@/views/apps/products/useBlankProductProperties'
import { useBrokenProductStore } from '@/views/apps/products/useBrokenProductStore'
import { useLabelStore } from '@/views/apps/products/useLabelStore'
import axios from '@axios'
import { VDataTable } from 'vuetify/labs/VDataTable'

  const productListStore = useProductListStore()
  const brokenProductStore = useBrokenProductStore()
  const labelStore = useLabelStore()
  const search = ref('')


  const isRestockDrawerActive = ref(false)
  const isBrokenProductHandlerSidebarActive = ref(false)
  const isBrokenProductDetailDrawerActive = ref(false)
  const isStockReallocateDrawerActive = ref(false)
  const stockReallocate_storehouse = ref<storehouseInfo>({
    storehouse_id: '',
    storehouse_name: '',
    quantity: 0,
    phone_no: '',
    storehouse_address: '',
  })

  const items = ref([])
  const productForm = ref<newProductForm>(blankProductForm)
  const productData = ref<ProductProperties>(blankProductProperties)
  const restockTable = ref()
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
    strapi_id: 0,
    product_id: '',
    name: '',
    quantity: 1,
    storehouse_id: NaN,
    date: '',
    remarks: '',
  })

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
    {title: '產品數量', key: 'quantity',  },
    {title: '聯繫電話', key: 'phone_num',  },
    {title: '倉庫地址', key: 'storehouse_address',  },
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



  const route = useRoute()

  const labels = ref<label[]>([{name: '', id: -1}])
  const variants = ref<variant[]>([{name: '', id: -1}])
  const remarks = ref<remark[]>([{content: '', id: -1}])


  const labelOptionStore = ref<label[]>([])
  const selectedLabels = ref<(label | null)[]>([])
  const labelOptions = ref<label[]>([])

  remarks.value[0] = {content : '', id:1}

  
  const setFieldDefaultValue = async() => {
    if(route.params.id){
      await productListStore.fetchProduct(Number(route.params.id)).then(response => {
        Object.assign(productData.value, response.data.data.attributes)
        console.log(productData.value)
        brokenProduct.value.strapi_id = response.data.data.id
        brokenProduct.value.product_id = response.data.data.attributes.product_id
        brokenProduct.value.name = response.data.data.attributes.name
      })
      restockTable.value = productData.value.restocks?.data.map(obj => ({
        id: obj.id,
        attributes: {
          restock_date: obj.attributes.restock_date?.substring(0, 10),
          restock_time: obj.attributes.restock_date?.substring(11, 19),
          restock_price: obj.attributes.restock_price,
          lowest_price: obj.attributes.lowest_price,
          selling_price: obj.attributes.selling_price,
          quantity: obj.attributes.quantity,
          supplier_name: obj.attributes.supplier.data.attributes.name
        }
      }))
      selectedLabels.value = productData.value.labels.data.map(label => ({name: label.attributes.name, id: label.id}))
    }

  }

  const openStockReallocateDrawer = (storehouse: storehouseInfo) => {
    stockReallocate_storehouse.value = storehouse
    isStockReallocateDrawerActive.value = true
  }

  // const updateLabelOptions = () => {
  //   // productForm.value.labels = []
  //   // selectedLabels.value.forEach(obj => {
  //   //     if(obj!== null){
  //   //         productForm.value.labels.push(obj.id)
  //   //     }
  //   // })
  //   labelOptions.value = labelOptionStore.value.filter(obj => !labels.value.some(label => obj.id === label.id))

  // }

  const updateProductForm = () => {
    if(productData.value){
      productForm.value.product_id = productData.value.product_id
      productForm.value.name = productData.value.name
      productForm.value.create_date = productData.value.create_date
      productForm.value.labels = productData.value.labels.data.map(label => label.id)
      productForm.value.variation = productData.value.variation.data.map(variation => variation.id)
      productForm.value.remarks = productData.value.remarks.map(remark => remark.content)
    }
    console.log('updated form')
  }
  const fetchLabelOptions = async () =>{
    await labelStore.fetchLabels().then(response => {
      labelOptionStore.value = response.data.data.map((obj:{id: number, attributes:{name: string, isShow: boolean}})=> ({name: obj.attributes.name, id: obj.id}))
    })
  }
  const postBrokenProduct = async (data: NewBrokenProduct) => {
    await brokenProductStore.addBrokenProduct(data).then(response =>{
      console.log(response)
    }).catch(
      err => console.log(err)
    )
  }
  const deleteBrokenProduct = async (strapi_id: number) => {
    await brokenProductStore.deleteBrokenProduct(strapi_id).then(
      response=> console.log(response)
    ).catch(
      err => console.log(err)
    )
  }
  const postRestock = async (restockInfo: restockForm) => {
    console.log(restockInfo)
    await axios.post('/restocks/', {
      restock_date: restockInfo.restock_date, 
      quantity: restockInfo.quantity, 
      restock_price: restockInfo.restock_price, 
      lowest_price: restockInfo.lowest_price, 
      selling_price: restockInfo.selling_price, 
      restock_distribute: restockInfo.restock_distribute, 
      product: restockInfo.product, 
      supplier: restockInfo.supplier
    }).then(response =>{
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  }

  const updateFormLabels = () => {
    // productForm.value.labels = []
    // selectedLabels.value.forEach(obj => {
    //     if(obj!== null){
    //         productForm.value.labels.push(obj.id)
    //     }
    // })
    productForm.value.labels = (selectedLabels.value.filter(obj => (obj!==null))).map(obj => obj!.id)
    console.log(selectedLabels.value)
    console.log(productForm.value.labels)
  }

  
  watchEffect(setFieldDefaultValue)
  watchEffect(fetchLabelOptions)
  watch(()=>selectedLabels.value, updateFormLabels, {deep: true})
  watchEffect(updateProductForm)
//  watch(()=>labels.value, updateLabelOptions, {immediate: true})

//  const addlabel = ()
</script>

<template>
  <div>
  <VRow style="height: 68vh">
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
            v-model="productForm.product_id"
            label="產品編號"
            class="pa-2"
            >

          </VTextField>
          <VTextField
            v-model="productForm.name"
            label="產品名稱"
            class="pa-2"
            >

          </VTextField>
          <AppDateTimePicker
            v-model="productForm.create_date"
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
              @click="selectedLabels.push(null)">
                添加標簽
              </VBtn>
            </VCol>
          </VRow>
            <VCol v-for= "(label, index) in selectedLabels"
              class="pa-2">
              <AppSelect
              hide-selected
              v-model="selectedLabels[index]"
              append-icon="tabler-trash"
              placeholder="選擇標簽"
              :items="labelOptionStore.filter(label => !(selectedLabels.some(selectedLabel => {
                if(selectedLabel !== null){
                    return selectedLabel.id === label.id
                }else return false
              })))"
              item-title="name"
              @click:append="selectedLabels.splice(index, 1)"
              class="icon-trash"
              return-object
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
            <VCol v-for= "variant in productForm.variation"
              class="pa-2">
              <AppSelect
              append-icon="tabler-trash"
              placeholder="選擇樣色"
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
        <VCol cols="12" class="d-flex flex-fill pa-0 flex-column justify-space-between no-gutter" style="height: 60vh">
          <v-data-table
          dense
          no-data-text=""
          :headers="headers[0]"
          class="">
            <template #body>
              <tr>
                <!-- <td v-for="header in headers[0]" >
                  {{ productData[header.key as keyof typeof productData] }}
                </td> -->
                <td>
                  {{ productData.new_restock_date?.substring(0,10) }}
                </td>
                <td>
                  {{ productData.new_restock_date?.substring(11,19) }}
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
          dense
          v-if="productData.storehouse_info.length!==0"
          no-data-text=""
          :headers="headers[1]"
          :items="productData.storehouse_info"
          class="">
            <template #item="{ item, index }">
              <tr >
                <td v-for="header in headers[1]" style="height: 45px;">
                  <div v-if="header.key!=='storehouse_address'">
                    {{ item.raw[header.key as keyof typeof item] }}

                  </div>
                  <div v-else class="d-flex align-center justify-space-between pr-0">
                    <div>
                      {{ item.raw[header.key as keyof typeof item] }}
                    </div>
                    <text
                    @click="openStockReallocateDrawer(item.raw)">
                      編輯
                    </text>
                  </div>
                </td>
              </tr>
            </template>
            <template #bottom>
              
            </template>
          </v-data-table>
          <v-data-table
          dense
          no-data-text=""
          :headers="headers[2]"
          class="">
            <template #body>
              <tr v-for="item in restockTable">
                <td v-for="header in headers[2]" style="height: 3rem">
                  {{ item.attributes[header.key as keyof typeof item.attributes] }}
                </td>
              </tr>
            </template>
            <template #bottom>
              
            </template>
          </v-data-table>
        </VCol>
        <VCol cols="12" class="d-flex flex-fill pa-0">
          <v-data-table
          dense
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
                    <!-- incomplete -->
                    <VPagination
                      variant="plain"
                      rounded="circle"
                      v-model="options.page"
                      total-visible="5"
                      :length="Math.ceil(restockTable?.length / options.itemsPerPage)"
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
  <stockReallocateDrawer
    v-model:is-drawer-open="isStockReallocateDrawerActive"
    :storehouse="stockReallocate_storehouse"
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