import tripCall, { type reqMethod } from "../axios";
import { ref, computed, isProxy, toRaw } from "vue";
import { useDateFormat } from "@vueuse/core";

import { useToast } from "vue-toastification";

import { type Result } from '../types'
import { handleTrip } from './trip'
const { selectedVehicle } = handleTrip()
// VARIABLES 
const searchResult = ref<Result[]>([]);
const route = ref("");
const searchQuery = ref("");
const searchRoute = ref("");
const date = ref("");
const searching = ref(false)
const vehicle = ref([])
const _toast = useToast();
// END



// filter out vehicle names from api
const vehicle_names = computed<{[x:string]: any}>(() => {
    return vehicle.value.filter((cars: any) => cars?.name)
})
// End




export const useFilters = () => {
    // date format
    const splitDateFromTo = computed(() => {
        if (date.value && isProxy(date.value)) {
            const newDate = toRaw(date.value);

            return {
                from: useDateFormat(newDate[0], "YYYY-MM-DD").value,
                to: useDateFormat(newDate[1], "YYYY-MM-DD").value,
            };
        }
        return {
            from:'',
            to:''
        };
    });
    // End

    // handle search by Id
    const handleSearch = async (id: string) => {
        const reqMthd: reqMethod = "get";
        const params = {
            endpoint: `api/v1/vehicles/${id}/positions?page=1&size=500000&startDate=${splitDateFromTo.value?.from}&endDate=${splitDateFromTo.value?.to}`,
            method: reqMthd,
            returnPromise: true,
        };
        try {
            searching.value = true
            const response_val = await tripCall(params);

            if (response_val.data?.data?.length) {
                selectedVehicle.value = response_val.data?.data;
            }
            else _toast.success('No Path Found')
            searching.value = false
        } catch (error) {
            searching.value = false
        }

    };
    // END

    // Fetch vehicles
    const fetchVehicle = async () => {
        const reqMthd: reqMethod = "get";
        const params = {
            endpoint: `vehicles`,
            method: reqMthd,
            returnPromise: true,
        };
        try {
            searching.value = true
            const response_val = await tripCall(params);

            vehicle.value = response_val.data
            searching.value = false
        } catch (error) {
            searching.value = false
        }
    };

    // END

    return {
        handleSearch,
        searchResult,
        date,
        searchQuery,
        route,
        searching,
        searchRoute,
        fetchVehicle,
        vehicle_names
    };
};
