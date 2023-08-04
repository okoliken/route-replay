import { onClickOutside } from '@vueuse/core'

export const clickOutSide = () => {
   
   
   const useClick = (dropDown:HTMLElement, state:boolean) => {
    onClickOutside(dropDown, () => state = false)
   }

    return {
        useClick
    }
}