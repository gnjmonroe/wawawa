const parks = Array.prototype.slice.call(document.getElementsByClassName('park'));
let streams = Array.prototype.slice.call(document.getElementsByClassName('stream'));
const streamModal = document.getElementById('streamModal');
const returnTarget = document.getElementById('return');

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let currentId;
let player0,
  player1,
  player2,
  player3,
  player4,
  player5,
  player6,
  player7,
  player8,
  player9,
  player10,
  player11,
  player12,
  player13,
  player14,
  player15,
  player16;
var players = [
  player0,
  player1,
  player2,
  player3,
  player4,
  player5,
  player6,
  player7,
  player8,
  player9,
  player10,
  player11,
  player12,
  player13,
  player14,
  player15,
  player16,
];
let localPlayerInitCount = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

function onPlayerReady() {
  players[currentId].playVideo();

  if(!returnTarget.getAttribute('listener')) {
    returnTarget.addEventListener('click', () => {
      streamModal.classList.toggle('hidden');
      streams.forEach(stream => {
        if (!stream.classList.contains('hidden')) {
          stream.classList.add('hidden');
        }
      });
      try {
        players[currentId].pauseVideo();
      } catch (error) {
        console.log(players[currentId]);
        console.error(error);
      }
    }
    )
  }
  returnTarget.setAttribute('listener', true);
}

function handleParkClick() {
  parks.forEach(park => park.addEventListener('click', (e) => {
    currentId = e.target.id.substring(4);
    if (Number(currentId) >= 0 && Number(currentId) <= 16) {
      streamModal.classList.toggle('hidden');
      if(streams[currentId].classList.contains('hidden')) {
        streams[currentId].classList.remove('hidden');
      }
      if (localPlayerInitCount[currentId] === 0) {
        players[currentId] = new YT.Player(`stream${currentId}`, {
          events: {
            'onReady': onPlayerReady,
          }
        })
      }
      if (localPlayerInitCount[currentId] > 0) {
        players[currentId].playVideo();
      }
      localPlayerInitCount[currentId] += 1;
      console.log(localPlayerInitCount[currentId]);
    }
  }))
}
handleParkClick();