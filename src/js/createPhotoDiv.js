export default function createPhotoDiv({webformatURL = "", largeImageURL = "", tags = "", likes = "", views = "", comments = "", downloads = "", webformatHeight, webformatWidth} = {}){
    const width = Math.round(webformatWidth * 192 / webformatHeight);
    //console.log(webformatWidth, webformatHeight);
    const imageStyle = webformatHeight < 480 ? `style="max-width: none; width: ${width}px; height: 192px"` : "";
    const photoDiv = `<div class="photo-card" data-large-url="${largeImageURL}">
    <div class="image-thumb">
    <img src="${webformatURL}" alt="${tags}" ${imageStyle} loading="lazy"/>
    </div>
    <div class="info">
    <p class="info-item">
        <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
        <b>Views</b> ${views}
    </p>
    <p class="info-item">
        <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
        <b>Downloads</b> ${downloads}
    </p>
    </div>
    </div>`

    return photoDiv;
}