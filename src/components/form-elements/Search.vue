
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useFilters } from '../../composables/filters'
import { watchDebounced } from '@vueuse/core'


const { handleSearch, searchQuery } = useFilters()


const searching = ref(false)
watchDebounced(
  searchQuery,
  async () => {
    if (searchQuery.value) {
      searching.value = true
      await handleSearch(searchQuery.value)
      searching.value = false
    }
  },
  { debounce: 700, maxWait: 5000 },
)


onMounted(async () => {
  // await handleSearch('Ikeja')
})
</script>



<template>
  <div class="w-full bx-shw bg-white py-[14px] px-[16px] rounded-[8px] relative z-50 border border-shuttlersGrey">
    <input v-model="searchQuery" placeholder="Search by vehicle number"
      class="w-full appearance-none outline-none rounded-[8px] px-2 placeholder:text-[16px] placeholder:font-light"
      type="text" />
    <i class="ri-search-line absolute transform -translate-y-1 right-5 text-[20px] text-textDarkGrey"></i>
    <span v-if="searching" class="loader absolute transform translate-y-[4px] right-14"></span>
  </div>
</template>


<style scoped>
.bx-shw {
  box-shadow: 0px 10px 24px 0px rgba(33, 35, 37, 0.08);
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