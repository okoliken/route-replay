<script setup lang="ts">
import Red from '../stamp-icons/red.vue'
// @ts-ignore
import Green from '../stamp-icons/green.vue'
interface Props {
  text: string
  stampType: string
}
const { text, stampType } = defineProps<Props>()
</script>

<template>
  <div
    class="bg-[#FAFAFA] rounded-[12px] py-[7px] px-[12px] bx-shw location-stamp relative z-50 flex items-center justify-between"
  >
    <Green v-if="stampType == 'green'" />
    <Red v-if="stampType == 'red'" />
    <p class="text-textDarkGrey text-[16px]">{{ text }}</p>
    <i class="ri-eye-fill text-textDarkGrey text-[15px]"></i>
  </div>
</template>

<style scoped>
.bx-shw {
  box-shadow: 0px 10px 24px 0px rgba(33, 35, 37, 0.08);
}

.location-stamp {
  border-radius: 12px;
  border: 1px solid #e0e6ed;
  background: #fafafa;
}
</style>
