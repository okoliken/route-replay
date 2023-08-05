<script setup lang="ts">
import { ref, watch } from "vue";
import { useFilters } from "../../composables/filters";
import { watchDebounced } from '@vueuse/core'
const { date } = useFilters();

const  { handleSearch, searchQuery, searching } =  useFilters()


watchDebounced(
  date,
  async () => { 
   if (date.value) {
    await handleSearch(searchQuery.value)
   }
   },
  { debounce: 700, maxWait: 5000 },
)

</script>

<template>
  <div
    class="bg-white bx-shw py-[7px] px-[16px] rounded-[8px] border border-shuttlersGrey"
  >
    <VueDatePicker
      :dark="false"
      class="placeholder:text-[16px] placeholder:font-light"
      placeholder="Set date range"
      v-model="date"
      multi-dates
      :enable-time-picker="false"
    ></VueDatePicker>

    <i
      class="ri-calendar-2-line absolute z-[99999] top-4 text-[20px] transform -translate-y-1 right-5 text-textDarkGrey"
    ></i>
    <!-- <span  class="loader absolute transform translate-y-[4px] right-14"></span> -->
  </div>
</template>

<style scoped>
.bx-shw {
  box-shadow: 0px 10px 24px 0px rgba(33, 35, 37, 0.08);
  position: relative;
  z-index: 99999;
}

.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #667085;
  --dp-hover-color: none;
  --dp-hover-text-color: #ffffff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #20e682;
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #fff;
  --dp-menu-border-color: none;
  --dp-border-color-hover: none;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #20e682;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #667085;
  --dp-danger-color: #e53935;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);
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
