import Axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/';
const axios = Axios.create({
    // baseURL: process.env.BASE_URL,
    baseURL: baseURL,
    headers:{
        'X-Requested-With': 'XMLHttpRequest',
    }
})

axios.interceptors.request.use(
    (config)=> {
        const token = localStorage.getItem('Token')
        if(token){
            config.headers.Authorization = `Token ${token}`
        } else {
            config.headers.Authorization = ``
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axios.interceptors.response.use(
    (response)  =>  {
        return response
    },
    (error) => {
        if(error.response && error.response.status === 401 ){
            localStorage.removeItem('Token')
            window.location.href = '/'
        }
    }
)

export default axios;