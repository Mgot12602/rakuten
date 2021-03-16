import axios from "axios";

function ServerError(err) {
    console.log("err:", err.response.data);
    if (err.response && err.response.data && err.response.data.errorMessage) {
      return {
        status: false,
        errorMessage: err.response.data.errorMessage,
      };
    }
    return {
      status: false,
      errorMessage: "Api Server Error. Please check your server",
    };
  }
  
  function successStatus(res) {
    return {
      status: true,
      data: res.data,
    };
  }

const RAKUTEN_API_LIST_BASE_URL = 'https://gizmo.rakuten.tv/v3/';
//   https://gizmo.rakuten.tv/v3/lists/estrenos-imprescindibles-en-taquilla?classification_id=5&device_identifier=web&locale=es&market_code=es
  
const RAKUTEN_API_COMMON_URI = '?classification_id=5&device_identifier=web&locale=es&market_code=es';

const listService = axios.create({
    baseURL: RAKUTEN_API_LIST_BASE_URL
});

export function getList(category) {
    return listService
        .get(`lists/${category}?classification_id=5&device_identifier=web&locale=es&market_code=es`)
        .then((res) => {
          return res.data.data.contents.data;
        })
        .catch(ServerError);

}

export function getMovie(movie) {
 
  return listService
      .get(`movies/${movie}?classification_id=5&device_identifier=web&locale=es&market_code=es`)
      .then((res) => {
        console.log("Movie from server", res.data.data)
        return res.data.data;
        
      })
      .catch(ServerError);

}

