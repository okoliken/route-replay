import {onMounted, ref, onUnmounted} from 'vue'


export const useGeolocation = () => {
    const coordinates = ref({latitude:0, longitude:0})
    const isSupported = 'navigator' in window && 'geolocation' in navigator


    let watcher:any = null
    onMounted(() => {
        if(isSupported) {
            watcher = navigator.geolocation.watchPosition(position => {
                coordinates.value = position.coords
            })
        }
    })

    onUnmounted(() => {
        if(watcher)  navigator.geolocation.clearWatch(watcher)
    })
    return {
        coordinates,
        isSupported
    }
}