const html = document.getElementsByTagName('html');
const img0 = document.getElementById('img0');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');
const img4 = document.getElementById('img4');
const imgs = [
  img0,
  img1,
  img2,
  img3,
  img4,
]
const imgVisibilityArray = [0, 0, 1, 0, 0];
const photoDot0 = document.getElementById('photoDot0');
const photoDot1 = document.getElementById('photoDot1');
const photoDot2 = document.getElementById('photoDot2');
const photoDot3 = document.getElementById('photoDot3');
const photoDot4 = document.getElementById('photoDot4');
const photoDots = [
  photoDot0,
  photoDot1,
  photoDot2,
  photoDot3,
  photoDot4,
]
const arrowL = document.getElementById('arrowL');
const arrowR = document.getElementById('arrowR');

function updateImgVisibility() {
  imgVisibilityArray.forEach((el,i) => {
    if (el === 1) {
      imgs[i].classList = 'visible';
    } else {
      imgs[i].classList = 'hidden';
    }
  })
}
function updatePhotoDotStyle() {
  imgVisibilityArray.forEach((el,i) => {
    if (el === 1) {
      photoDots[i].classList = 'photo-dot selected';
    } else {
      photoDots[i].classList = 'photo-dot';
    }
  })
}
function slidePhotosLeft() {
  let placeholder = imgVisibilityArray.shift();
  imgVisibilityArray.push(placeholder);
  updateImgVisibility();
  updatePhotoDotStyle();
}
function slidePhotosRight() {
  let placeholder = imgVisibilityArray.pop();
  imgVisibilityArray.unshift(placeholder);
  updateImgVisibility();
  updatePhotoDotStyle();
}

arrowL.addEventListener('click', () => {
  slidePhotosLeft();
})
arrowR.addEventListener('click', () => {
  slidePhotosRight();
})
html[0].addEventListener('keydown', (e) => {
  e = e || window.event;
  if (e.key == 'ArrowLeft') slidePhotosLeft();
  if (e.key == 'ArrowRight') slidePhotosRight();
})