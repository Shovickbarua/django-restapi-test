import axios from '../utils/Axios'

const ScrapeApi = () => {};

ScrapeApi.index = async () => {
    const url = "/api/history/";
    const res = await axios.get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

ScrapeApi.scrape = async (data) => {
    let url = "/api/scrape/";
    const res = await axios.post(url, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};





export default ScrapeApi;