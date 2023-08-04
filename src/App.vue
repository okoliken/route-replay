<script setup lang="ts">
import Header from "./components/Header.vue";
import Search from "./components/form-elements/Search.vue";
import SelectRoute from "./components/form-elements/SelectRoute.vue";
import SelectDateRange from "./components/form-elements/SelectDateRange.vue";
import LocationStamp from "./components/location-trips/location-stamp.vue";
import TripTimeStamp from "./components/location-trips/trip-time-stamp.vue";
import VehicleTrip from "./components/location-trips/vehicle-trip.vue";
import RouteReplay from "./components/route-replay.vue";
import RouteCars from "./components/route-cars.vue";
import { isProxy, toRaw, computed, ref, onMounted } from "vue";
import { useGeolocation } from "./composables/location";
import axios from 'axios'

const baseUrl = 'https://api.test.shuttlers.africa/'
const email = ref("jahbuchimokoli3@gmail.com");
const password = ref("jahbuchimokoli3@gmail.com");
const type = ref("staff");

const { coordinates } = useGeolocation();
const currentPosition = computed(() => ({
  lat: coordinates.value.latitude,
  lng: coordinates.value.longitude,
}));

const getTrip = (val) => {
  if (isProxy(val)) {
    return;
  }
  // console.log(JSON.parse(JSON.stringify(val)))
};

onMounted(async () => {
  
  
  
  await axios.post(`${baseUrl}v1/login`,{
    email: email.value,
    password: password.value,
    type: type.value
  },
  ).then((res) => {
   const  token =  res.data?.token?.token
   sessionStorage.setItem('tripAccessToken', token)
  }).catch((err) => {
    // console.log(err)
  })
})
</script>

<template>
  <main>
    <!-- {{ currentPosition.lat }}
    {{ currentPosition.lng }} -->
    <Header />
    <div class="grid grid-cols-12 gap-3 mt-4 container mx-auto">
      <div class="col-span-3">
        <SelectRoute />
      </div>
      <div class="col-span-6">
        <Search />
      </div>
      <div class="col-span-3">
        <SelectDateRange />
      </div>

      <div class="col-span-2">
        <LocationStamp stampType="red" text="Pickup location" />
      </div>
      <div class="col-span-2">
        <LocationStamp stampType="green" text="Drop off location" />
      </div>
      <div class="col-span-3">
        <TripTimeStamp />
      </div>
      <div class="mt-1 col-span-5 flex justify-end">
        <VehicleTrip @trips="getTrip" />
      </div>
    </div>

    <div
      class="fixed bottom-40 flex items-center justify-between w-full overflow-y-hidden overflow-x-scroll gap-x-4 routes p-8 z-0">
      <!-- <RouteCars class="flex-x" v-for="i in 6" :key="i" /> -->
    </div>

    <div class="fixed bottom-8 flex items-center justify-center w-full">
      <RouteReplay />
    </div>
  </main>
</template>

<style scoped>
.routes::-webkit-scrollbar {
  display: none;
  width: 0px;
}

.routes {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
}

.flex-x {
  flex: 0 0 auto;
}
</style>
