const parks = Array.prototype.slice.call(document.getElementsByClassName('park'));
let streams = Array.prototype.slice.call(document.getElementsByClassName('stream'));
const parkGroups = Array.prototype.slice.call(document.getElementsByClassName('park-group'));
const parkLabels = Array.prototype.slice.call(document.getElementsByClassName('park-label'));
const parkLabelsDiv = document.getElementsByClassName('park-labels')[0];
const streamModal = document.getElementById('streamModal');
const returnTarget = document.getElementById('return');
const dorawa = document.getElementById('dorawa');
const waBanner = document.getElementById('wa-banner');
const mainSvg = document.getElementById('main-svg');
const land = Array.prototype.slice.call(document.getElementsByClassName('map-fill'));
const water = document.getElementsByTagName('body')[0];

const lwColors = ['rgb(255, 246, 122)', 'rgb(159, 255, 185)', 'rgb(166, 175, 234)']
const regexGetIdNumber = /\d+$/;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let currentId, currentLabelId;
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
  player16,
  player17,
  player18,
  player19,
  player20;
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
  player17,
  player18,
  player19,
  player20,
];
let localPlayerInitCount = new Array(players.length).fill(0);

function transitionColors() {
  // transition land color
  if (land[0].style.fill === '') {
    land.forEach(landFill => landFill.style.fill = lwColors[0]);
  } else if (land[0].style.fill === lwColors[0]) {
    land.forEach(landFill => landFill.style.fill = lwColors[1]);
  } else if (land[0].style.fill === lwColors[1]) {
    land.forEach(landFill => landFill.style.fill = lwColors[2]);
  } else if (land[0].style.fill === lwColors[2]) {
    land.forEach(landFill => landFill.style.fill = lwColors[0]);
  }
  // transition water color
  if (water.style.backgroundColor === '') {
    water.style.backgroundColor = lwColors[1];
  } else if (water.style.backgroundColor === lwColors[0]) {
    water.style.backgroundColor = lwColors[1];
  } else if (water.style.backgroundColor === lwColors[1]) {
    water.style.backgroundColor = lwColors[2];
  } else if (water.style.backgroundColor === lwColors[2]) {
    water.style.backgroundColor = lwColors[0];
  }
  setTimeout(transitionColors, 10000);
}

// document.addEventListener('DOMContentLoaded', transitionColors);
function toggleStreamModal() {
  streamModal.classList.toggle('hidden');
  waBanner.classList.toggle('blur');
  mainSvg.classList.toggle('blur');
}

function onPlayerReady() {
  players[currentLabelId].playVideo();
  if(!dorawa.getAttribute('listener')) {
    dorawa.addEventListener('click', () => {
      toggleStreamModal();
      streams.forEach(stream => {
        if (!stream.classList.contains('hidden')) {
          stream.classList.add('hidden');
        }
      });
      try {
        players[currentLabelId].pauseVideo();
      } catch (error) {
        console.log(players[currentLabelId]);
        console.error(error);
      }
    }
    )
  }
  dorawa.setAttribute('listener', true);
}

dorawa.addEventListener('click', () => {
  if(!dorawa.getAttribute('listener')) {
    toggleStreamModal();
  }
})

returnTarget.addEventListener('click', () => {
  toggleStreamModal();
  streams.forEach(stream => {
    if (!stream.classList.contains('hidden')) {
      stream.classList.add('hidden');
    }
  });
})

function handleParkGroupClick(e) {
  currentId = e.target.id.match(regexGetIdNumber)[0];
  if (Number(currentId) >= 0 && Number(currentId) <= players.length - 1) {
    toggleStreamModal();
    currentLabelId = e.target.id.match(regexGetIdNumber)[0];
  if(streams[currentLabelId].classList.contains('hidden')) {
    streams[currentLabelId].classList.remove('hidden');
  }
  if (localPlayerInitCount[currentLabelId] === 0) {
    players[currentLabelId] = new YT.Player(`stream${currentLabelId}`, {
      events: {
        'onReady': onPlayerReady,
      }
    })
  }
  if (localPlayerInitCount[currentLabelId] > 0) {
    players[currentLabelId].playVideo();
  }
  localPlayerInitCount[currentLabelId] += 1;
  console.log(localPlayerInitCount);
  }
}

function addParkGroupClickListener() {
  parkGroups.forEach(parkGroup => parkGroup.addEventListener('click', handleParkGroupClick))
}
addParkGroupClickListener();
transitionColors();