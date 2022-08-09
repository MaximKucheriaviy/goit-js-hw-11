export function fetchCountries(name){
    const endPoint = 'https://restcountries.com/v2/name';
    const filter = '?fields=name,capital,population,flags,languages'
    return fetch(`${endPoint}/${name}${filter}`)
    .then(response => {
        if(!response.ok){
            throw new Error("Oops, there is no country with that name");
        }
        return response.json();
    })
}