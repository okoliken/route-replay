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
import { isProxy, computed, ref, onMounted, reactive } from "vue";
import { useGeolocation as location } from "./composables/location";
// import { GoogleMap, Marker, Polyline } from "vue3-google-map";
import { MapboxMap } from "vue-mapbox-ts";

import { useFilters } from "./composables/filters";
import { useAuth } from "./composables/auth";

import { useGeolocation } from "@vueuse/core";
const { searchResult, searching } = useFilters();
const { handleAuthorization, authenticating } = useAuth();
const { coords } = useGeolocation();

const token = ref('pk.eyJ1Ijoib2tvbGlqZWZmIiwiYSI6ImNsa3pudmNwNDFqZXQzam16c2p2OXF0ZXUifQ.DAF9aq4N5UcGRUqVMX_Pbg')

const { coordinates } = location();
const currentPosition = computed(() => ({
  lat: coordinates.value.latitude,
  lng: coordinates.value.longitude,
}));

const mapRef = ref(null)


// const geometry = computed(() => {
//   if (searchResult.value.length) {
//     return searchResult.value[0]?.route.geometry.map((obj: any) => ({
//       lat: obj.y,
//       lng: obj.x,
//     }));
//   } else return [];
// });

// const flightPlanCoordinates = [
//   { lat: 3.5901, lng: 6.466},
//   { lat:  3.5905, lng: 6.46604 },
//   { lat: 3.5905, lng: 6.46615 },
//   { lat: 3.59046, lng: 6.46659 },
// ];

// const flightPath = computed(() => {
//   return {
//     path: flightPlanCoordinates,
//     geodesic: true,
//     strokeColor: "#000000",
//     strokeOpacity: 1.0,
//     strokeWeight: 5,
//   };
// });

const getTrip = (val) => {
  if (isProxy(val)) {
    return;
  }
};

onMounted(async () => {
  if (!sessionStorage.getItem("tripAccessToken")) {
    await handleAuthorization();
  }
});

onMounted(() => {
  console.log(mapRef.value)
})
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
        <VehicleTrip @trips="getTrip" />
      </div>
    </div>
    <div class="absolute top-0 left-0 right-0 bottom-0 w-full z-0">
      <mapbox-map ref="mapRef" :accessToken="token">
        <mapbox-marker :lngLat="[3.3521664, 6.5765376]">
          <mapbox-popup>
            <div> my location</div>
          </mapbox-popup>
        </mapbox-marker>
        <mapbox-geogeometry-circle :center="[3, 8]" :radius="15" />
      </mapbox-map>
      <!-- <GoogleMap
        api-key="AIzaSyCBguFgxPOH6AuAiz0ZXXoo_fJAp4AR8WE"
        style="width: 100%; height: 100vh"
        :center="{ lat: currentPosition?.lat, lng: currentPosition?.lng }"
        :zoom="15"
      >
        <Marker
          :options="{
            position: { lat: currentPosition?.lat, lng: currentPosition?.lng },
            icon: './src/assets/bus.png',
          }"
        />
        <Polyline :options="flightPath" />
      </GoogleMap> -->
    </div>
    <div
      class="fixed bottom-40 flex items-start justify-start w-full overflow-y-hidden overflow-x-scroll gap-x-4 routes p-8 z-0">
      <template v-if="searching">
        <div v-for="i in 7" :key="i"
          class="w-[1200px] bg-gray-200 px-[106px] py-[44px] rounded-[16px] animate-ping transition-all duration-150">
        </div>
      </template>
      <RouteCars v-else v-for="(trips, index) in searchResult" :trips="trips" :key="index" class="flex-x" />
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
