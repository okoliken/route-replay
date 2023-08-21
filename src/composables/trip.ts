import { ref, computed, onMounted } from "vue";


const startingPoint = ref(0);
const currentPosition = ref({ lat: 6.5765376, lng: 3.3521664, dir: 0 });
const route = ref();
const replayState = ref(false);
const interval = ref<number | any>(null);
const speed = ref(1000);
const progressValue = ref(0);
const selectedVehicle = ref<{ [x: string]: any }>([]);
const positionDirection = ref<HTMLElement | null>(null)


const hasAVehicleBeenSelected = computed(() => {
  return Object.entries(selectedVehicle.value).length;
});

const geometry_path = computed(() => {
  route.value = selectedVehicle.value?.reverse();
  if (route.value?.length) {
    const firstItem = route.value[0];

    currentPosition.value = {
      lat: firstItem.position_latitude,
      lng: firstItem.position_longitude,
      dir: firstItem.position_direction
    };
  }

  return route.value?.map((obj: any) => ({
    lat: obj.position_latitude,
    lng: obj.position_longitude,
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

      return (currentPosition.value = {
        lat: firstItem.position_latitude,
        lng: firstItem.position_longitude,
        dir: firstItem.position_direction 
      });
    } else return (currentPosition.value = { lat: 6.5765376, lng: 3.3521664, dir:0 });
  },
});



const moveCar = () => {
  replayState.value = true;
  interval.value = setInterval(() => {
    if (startingPoint.value <= geometry_path.value?.length) {
      coordinates.value = startingPoint.value++;
    } else {
      stopCar();
      selectedVehicle.value = {};
      replayState.value = false;
      startingPoint.value = 0;
      speed.value = 1000;
    }
  }, speed.value);
};

const stopCar = () => {
  replayState.value = false;
  clearInterval(interval.value);
};

const stopAndStartInterval = () => {
  stopCar();
  moveCar();
};

const increaseSpeed = (value: number) => {
  speed.value = value;
  stopAndStartInterval();
};

const decreaseSpeedByTen = (value: number) => {
  speed.value -= value;
  stopAndStartInterval();
};
const increaseSpeedByTen = (value: number) => {
  speed.value += value;
  stopAndStartInterval();
};



export const handleTrip = () => {
  const selectVehicle = (vehicle: { [x: string]: any }) => {
    selectedVehicle.value = vehicle;
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
    progressValue,
    decreaseSpeedByTen,
    increaseSpeedByTen,
    positionDirection
  };
};
