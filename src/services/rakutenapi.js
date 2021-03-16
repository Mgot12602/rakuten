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
  
 
// defined the base and common urls
const RAKUTEN_API_LIST_BASE_URL = 'https://gizmo.rakuten.tv/v3/';

const RAKUTEN_API_COMMON_URI = '?classification_id=5&device_identifier=web&locale=es&market_code=es';

// used axios to make to api calls
const listService = axios.create({
    baseURL: RAKUTEN_API_LIST_BASE_URL
});
// api call to get each movie list
export function getList(category) {
    return listService
        .get(`lists/${category}${RAKUTEN_API_COMMON_URI}`)
        .then((res) => {
          return res.data.data.contents.data;
        })
        .catch(ServerError);

}
// api call to get the movie details
export function getMovie(movie) {
 
  return listService
      .get(`movies/${movie}${RAKUTEN_API_COMMON_URI}`)
      .then((res) => {
       
        return res.data.data;
        
      })
      .catch(ServerError);

}

