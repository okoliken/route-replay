<script lang="ts" setup>
//@ts-ignore
import Button from "./form-elements/Button.vue";
const refreshPage = () => {
  window.location.reload()
}
</script>

<template>
  <header class="min-h-[75px] py-4 px-16 flex items-center justify-between bg-white relative z-50">
    <div class="">
      <p class="text-textSoftGrey text-[11px]">OVERVIEW</p>
      <h1 class="text-[22px] font-medium leading-[29px] tracking-[-0.673px]">Route Replay</h1>
    </div>
    <Button @click="refreshPage" />
  </header>
</template>