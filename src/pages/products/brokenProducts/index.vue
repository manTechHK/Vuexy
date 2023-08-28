<script setup lang="ts">  



import brokenProductDetailDrawer from '@/views/apps/products/brokenProductDetailDrawer.vue';
import { apiBrokenProductEntriesResponse, brokenProductInfo, Options, searchItem } from '@/views/apps/products/brokenProducts/type';
import searchProductDrawer from '@/views/apps/products/searchProductDrawer.vue';
import axios from '@axios';
import { VDataTable } from 'vuetify/labs/VDataTable';
 
const currentOptions = ref<Options>({
  filter: {
    period: '',
    date: '',
    search: {
      product_id: '',
      product_name: ''
    }
  },
  itemsPerPage: 10,
  page: 1,
})

  const productID = ref()
  const prodcutName = ref('')
  const isBrokenProductHandlerSidebarActive = ref(false)
  const isSearchProductDrawerActive = ref(false)
  const brokenProducts = ref<brokenProductInfo[]>([])
  const singleSelect = ref(false)
  const selected = ref([])
  const brokenProductDetailDrawerStrapiIndex = ref<number>()
  const isBrokenProductDetailDrawerActive = ref(false)

  const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })

  interface Tag {
    name: string,
    id: number,
  }
  const numericRule =  (v:string) => [/^\d+$/.test(v) || 'Input must be a number']



  const TableData=[
    {latestStockingDate: '0', latestStockingTime: '1', latestStockingCost: '2', latestMinStockingCost: '3', latestPrice: '4', stocks: '5', defected: '6', stockingDate: '7', stockingTime: '8', stockingCost: '9', minStockingCost: '10', price: '11', stockingVolumn: '12', supplier:'13', avgStockingPrice:'14'},
  ]


  const headers=[
    {title: '產品編號', key: 'product_id', },
    {title: '產品名稱', key: 'product_name', },
    {title: '數量', key: 'quantity', },
    {title: '壞貨位置', key: 'storehouse_name', },
    {title: '日期', key: 'date', },
    {title: '備註', key: 'remarks', },
]

// const q=ref('')

// watch(q, store.fetchBrokenProductEntries(), { immediate: true })

const paginationMeta = computed(() => {
  return <T extends { page: number; itemsPerPage: number }>(options: T, total: number) => {
    const start = (options.page - 1) * options.itemsPerPage + 1
    const end = Math.min(options.page * options.itemsPerPage, total)

    return `${start} - ${end} of ${total}`
  }
})

const showStuff = () => {
  console.log(brokenProducts.value)
}

const openBrokenProductDetailDrawer = (strapi_id: number) => {
  brokenProductDetailDrawerStrapiIndex.value = strapi_id
  isBrokenProductDetailDrawerActive.value = true
}

const deleteBrokenProduct = (strapi_id: number)=>{

}

const brokenProductTableEntries = async ()  => {
  var response  = <apiBrokenProductEntriesResponse> await axios.get('broken-products')
  // console.log(response.data.data)

  for(let i = 0; i < response.data.data.length; i++){
    brokenProducts.value[i] = {strapi_id: response.data.data[i].id, ...response.data.data[i].attributes}
  }
}

const filterTableItems = (itemList : brokenProductInfo ):boolean  => {
  console.log(currentOptions.value.filter)
  return dateFilter(itemList.date) && searchFilter({product_id: itemList.product_id, product_name: itemList.product_name})
}

const dateFilter = (date : string):boolean =>{
  return currentOptions.value.filter.date? currentOptions.value.filter.date === date : true
} 

const searchFilter = (search : searchItem) => {
  return (currentOptions.value.filter.search.product_id? search.product_id.includes(currentOptions.value.filter.search.product_id):true) && (currentOptions.value.filter.search.product_name?  search.product_name.includes(currentOptions.value.filter.search.product_name ):true)
}

const updateSearchQuery = (query: searchItem) =>{
  console.log('update query')
  currentOptions.value.filter.search.product_id = query.product_id
  currentOptions.value.filter.search.product_name = query.product_name
}

