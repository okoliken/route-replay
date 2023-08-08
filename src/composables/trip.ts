import { ref, computed } from "vue";

// your current location
const startingPoint = ref(0);
const currentPosition = ref({ lat: 6.5765376, lng: 3.3521664 });
const route = ref();
const replayState = ref(false);
const interval = ref<number | any>(null);
const speed = ref(1000);
const currentTime = ref(0)
const progressValue = ref(0)

const selectedVehicle = ref<{ [x: string]: any }>({});
const hasAVehicleBeenSelected = computed(() => {
  return Object.entries(selectedVehicle.value).length;
});
const geometry_path = computed(() => {
  route.value = selectedVehicle.value?.route?.geometry?.reverse();
  if (route.value?.length) {
    const firstItem = route.value[0];

    currentPosition.value = {
      lat: firstItem.y,
      lng: firstItem.x,
    };
  }

  return route.value?.map((obj: any) => ({
    lat: obj.y,
    lng: obj.x,
  }));
});

const routePath = computed(() => {
  return {
    path: geometry_path.value,
    geodesic: true,
    strokeColor: "#4848ED",
    strokeOpacity: 1.0,
    strokeWeight: 5,
  };
});

const coordinates = computed({
  get() {
    return currentPosition.value;
  },
  set(index: any = 0) {
    if (route.value?.length) {
      const firstItem = route.value[index];

     return currentPosition.value = {
        lat: firstItem.y,
        lng: firstItem.x,
      };
    } else return (currentPosition.value = { lat: 6.5765376, lng: 3.3521664 });
  },
});

const moveCar = () => {
  replayState.value = true;
  interval.value = setInterval(() => {
    if (startingPoint.value <= geometry_path.value?.length) {
       coordinates.value = startingPoint.value++;
       progressValue.value += (geometry_path.value?.length / 100)
      // console.log('Time to wait is:', t)
      // if(currentTime.value % getSecondsToWait.value === 0){
      //   progressValue.value += getSecondsToWait.value 
      //   // console.log('current time is:',progressValue.value)
      //   // console.log('Time to wait is:', getSecondsToWait.value)
      // }


    } else {
      stopCar();
      selectedVehicle.value = {}
      replayState.value = false;
    }
  }, getSecondsToWait.value);
};

const stopCar = () => {
  replayState.value = false;
  clearInterval(interval.value);
};

const increaseSpeed =  (value: number) => {
  speed.value = value;
   stopCar();
   moveCar();
};

const getSecondsToWait = computed(() => {
  const time = Math.round(selectedVehicle.value?.route?.duration_value / geometry_path.value?.length)
  return time
 }) 
//

export const handleTrip = () => {


   const selectVehicle = (vehicle: { [x: string]: any }) => {
    selectedVehicle.value = vehicle;
        console.log(selectedVehicle.value)
  };

  return {
    selectedVehicle,
    selectVehicle,
    routePath,
    hasAVehicleBeenSelected,
    coordinates,
    moveCar,
    stopCar,
    replayState,
    increaseSpeed,
    progressValue
  };
};
