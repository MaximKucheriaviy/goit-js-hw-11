import './css/styles.css';
import _, { reject } from "lodash";
import Notiflix from 'notiflix';
import {fetchCountries} from "./fetchCountries.js";

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('#search-box');
const contriesList = document.querySelector('.country-list');
const countryInfoBlock = document.querySelector('.country-info');

inputField.addEventListener("input", _.debounce(onInput, DEBOUNCE_DELAY));

function onInput(){
    if(inputField.value === ""){
        contriesList.innerHTML = "";
        countryInfoBlock.innerHTML = "";
        return;
    }
    
    fetchCountries(inputField.value).then(data => {
        contriesList.innerHTML = "";
        countryInfoBlock.innerHTML = "";
        if(data.length >= 2 && data.length <= 10){
            const listItems = [];
            data.forEach(item => {
                listItems.push(createListItem({
                    name: item.name,
                    flag: item.flags.svg,
                }));
                contriesList.append(...listItems);
            })
        }
        else if(data.length > 10){
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        }
        else if(data.length === 1){
            const listItems = createListItem({
                name: data[0].name,
                flag: data[0].flags.svg,
                capital: data[0].capital,
                population: data[0].population,
                languages: data[0]. languages
            });
            
            contriesList.append(...listItems);
        }
    })
    .catch(err => {
        Notiflix.Notify.failure(err.message);
    })
}
function createListItem({flag, name, capital, population, languages} = {}){
       
    if(capital || population || languages){
        const outputElements = [];

        const capitalSpan = document.createElement("span");
        const populationSpan = document.createElement("span");
        const languagesSpan = document.createElement("span");
        
        capitalSpan.textContent = 'Capital: ';
        populationSpan.textContent = 'Population: ';
        languagesSpan.textContent = 'Languages: ';

        capitalSpan.classList.add("caption-span");
        populationSpan.classList.add("caption-span");
        languagesSpan.classList.add("caption-span");

        const img = document.createElement("img");
        const nameItem = document.createElement('p');
        const capitalItem = document.createElement("li");
        const populationItem = document.createElement("li");
        const languagesItem = document.createElement("li");

        nameItem.textContent = name;
        img.src = flag;
        capitalItem.textContent = capital;
        populationItem.textContent = population;
        languages.forEach(item => {
            languagesItem.textContent += `${item.name} `;
        });
        
        const nameDiv = document.createElement('div');
        const outList = document.createElement('ul');

        nameDiv.classList.add('name-div');
        outList.classList.add('country-params-list');
        img.classList.add('inline-flag');

        capitalItem.prepend(capitalSpan);
        populationItem.prepend(populationSpan);
        languagesItem.prepend(languagesSpan);
        
        nameDiv.append(img, nameItem);   
        outList.append(capitalItem, populationItem, languagesItem);

        outputElements.push(nameDiv);
        outputElements.push(outList);

        return outputElements;
    }
    else{
        const li = document.createElement("li");
        const img = document.createElement("img");
        const text = document.createElement("p");
        li.classList.add('country-list__item');

        img.src = flag;
        img.classList.add('inline-flag');
        text.textContent = name;
        li.append(img, text);
        return li
    }
}