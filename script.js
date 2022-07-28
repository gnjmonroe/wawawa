const parks = Array.prototype.slice.call(document.getElementsByClassName('park'));
const streams = Array.prototype.slice.call(document.getElementsByClassName('stream'));
const streamModal = document.getElementById('streamModal');
const returnTarget = document.getElementById('return');

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const ytStream0 = {
  videoId: 'srlpC5tmhYs'
}
const ytStreams = [
  'srlpC5tmhYs',
  'qHJMkze8lPg',
  '0EaQuajibHU',
  'TL0weAv8C9s',
  'void',
  'IACz47DhAtQ',
  '-mjQOL-Fnjk',
  '6JQyhhi41uk',
  'W9DP0Je5rKU',
  'qwjt-gnItvg',
  'N6390yh3Y_U',
  'IjSGWGt6xu8',
  'l7LWIh_jNjM',
  'jFJ59-9tTyM',
  'z_mlibCfgFI',
  'bvX0Kkv8xXw',
  'kDaOgSc_flY',
]

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('stream2', {
    playerVars: {
      playsinline: 0
    },
    events: {
      'onReady': onPlayerReady,
    }
  })
}
function onPlayerReady() {
  player.playVideo();
}

function handleParkClick() {
  parks.forEach(park => park.addEventListener('click', e => {
    streamModal.classList.toggle('hidden');
    streams[park.id.substring(4)].classList.toggle('hidden')
  }))
}
handleParkClick();

returnTarget.addEventListener('click', (player) => {
  streamModal.classList.toggle('hidden');
  streams.forEach(stream => {
    stream.className = 'stream hidden'
    if (stream.id.substring(6) === '2') {
      console.log(stream.id.substring(6));
      player.pauseVideo();
    };
  })
})