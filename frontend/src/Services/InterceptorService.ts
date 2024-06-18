import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorService {
    public createInterceptor():void {
        axios.interceptors.request.use(request => {
            // If token exists, add it to request, otherwise leave request as is
            if(authStore.getState().token) request.headers.Authorization = "Bearer " + authStore.getState().token;

            return request;
        });
    }
}

const interceptorService = new InterceptorService(); // Singleton

export default interceptorService;