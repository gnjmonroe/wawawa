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

var player;
function onPlayerReady() {
  player.playVideo();
}

let currentId;
function handleParkClick() {
  parks.forEach(park => park.addEventListener('click', (e) => {
    console.log(currentId);
    currentId = e.target.id.substring(4);
    streamModal.classList.toggle('hidden');
    console.log(currentId);
    if(streams[currentId].classList.contains('hidden')) {
      streams[currentId].classList.remove('hidden')
    }
    player = new YT.Player(`stream${park.id.substring(4)}`, {
      playerVars: {
        'playsinline': 0,
      },
      events: {
        'onReady': onPlayerReady,
      }
    })
  }))
}
handleParkClick();

returnTarget.addEventListener('click', () => {
  streamModal.classList.toggle('hidden');
  player.pauseVideo();
  streams.forEach(stream => stream.classList = 'stream hidden');
})