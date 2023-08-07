import { ref, computed, watch } from 'vue'
import { useGeolocation as location } from "../composables/location";

// your current location 
const startingPoint = ref(0)
const currentPosition = ref({ lat: 6.5765376, lng: 3.3521664 })
const re = ref()
const replayState = ref(false)
const interval = ref<number | any>(null)
// logic to get vehicle and plot the polyline path on the map
const selectedVehicle = ref<{ [x: string]: any }>({})
const hasAVehicleBeenSelected = computed(() => {
    return Object.entries(selectedVehicle.value).length
})
const geometry = computed(() => {
    re.value =  selectedVehicle.value?.route?.geometry?.reverse()
    if (re.value?.length) {
        const firstItem = re.value[0]
    
        const mappedItem = {
            lat: firstItem.y,
            lng: firstItem.x
        };
    
        currentPosition.value = mappedItem;
    }

    return re.value?.map((obj: any) => ({
        lat: obj.y,
        lng: obj.x,
    }));
});

const routePath = computed(() => {
    return {
        path: geometry.value,
        geodesic: true,
        strokeColor: "#4848ED",
        strokeOpacity: 1.0,
        strokeWeight: 5,
    }
});

const firstCoordinates = computed({
    get(){
        return currentPosition.value
    },
    set(index:any = 0){
        if (re.value?.length) {
            const firstItem = re.value[index]
    
            const mappedItem = {
                lat: firstItem.y,
                lng: firstItem.x
            };
    
            return currentPosition.value = mappedItem;
        }
        else return currentPosition.value  = { lat: 6.5765376, lng: 3.3521664 } 
    }
})

const moveCar = () => {
    replayState.value = true
    interval.value =  setInterval(()=> {
        if(startingPoint.value <= geometry.value?.length){
            firstCoordinates.value = startingPoint.value++
        }
        else {
            stopCar()
            replayState.value =  false
        }
    }, 500)
    
}

const stopCar = () => {
    replayState.value =  false
    clearInterval(interval.value)
}
// 


export const handleTrip = () => {
    const selectVehicle = (vehicle: { [x: string]: any }) => {
        selectedVehicle.value = vehicle

        console.log(selectedVehicle.value)
    }

    return {
        selectedVehicle,
        selectVehicle,
        routePath,
        hasAVehicleBeenSelected,
        firstCoordinates,
        moveCar,
        stopCar,
        replayState
    }
}