<script setup lang="ts">
import { ref, reactive } from 'vue'

import GreenVue from '../stamp-icons/green.vue'
const text = ref('Trip timestamp')
const stampIsOpen = ref(false)

const timeJourney = reactive([
  {
    text: 'Trip start',
    active: true,
    timeStamp: '2:00'
  },
  {
    text: 'Egebeda stop',
    active: false,
    timeStamp: '2:00'
  },
  {
    text: 'Iyana Ipaja stop',
    active: false,
    timeStamp: '2:00'
  },
  {
    text: 'Bonny Camp stop',
    active: false,
    timeStamp: '2:00'
  },
  {
    text: 'Lekki Phase 1 stop',
    active: false,
    timeStamp: '2:00'
  },
  {
    text: 'Jasper Ike street',
    active: false,
    timeStamp: '2:00'
  }
])
</script>

<template>
  <div> 
    <div
      @click="stampIsOpen = !stampIsOpen"
      class="trip-timestamp flex items-center relative justify-between py-[4px] px-[12px] cursor-pointer z-50"
    >
      <p class="text-textDarkGrey text-[16px]">{{ text }}</p>
      <i
        :class="[stampIsOpen === true ? 'transform rotate-180' : null]"
        class="ri-arrow-down-s-line text-[20px] text-textDarkGrey transition-transform duration-150 ease-in-out"
      ></i>
    </div>
    <div
      v-if="stampIsOpen"
      class="time-stamp-log py-[20px] px-[16px] mt-3 animate__animated animate__fadeIn relative z-[99999]"
    >
      <div v-for="(stamps, index) in timeJourney" :key="index">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-x-2">
            <GreenVue :class="{ 'grayscale-element': !stamps.active }" />
            <p class="text-textDark text-[14px]">{{ stamps.text }}</p>
          </div>
          <span
            class="text-[10px] text-shuttlersPurple bg-[#F0F0FF] py-[4px] px-[8px] rounded-[4px] font-bold"
            >{{ stamps.timeStamp }}</span
          >
        </div>

        <div class="transform translate-x-[9px]">
          <div class="w-[2px] h-[5px] mb-1 rounded-[8px] bg-[#D3DCE6] p-px"></div>
          <div class="w-[2px] h-[8px] mb-1 rounded-[8px] bg-[#D3DCE6] p-px"></div>
          <div class="w-[2px] h-[5px] mb-1 rounded-[8px] bg-[#D3DCE6] p-px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.trip-timestamp {
  border-radius: 12px;
  border: 1px solid #e0e6ed;
  background: #fafafa;
  box-shadow: 0px 10px 24px 0px rgba(33, 35, 37, 0.08);
  z-index:9999;
}

.time-stamp-log {
  border-radius: 12px;
  border: 1px solid #e0e6ed;
  background: #fafafa;
  z-index:999999;
}

.grayscale-element svg {
  /* Apply grayscale filter */
  background: #d3dce6 !important;
}
</style>
<!-- rgba(211, 220, 230, 1) -->
