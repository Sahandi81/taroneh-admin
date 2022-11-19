// import useSWR from "swr";
// import {API_URL} from '@/config/index';
// import userFetcher from "../libs/api-user";

// export default function useUser() {
//   const { data, mutate, error } = useSWR(`${API_URL}/api/user_details`, userFetcher);
  
//   const loading = !data && !error;
//   const loggedOut = error && error.status === 403;

//   return {
//     loading,
//     loggedOut,
//     user: data,
//     mutate
//   };
// }