onMounted(brokenProductTableEntries)

//  const addTag = ()
</script>

<template>
  <div style="" class="d-flex flex-wrap flex-column">
    <VRow  class="flex-grow-0">
      <h2 class="text-primary text-weight-medium">壞貨</h2>
    </VRow>

    <VRow  class="d-flex flex-wrap flex-grow-0 pa-0 gap-3">
      <div style="min-width: 200px;">
        <AppSelect
         class=""
         v-model="currentOptions.filter.period"
         >
  
        </AppSelect>
      </div>
      <AppDateTimePicker

        placeholder="時間"
        prepend-inner-icon="tabler-calendar"
        class="flex-fill"
        style="min-width: 200px;"
        :config="{ dateFormat: 'Y-m-d' }"
        v-model="currentOptions.filter.date"
      />
      <AppTextField
        v-model="currentOptions.filter.search.product_id"
        append-inner-icon="tabler-search"
      >
        
      </AppTextField>
      <VBtn 
      prepend-icon="tabler-circle-plus"
      @click="isSearchProductDrawerActive = true">
        搜索
      </VBtn>
      <VBtn
      variant="outlined" 
      prepend-icon="tabler-circle-minus"
      :to="{ name: 'products-brokenProducts-addNewBrokenProduct' }">
        添加壞貨
      </VBtn>
    </VRow>
    <VRow>
      <VCol cols="12" class="d-flex flex-fill pb-0 px-0">
        <v-data-table
        no-data-text=""
        show-select
        height="68vh"
        :headers="headers"
        v-model:items-per-page="currentOptions.itemsPerPage"
        v-model:page="currentOptions.page"
        :items="brokenProducts.filter(filterTableItems)"
        class="d-flex flex-column justify-space-between"

        >
        <template #item.remarks = "{item}">
          
            <td class="d-flex align-center justify-space-between">
              {{ item.raw.remarks }}
              
              <div>
                <text @click="openBrokenProductDetailDrawer(item.raw.strapi_id)" class="mr-2 text-secondary">詳情</text>
                <text @click="" style="color: red;">刪除</text>
              </div>
            </td>

        </template>


          <template #bottom>
            <VCardText class="pt-2 pb-2 ">
                    <VRow class="justify-space-between align-center">
                        <p class="text-sm text-disabled mb-0">
                            {{ paginationMeta(currentOptions, brokenProducts.length) }}
                        </p>
                            <VPagination
                            variant="text"
                            rounded="circle"
                            v-model="options.page"
                            :length="Math.ceil(brokenProducts.filter(filterTableItems).length / currentOptions.itemsPerPage)"
                            :total-visible="$vuetify.display.xs ? 1 : Math.ceil(brokenProducts.filter(filterTableItems).length / currentOptions.itemsPerPage)"
                            >

                            </VPagination>
                            <div class="d-flex flex-wrap align-center">
                                <p class="mb-0 pr-4">
                                    每頁數量
                                </p>
                                <AppSelect
                                    :model-value="currentOptions.itemsPerPage"
                                    :items="[
                                    { value: 10, title: '10' },
                                    { value: 25, title: '25' },
                                    { value: 50, title: '50' },
                                    { value: 100, title: '100' },
                                    { value: -1, title: 'All' },
                                    ]"
                                    style="width: 6.25rem;"
                                    @update:model-value="currentOptions.itemsPerPage = parseInt($event, 10)"
                                />
                            </div>
                    </VRow>
                </VCardText>
          </template>
        </v-data-table>
      </VCol>
    </VRow>
    <brokenProductDetailDrawer
    v-model:isDrawerOpen="isBrokenProductDetailDrawerActive"
    v-model:product_strapi_id="brokenProductDetailDrawerStrapiIndex"
    @delete-broken-product="deleteBrokenProduct"/>
    <searchProductDrawer
    v-model:is-drawer-open="isSearchProductDrawerActive"
    @search="updateSearchQuery"/>
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

.v-icon path{
  stroke-width: 2;
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

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>