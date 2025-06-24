import axios from "axios";

// create the axios instance for integration

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.request.use((config)=>{

 // get access token form localstorage
 const token = localStorage.getItem('token');
 
//attach token to the authorization header
config.headers.Authorization=`Bearer${token}`;
return config;
})