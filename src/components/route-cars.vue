<script lang="ts" setup>
interface Props {
  trips: { [x: string]: any }
}

const { trips } = defineProps<Props>()

</script>

<template>
  <div class="route-cars p-[16px] w-[300px] flex items-center gap-x-4 transition-shadow">
    <img class="border border-[#EFF2F7] rounded-[12px]" src="../assets/car.png" alt="">
    <div>
      <p class="text-[16px] text-shuttlersDark font-bold hover:underline hover:cursor-pointer">{{ trips?.vehicle?.registration_number }}</p>
      <span class="text-textDarkGrey mt-1 inline-block">{{trips?.driver?.fname}} {{trips?.driver?.lname}}</span>
    </div>
    <span
      class="bg-shuttlersPurple py-[8px] px-[8px] rounded-[16px] text-white font-bold text-[12px] h-[33px] transform -translate-y-3">{{ trips.vehicle?.brand }}</span>
  </div>
</template>


<style scoped>
.route-cars {
  border-radius: 16px;
  border: 1px solid #EAECF0;
  background-color: #fff;
}

.route-cars:hover {
  box-shadow: 0px 10px 24px 0px rgba(33, 35, 37, 0.08);
}
</style>