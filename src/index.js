import './css/styles.css';
import './css/styles.scss';
import pixabayGet from './js/pixabayGet';
import createPhotoDiv from './js/createPhotoDiv';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/src/simple-lightbox.scss';
import FullScrollDetector from './js/fullScrollDetector';
import Notiflix from 'notiflix';


const scrollDetector = new FullScrollDetector;
const refs = {
    gallery: document.querySelector('.gallery'),
    form: document.querySelector('.search-form'),
    inputField: document.querySelector('[name="searchQuery"]')
}

const pixabayGetOptions = {
    key: "29155901-7a6502b1ec64ba72602e491fa",
    q: "yellow flowers",
    page: 1
}

const simplelightboxOptions = {
    sourceAttr: "data-large-url"
}

const gallery = new SimpleLightbox('.gallery .photo-card', simplelightboxOptions);

refs.form.addEventListener("submit", onSubmit);
refs.inputField.addEventListener("input", () => {
    refs.gallery.innerHTML = "";
    pixabayGetOptions.page = 1;
})

scrollDetector.on(() => {
    getImages();
    scrollDetector.stopEmitin();
})

function getImages(){
    pixabayGet(pixabayGetOptions)
    .then(data => {
        if(data.total === 0){
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        if(pixabayGetOptions.page === 1){
            Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
        }
        if(data.hits.length === 0){
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            return;
        }
        const photos = data.hits.reduce((acc, item) =>  acc + createPhotoDiv(item), "");
        refs.gallery.insertAdjacentHTML('beforeend', photos);
        gallery.refresh();
        pixabayGetOptions.page += 1;
        scrollDetector.startEmitin();

    })
    .catch(err => {
        console.log(err);
    })
}

function onSubmit(event){
    event.preventDefault();
    pixabayGetOptions.q = refs.inputField.value;
    getImages();
}






