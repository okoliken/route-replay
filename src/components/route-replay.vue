<script setup lang="ts">
import Play from './player-icons/play.vue'
import Prev from './player-icons/prev.vue'
import Next from './player-icons/next.vue'
import { handleTrip } from "../composables/trip";
const { selectVehicle, hasAVehicleBeenSelected, moveCar } = handleTrip();
</script>
<template>
  <div class="route-replay w-full max-w-4xl">
    <div class="flex items-center justify-between">
      <div>
        <h4 v-if="hasAVehicleBeenSelected" class="text-[#09090F] text-[16px]">Journey of LND-123DE</h4>
        <h4 v-else class="text-[#09090F] text-[16px]">No vehicle selected</h4>
        <div class="flex gap-x-1">
          <span class="block text-[#6E717C] text-[14px]">--</span>
          <span class="block text-[#6E717C] text-[14px]">--</span>
        </div>
      </div>

      <div class="flex items-center gap-x-5 transform translate-y-px">
        <div class="flex items-center gap-x-4">
          <Prev class="cursor-pointer" />
          <Play @click="moveCar" class="cursor-pointer" />
          <Next class="cursor-pointer" />
        </div>
        <p class="text-textDarkGrey">0:01/1:06:00</p>
      </div>

      <div class="flex items-center gap-x-3 transform translate-y-px">
        <div
          class="transition-all bg-[#E6FFF2] py-[6px] px-[12px] rounded-[8px] cursor-pointer hover:bg-[#0DAC5C] hover:bg-opacity-30">
          <span class="inline-block text-shuttlersGreen">1x</span>
        </div>
        <div
          class="transition-all bg-[#E6FFF2] py-[6px] px-[12px] rounded-[8px] cursor-pointer hover:bg-[#0DAC5C] hover:bg-opacity-30">
          <span class="inline-block text-shuttlersGreen">5x</span>
        </div>
        <div
          class="transition-all bg-[#E6FFF2] py-[6px] px-[12px] rounded-[8px] cursor-pointer hover:bg-[#0DAC5C] hover:bg-opacity-30">
          <span class="inline-block text-shuttlersGreen">10x</span>
        </div>
      </div>
    </div>
    <div :class="[hasAVehicleBeenSelected ? 'bg-[#E6FFF2]' : 'bg-gray-100']" class="w-full  rounded-full h-[8px] mt-4">
      <div :class="[hasAVehicleBeenSelected ? 'bg-[#0DAC5C]' : 'bg-[#B9BCC8]']"
        class=" h-[8px] rounded-full transition-all duration-150 ease-linear" style="width: 1%"></div>
    </div>
  </div>
</template>

<style scoped>
.route-replay {
  border-radius: 16px;
  border: 1px solid #eaecf0;
  background: #fff;
  padding: 23px 24px 25px 24px;

  box-shadow: 0px 10px 24px 0px rgba(33, 35, 37, 0.08);
}
</style>
