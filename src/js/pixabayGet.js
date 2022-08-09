import axios from 'axios';

const url = 'https://pixabay.com/api/';

export default  function pixabayReqest({q, key, imageType = "photo", orientation = "horizontal", safesearch = true} = {}){
    q = q.split("");
    q = q.map(item => item === " " ? "+" : item).join("");
    const reqUrl = `${url}?key=${key}&q=${q}&imageType=${imageType}&o&safesearch=${safesearch}`
    return  axios.get(reqUrl);
}