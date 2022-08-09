import './css/styles.css';
import pixabayReqest from './js/pixabayGet';

const options = {
    key: "29155901-7a6502b1ec64ba72602e491fa",
    q: "yellow flovers"
}

pixabayReqest(options)
.then(data => {
    console.log(data);
})
