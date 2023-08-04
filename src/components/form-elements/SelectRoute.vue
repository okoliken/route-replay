<template>
  <div
    class="bg-white bx-shw py-[10px] px-[16px] rounded-[8px] border border-shuttlersGrey relative"
  >
    <!-- <input class="placeholder:text-[16px] placeholder:font-light" placeholder="Select route" type="text"> -->
    <v-select
      class="placeholder:text-[16px] placeholder:font-light"
      placeholder="Select route"
      :options="['Canada', 'United States']"
    ></v-select>
    <i
      class="ri-map-pin-2-fill absolute top-4 text-[20px] transform -translate-y-1 right-5 text-textDarkGrey"
    ></i>
  </div>
</template>

<style scoped>
.bx-shw {
  box-shadow: 0px 10px 24px 0px rgba(33, 35, 37, 0.08);
  z-index:9999;
}
</style>
