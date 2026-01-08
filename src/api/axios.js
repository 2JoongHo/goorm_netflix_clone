import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key: "7b9921791adc1df298f533958a093af0",
        language: "ko-KR",
    }
})

export default instance;