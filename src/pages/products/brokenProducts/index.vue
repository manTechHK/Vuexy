<script setup lang="ts">  


// import { useBrokenProductStore } from '@/views/apps/product/storage/';
import { apiBrokenProductEntriesResponse, brokenProductInfo, Options } from '@/views/apps/products/brokenProducts/type';
import axios from '@axios';
import { VDataTable } from 'vuetify/labs/VDataTable';


const currentOptions = ref<Options>({
  filter: {
    period: '',
    date: '',
    search: ''
  },
  itemPerPage: 10,
})

  const productID = ref()
  const prodcutName = ref('')
  const isBrokenProductHandlerSidebarActive = ref(false)
  const brokenProducts = ref<brokenProductInfo[]>([])
  const singleSelect = ref(false)
  const selected = ref([])

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

const showStuff = () => {
  console.log(brokenProducts.value)
}


const brokenProductTableEntries = async ()  => {
  var response  = <apiBrokenProductEntriesResponse> await axios.get('broken-products')
  // console.log(response.data.data)
  for(let i = 0; i < response.data.data.length; i++){
    brokenProducts.value[i] = response.data.data[i].attributes
  }
   console.log(response.data.data)
}

watchEffect(brokenProductTableEntries)

//  const addTag = ()
</script>

<template>
  <div style="height: 740px" class="d-flex flex-wrap flex-column">
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
        :config="{ dateFormat: 'Y.m.d' }"
        v-model="currentOptions.filter.date"
      />
      <AppTextField
        v-model="currentOptions.filter.search"
      >
        
      </AppTextField>
      <VBtn 
      prepend-icon="tabler-circle-plus"
      @click="">
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
        show-select
        :headers="headers"
        :items="brokenProducts"
        class="d-flex flex-column justify-space-between"

        >
        <template v-slot:body>
          <tr v-for="item in brokenProducts" :key="item.product_id">
            <td>
              <VCheckboxBtn/>
            </td>
            <td>
              {{ item.product_id }}
            </td>
            <td>
              {{ item.product_name }}
            </td>
            <td>
              {{ item.quantity }}
            </td>
            <td>
              {{ item.storehouse_name }}
            </td>
            <td>
              {{ item.date }}
            </td>
            <td>
              {{ item.remarks }}
            </td>

            <td class="d-inline-flex align-center px-0 ml-auto">
              <text @click="" class="mr-2 text-secondary">詳情</text>
              <text @click="" style="color: red;">刪除</text>
            </td>
          </tr>
        </template>


          <template #bottom>
            <VCardText class="pt-2 pb-2 flex-grow-0">
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
    </VRow>
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