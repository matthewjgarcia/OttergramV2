var DETAIL_IMAGE_SELECTOR = '[data-image-role ="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role ="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role = "frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role ="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

var imgTrack = 0;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb (thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb (thumbnail) {
    'use strict'
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb, curr) {
    'use strict';
    thumb.addEventListener('click', (event) => {
        event.preventDefault();
        setTrack(curr);
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function setTrack(newTrack) {
    'use strict';
    imgTrack = newTrack;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup' ,function (event){
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY){
            hideDetails();
        }
    });
}

function leftImages() {
    'use strict';
    document.getElementById('Left').addEventListener( 'click', () => {
        var thumbnailArray = getThumbnailsArray();
        var index;
        if( imgTrack === 0){
            index = thumbnailArray.length - 1;
        } else {
            index = (imgTrack -1) % thumbnailArray.length;
        }
        setTrack(index);
        setDetailsFromThumb(thumbnailArray[index]);
        showDetails();
    });
}

function rightImages() {
    'use strict';
    document.getElementById('Right').addEventListener( 'click', () => {
        var thumbnailArray = getThumbnailsArray();
        var nextImg = (imgTrack + 1) % thumbnailArray.length;
        setTrack(nextImg);
        setDetailsFromThumb(thumbnailArray[nextImg]);
        showDetails();
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    leftImages();
    rightImages();
    addKeyPressHandler();
}

initializeEvents();