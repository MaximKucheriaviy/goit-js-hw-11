import './css/styles.css';
import pixabayGet from './js/pixabayGet';

const options = {
    key: "29155901-7a6502b1ec64ba72602e491fa",
    q: "yellow flowers"
}

pixabayGet(options)
.then(data => {
    console.log(data);
})
