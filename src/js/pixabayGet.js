import axios from 'axios';

const url = 'https://pixabay.com/api/';

export default async function pixabayGet({q, key, imageType = "photo", orientation = "horizontal", safesearch = true, perPage = 40, page = 1} = {}){
    q = q.split("");
    q = q.map(item => item === " " ? "+" : item).join("");
    const reqUrl = `${url}?key=${key}&q=${q}&imageType=${imageType}&o&safesearch=${safesearch}&per_page=${perPage}&page=${page}`;
    try{
        const response = await axios.get(reqUrl);
        return response.data
    }
    catch(err){
        console.log(err);
    } 
}