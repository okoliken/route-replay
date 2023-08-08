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
import Loader from "./components/form-elements/Loader.vue";
import { onMounted, ref } from "vue";
import { handleTrip } from "./composables/trip";
// @ts-ignore
import { GoogleMap, Marker, Polyline, InfoWindow } from "vue3-google-map";
import { useFilters } from "./composables/filters";
import { useAuth } from "./composables/auth";
import { useDateFormat } from '@vueuse/core'
const { searchResult, searching } = useFilters();
const { handleAuthorization, authenticating } = useAuth();
const { selectVehicle, routePath, hasAVehicleBeenSelected, coordinates, selectedVehicle } = handleTrip();
const apiKey = ref('AIzaSyCBguFgxPOH6AuAiz0ZXXoo_fJAp4AR8WE')

const customMeridiem = (hours: number, minutes: number, isLowercase?: boolean, hasPeriod?: boolean) => {
  const m = hours > 11 ? (isLowercase ? 'pm' : 'pm') : (isLowercase ? 'am' : 'am')
  return hasPeriod ? m.split('').reduce((acc, current) => acc += `${current}.`, '') : m
}

onMounted(async () => {
  if (!sessionStorage.getItem("tripAccessToken")) {
    await handleAuthorization();
  }
});

</script>

<template>
  <main>
    <Loader v-if="authenticating" />

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
        <VehicleTrip />
      </div>
    </div>
    <div class="absolute top-0 left-0 right-0 bottom-0 w-full z-0">
      <GoogleMap :api-key="apiKey" style="width: 100%; height: 100vh"
        :center="{ lat: coordinates?.lat, lng: coordinates?.lng }" :zoom="15">
        <Marker v-if="hasAVehicleBeenSelected" :options="{
          position: { lat: coordinates?.lat, lng: coordinates?.lng },
          icon: './src/assets/bus.png',
          animation: 'drop'
        }">
          <InfoWindow style="padding: 0%; !important">
            <div class="py-3">
              <div class="flex items-center gap-x-3">
                <img class="border border-[#EFF2F7] rounded-[12px] w-[36px]" src="./assets/car.png" alt="">
                <div>
                  <p class="text-[#09090F] font-light leading-[20px]">{{ selectedVehicle?.driver?.fname }}
                    {{ selectedVehicle?.driver?.lname }}</p>
                  <span class="font-bold">{{selectedVehicle?.vehicle?.registration_number}}</span>
                </div>
              </div>

              <div class="mt-5">
                <p class="text-[#09090F] font-light leading-[20px]">Vehicle arrival time</p>
                <span class="font-bold">{{ useDateFormat(selectedVehicle?.end_trip, 'hh:mm aa (ddd)', { customMeridiem }).value}}</span>
              </div>
              <div class="mt-4">
                <p class="text-[#09090F] font-light leading-[20px]">Passengers picked up</p>
                <span class="font-bold">{{ selectedVehicle?.passengers_count }}</span>
              </div>
              <div class="mt-4">
                <p class="text-[#09090F] font-light leading-[20px]">Vehicle departure time</p>
                <span class="font-bold">{{useDateFormat(selectedVehicle?.start_trip, 'hh:mm aa (ddd)', { customMeridiem }).value}}</span>
              </div>
              <!-- <div class="mt-4">
                <p class="text-[#09090F] font-light leading-[20px]">Passengers dropped off</p>
                <span class="font-bold">0</span>
              </div> -->
              <!-- <div class="mt-4">
                <p class="text-[#09090F] font-light leading-[20px]">Next stop</p>
                <span class="font-bold">Ijegbe Bus stop</span>
              </div> -->
            </div>
          </InfoWindow>
        </Marker>

        <Polyline :options="routePath" />
      </GoogleMap>
    </div>
    <div
      class="fixed bottom-40 flex items-start justify-start w-full overflow-y-hidden overflow-x-scroll gap-x-4 routes p-8 z-0">
      <template v-if="searching">
        <div v-for="i in 7" :key="i"
          class="w-[1200px] bg-gray-200 px-[106px] py-[44px] rounded-[16px] animate-pluse  cursor-wait">
        </div>
      </template>
      <RouteCars @click="selectVehicle(trips)" v-else-if="!hasAVehicleBeenSelected" v-for="(trips, index) in searchResult"
        :trips="trips" :key="index" class="flex-x" />
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
  scrollbar-width: none;
}


.flex-x {
  flex: 0 0 auto;
}
</style>
