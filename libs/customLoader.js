import {API_URL} from "@/config/index";

const customLoader = ({src})=>{
    return `${API_URL}${src}`;
}

export default customLoader;
