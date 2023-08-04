<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import  {clickOutSide} from '../../composables/useClick'



const dropDown = ref(null)
const text = ref('All vehicle trips')
const stampIsOpen = ref(false)
const timeJourney = reactive([
  {
    text: 'Trip on IYJ95',
    date: '12th March, 2023',
    timeStamp: '02:01:00'
  },
  {
    text: 'Trip on IYJ95',
    date: '12th March, 2023',
    timeStamp: '02:01:00'
  },
  {
    text: 'Trip on IYJ95',
    date: '12th March, 2023',
    timeStamp: '02:01:00'
  },
  {
    text: 'Trip on IYJ95',
    date: '12th March, 2023',
    timeStamp: '02:01:00'
  },
  {
    text: 'Trip on IYJ95',
    date: '12th March, 2023',
    timeStamp: '02:01:00'
  },
  {
    text: 'Trip on IYJ95',
    date: '12th March, 2023',
    timeStamp: '02:01:00'
  }
])

const { useClick }  = clickOutSide()

// useClick(dropDown, toRefs(stampIsOpen.value) )
</script>

<template>
  <div>
    <div
      @click="stampIsOpen = !stampIsOpen"
      class="trip-timestamp relative flex items-center justify-between py-[5px] px-[12px] cursor-pointer w-[310px]"
    >
      <p class="text-textDarkGrey text-[16px]">{{ text }}</p>
      <i
        :class="[stampIsOpen === true ? 'transform rotate-180' : null]"
        class="ri-arrow-down-s-line text-[20px] text-textDarkGrey transition-transform duration-150 ease-in-out"
      ></i>
    </div>
    <div
     ref="dropDown"
      v-if="stampIsOpen"
      class="time-stamp-log pt-[18px] pb-[10px] px-[16px] mt-3 animate__animated animate__fadeIn relative z-[99999]"
    >
      <div class="mb-4 border-b border-[#F2F2F2] pb-1" v-for="(stamps, index) in timeJourney" :key="index">
        <div class="flex items-center justify-between pb-1">
          <div class="flex flex-col">
            <p class="text-textDark text-[14px] font-medium">{{ stamps.text }}</p>
            <p class="text-[#6E717C] text-[12px] font-light">{{ stamps.date }}</p>
          </div>
          <span
            class="text-[10px] text-shuttlersPurple bg-[#F0F0FF] py-[4px] px-[8px] rounded-[4px] font-bold"
            >{{ stamps.timeStamp }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.trip-timestamp {
  border-radius: 12px;
  border: 1px solid #e0e6ed;
  background: #fafafa;
  box-shadow: 0px 10px 24px 0px rgba(33, 35, 37, 0.08);
}

.time-stamp-log {
  border-radius: 12px;
  border: 1px solid #e0e6ed;
  background: #fafafa;
}

.grayscale-element {
  /* Apply grayscale filter */
  filter: grayscale();
}
</style>
<!-- rgba(211, 220, 230, 1) -->