<template>
    <div class="route-cars p-[16px] w-[300px] flex  gap-x-4 cursor-pointer transition-shadow">
    <img src="../assets/car.png" alt="">
    <div>
      <p class="text-[16px] text-shuttlersDark font-bold">LND-123DE</p>
      <span class="text-textDarkGrey mt-1 inline-block">Tunde Awoleru</span>
    </div>
    <span class="bg-shuttlersPurple py-[8px] px-[8px] rounded-[16px] text-white font-bold text-[12px] h-[33px]">IYJ95</span>
   </div>
</template>


<style scoped>
.route-cars{
border-radius: 16px;
border: 1px solid #EAECF0;
background-color: #fff;
}

.route-cars:hover{
    box-shadow: 0px 10px 24px 0px rgba(33, 35, 37, 0.08);
}
</style>