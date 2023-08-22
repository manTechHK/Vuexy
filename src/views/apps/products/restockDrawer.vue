<script setup lang="ts">
import { supplierInfo } from '@/views/apps/products/types';
import { useSuppliersStore } from '@/views/apps/products/useSuppliersStore';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { VForm } from 'vuetify/components/VForm';
import { storehouseInfo, useStorehouseStore } from './brokenProducts/useStorehouseStore';

interface Props {
    isDrawerOpen: boolean,
    product_strapi_id: number
}

interface Emit {
    (e: 'update:isDrawerOpen', value: boolean): void
    (e: 'restock', value: restockForm): void
}

const supplierStore = useSuppliersStore()
const storehouseStore = useStorehouseStore()

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const refForm = ref<VForm>()

const currencyPrefix = ref('HKD')
const isFormValid = ref(false)
const supplierOptions = ref<supplierInfo[]>()
const storehouseOptions = ref<{text: string, value: number}[]>([])
const restockForm_date = ref('')
const restockForm_time = ref('')

interface restockForm{
    restock_date: string | null,
    quantity: number | null,
    restock_price:number | null,
    lowest_price:number | null,
    selling_price:number | null,
    restock_distribute: {storehouse: number, quantity: number | null}[],
    product: number | null,
    supplier: number | null,
}

const restockForm = ref<restockForm>({
    restock_date: '',
    quantity: null,
    restock_price:null,
    lowest_price:null,
    selling_price: null,
    restock_distribute: [],
    product:  props.product_strapi_id,
    supplier: null,
})


const closeDrawer = () => {
    emit('update:isDrawerOpen', false)
    nextTick(() => {
        refForm.value?.resetValidation()
        refForm.value?.reset()
    })
}

const onSubmit = ():void =>{
    var empty_flag = false
    Object.keys(restockForm.value).forEach(element => {
        const temp = restockForm.value[element as keyof typeof restockForm.value]
        if(temp === null || restockForm_date.value === '' || restockForm_time.value ===''){
            empty_flag = true
        }
    })
    if(empty_flag){
        return
    }
    emit('restock', restockForm.value)

    emit('update:isDrawerOpen', false)
}

const integerFilter = (evt: KeyboardEvent) => {
    evt = (evt) ? evt : window.event as KeyboardEvent;

    let expect = (evt.target as HTMLInputElement).value.toString() + evt.key.toString();
    
    if (!/^[1-9]{1}[0-9]*$/.test(expect)) {
        evt.preventDefault();
    } else {
        return true;
    }
}

const floatFilter = (evt: KeyboardEvent) => {
    evt = (evt) ? evt : window.event as KeyboardEvent;

    let expect = (evt.target as HTMLInputElement).value.toString() + evt.key.toString();

    if (!/^[0-9]*\.?\d{0,2}$/.test(expect)) {
        evt.preventDefault();
    } else {
        return true;
    }
}

const computeStorehouse = (storehouse: {text: string, value : number}, index: number) => {
    if(restockForm.value.restock_distribute.length <= index){
        restockForm.value.restock_distribute.push({storehouse: storehouse.value,quantity: null})
    }
    return restockForm.value.restock_distribute[index].quantity
}

const setSupplierOptions = async() => {
    const apiSupplierData = await supplierStore.fetchSuppliers()

    supplierOptions.value = apiSupplierData.data.data.map((obj:{id:number, attributes: {name:string, supplier_id:string, phone_no: string, email:string, contact_person: string, create_date:string}}) => ({id: obj.attributes.supplier_id, name: obj.attributes.name, strapi_id: obj.id}))
}

const setStorehouseOptions = async () => {
    await storehouseStore.fetchStorehouses().then(response => {
        storehouseOptions.value = response.map((obj: { attributes: storehouseInfo; id: number; }) => ({
            text: obj.attributes.name,
            value: obj.id
        }))
    })
}

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}


watch(()=>[restockForm_time.value, restockForm_date.value], ()=>{restockForm.value.restock_date = restockForm_date.value + ' ' + restockForm_time.value},{immediate: true})

onMounted(setSupplierOptions)
onMounted(setStorehouseOptions)

</script>
<template>
    <VNavigationDrawer
    temporary
    location="end"
    width="420"
    border="0"
    class="scrollable-content d-flex flex-wrap pa-2"
    @update:model-value="dialogModelValueUpdate"
    scrim="rgb(0, 0, 0, 0)"
    :model-value="props.isDrawerOpen">
        
        
        <AppDrawerHeaderSection
        title="添加入貨訊息"
        @cancel="closeDrawer"/>
        <PerfectScrollbar :options="{ wheelPropagation: false }">
            <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
            class="d-flex flex-column gap-3 pa-3">
                <AppTextField prepend-inner-icon="tabler-calendar" placeholder="" type="date" label="入貨日期" v-model="restockForm_date"  />
                <AppTextField prepend-inner-icon="tabler-clock-hour-4" type="time" label="入貨時間" v-model="restockForm_time"/>
                <AppTextField dirty :prefix="currencyPrefix" placeholder="請輸入" label="入貨價錢" @keypress="floatFilter" v-model="restockForm.restock_price"/>
                <AppTextField dirty :prefix="currencyPrefix" placeholder="請輸入" label="最低價錢" @keypress="floatFilter" v-model="restockForm.lowest_price"/>
                <AppTextField dirty :prefix="currencyPrefix" placeholder="請輸入" label="售價"  @keypress="floatFilter" v-model="restockForm.selling_price"/>
                <AppTextField placeholder="請輸入" label="入貨數量" @keypress="integerFilter" v-model="restockForm.quantity"/>
                <AppAutocomplete 
                placeholder="請輸入" 
                label="供應商編號" 
                :items="supplierOptions"
                item-title="id"
                item-value="strapi_id"
                v-model="restockForm.supplier"/>
                <AppAutocomplete 
                placeholder="請輸入" 
                label="供應商名稱" 
                :items="supplierOptions"
                item-title="name"
                item-value="strapi_id"
                v-model="restockForm.supplier"/>

                <VCardTitle class="pl-0"> 入貨數量分配 </VCardTitle>
                <div v-for="(storehouse, index) of storehouseOptions">
                    <AppTextField 
                    prepend-inner-icon="tabler-building-bank" 
                    placeholder="請輸入" 
                    :label="storehouse.text+'數量'" 
                    @keypress="integerFilter"
                    :model-value="computeStorehouse(storehouse, index)"
                    @update:model-value="newValue => restockForm.restock_distribute[index].quantity = newValue? Number(newValue):null"/>
                </div>

                <VBtn type="submit">
                    添加
                </VBtn>
            </VForm>
        </PerfectScrollbar>
    </VNavigationDrawer>
</template>

<style lang="scss">
.app-text-field{
    .v-text-field{
        .v-field__prepend-inner{
            .v-icon path {
                color: 'primary';
                stroke-width: 2;
            }
        }
    }
}

// .theme--warm .v-text-field[type="date"]::-webkit-calendar-picker-indicator{
//     webkit
// }

</style>