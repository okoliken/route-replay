<script  setup lang="ts">
import  { ref, computed } from 'vue'
import {useFilters} from '../../composables/filters'
import { watchDebounced } from '@vueuse/core'

const  { handleSearch, searchRoute, vehicle_names } =  useFilters()
const filterByRoute = ref(false)

const names = computed(() => {
   return vehicle_names.value.map((items:any) => (
     items?.name
   ))
})

const vehicleId = computed<{[x:string]: any}>(() => {
  return vehicle_names.value.filter((items:any) => (
    items?.name === searchRoute.value
  ))
})

watchDebounced(
  searchRoute,
  async () => { 
    filterByRoute.value = true
   if (searchRoute.value) {
   
    await handleSearch(vehicleId.value[0]?.vehicle_id)
    filterByRoute.value = false
   }
   },
  { debounce: 700, maxWait: 5000 },
)
</script>

<template>
  <div
    class="bg-white bx-shw py-[10px] px-[16px] rounded-[8px] border border-shuttlersGrey relative"
  >
    <!-- <input class="placeholder:text-[16px] placeholder:font-light" placeholder="Select route" type="text"> -->
    <v-select
      v-model="searchRoute"
      class="placeholder:text-[16px] placeholder:font-light"
      placeholder="Select route"
      :options="names"
    ></v-select>
    <i
      class="ri-map-pin-2-fill absolute top-4 text-[20px] transform -translate-y-1 right-5 text-textDarkGrey"
    ></i>
    <span v-if="filterByRoute" class="loader absolute transform top-4  right-20"></span>
  </div>
</template>

<style scoped>
.bx-shw {
  box-shadow: 0px 10px 24px 0px rgba(33, 35, 37, 0.08);
  z-index:9999;
}

.loader {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #333;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}


@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>
