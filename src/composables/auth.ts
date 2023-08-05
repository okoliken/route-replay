import {ref} from 'vue';
import  tripCall, {type reqMethod, storeUser} from '../axios'
const loading = ref(false)
const email = ref("jahbuchimokoli3@gmail.com");
const password = ref("jahbuchimokoli3@gmail.com");
const type = ref("staff");


export const useAuth = () => {
    const handleAuthorization = async () => {
        const reqMthd: reqMethod = "post";
        const params = {
          endpoint: "v1/login",
          method: reqMthd,
          body: {
          email: email.value,
          password: password.value,
          type: type.value
        },
          returnPromise: true,
        };
      
      
        try {
            loading.value = true;
            const res = await tripCall(params);
      
            if (res.data?.token) {
              loading.value = false
              storeUser(res.data?.token?.token);
            }
      
            
          } catch (error: any) {
            // $toast.error("Something went wrong. Please try again.");
            loading.value = false;
            // $toast.error(error);
          }
      }
      

      return {
        handleAuthorization,
        authenticating:loading
      }
}