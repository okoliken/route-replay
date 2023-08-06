import tripCall, { type reqMethod } from "../axios";
import { ref, watch, computed, isProxy, toRaw, toRefs } from "vue";
import { useDateFormat, watchDebounced } from "@vueuse/core";

interface Result {
    route:{[x:string]:any}
}

const searchResult = ref<Result[]>([]);
const route = ref("");
const searchQuery = ref("");
const searchRoute = ref("");
const date = ref("");
const searching = ref(false)
export const useFilters = () => {


    const splitDateFromTo = computed(() => {
        if (date.value && isProxy(date.value)) {
            const newDate = toRaw(date.value);

            return {
                from: useDateFormat(newDate[0], "YYYY-MM-DD").value,
                to: useDateFormat(newDate[1], "YYYY-MM-DD").value,
            };
        }

        return;
    });

    const handleSearch = async (q: string) => {
        const reqMthd: reqMethod = "get";
        const params = {
            endpoint: `v1/trips/completed?limit=10&page=1&metadata=true&sort[start_trip]=desc&related=vehicle,route,driver&search=${q}&from=${splitDateFromTo.value?.from}&to=${splitDateFromTo.value?.to}`,
            method: reqMthd,
            returnPromise: true,
        };

        try {
            searching.value = true
            const response_val = await tripCall(params);

            searchResult.value = response_val.data?.data;
            searching.value = false
        } catch (error) {
            console.log(error)
            searching.value = false
        }




    };

    return {
        handleSearch,
        searchResult,
        date,
        searchQuery,
        route,
        searching,
        searchRoute
    };
};
