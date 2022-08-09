import './css/styles.css';
import './css/styles.scss';
import pixabayGet from './js/pixabayGet';
import createPhotoDiv from './js/createPhotoDiv';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/src/simple-lightbox.scss';
import FullScrollDetector from './js/fullScrollDetector';


const scrollDetector = new FullScrollDetector;
const refs = {
    gallery: document.querySelector('.gallery'),
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

scrollDetector.on(() => {
    getImages();
    scrollDetector.stopEmitin();
})


function getImages(){
    pixabayGet(pixabayGetOptions)
    .then(data => {
        const photos = data.hits.reduce((acc, item) =>  acc + createPhotoDiv(item), "");
        refs.gallery.insertAdjacentHTML('beforeend', photos);
        gallery.refresh();
        pixabayGetOptions.page += 1;
        scrollDetector.startEmitin();
    })
}

getImages();




