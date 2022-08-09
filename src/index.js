import './css/styles.css';
import pixabayGet from './js/pixabayGet';
import createPhotoDiv from './js/createPhotoDiv';

const refs = {
    gallery: document.querySelector('.gallery'),
}

const pixabayGetOptions = {
    key: "29155901-7a6502b1ec64ba72602e491fa",
    q: "yellow flowers",
    page: 2
}

pixabayGet(pixabayGetOptions)
.then(data => {
    const photos = data.hits.reduce((acc, item) =>  acc + createPhotoDiv(item), "");
    refs.gallery.insertAdjacentHTML('beforeend', photos);
})



