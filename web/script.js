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

function toggleHiddenParkLabels() {
  switch (currentId) {
    case '0':
      parkLabels[0].classList.toggle('hidden');
      break
    case '1':
      parkLabels[12].classList.toggle('hidden');
      break
    case '2':
      parkLabels[10].classList.toggle('hidden');
      break
    case '3':
      parkLabels[15].classList.toggle('hidden');
      break
    case '4':
      parkLabels[3].classList.toggle('hidden');
      break
    case '5':
      parkLabels[2].classList.toggle('hidden');
      parkLabels[5].classList.toggle('hidden');
      break
    case '6':
      parkLabels[13].classList.toggle('hidden');
      parkLabels[14].classList.toggle('hidden');
      break
    case '7':
      parkLabels[16].classList.toggle('hidden');
      break
    case '8':
      parkLabels[1].classList.toggle('hidden');
      break
    case '9':
      parkLabels[6].classList.toggle('hidden');
      parkLabels[7].classList.toggle('hidden');
      parkLabels[9].classList.toggle('hidden');
      break
    case '10':
      parkLabels[11].classList.toggle('hidden');
      break
    case '11':
      parkLabels[8].classList.toggle('hidden');
      break
    case '12':
      parkLabels[4].classList.toggle('hidden');
      break
    default:
      console.error('Invalid currentId value.')
  }
}
function toggleStreamModal() {
  streamModal.classList.toggle('hidden');
  waBanner.classList.toggle('blur');
  mainSvg.classList.toggle('blur');
  toggleHiddenParkLabels();
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


function handleParkGroupClick() {
  parkGroups.forEach(parkGroup => parkGroup.addEventListener('click', (e) => {
    currentId = e.target.id.match(regexGetIdNumber)[0];
      if (Number(currentId) >= 0 && Number(currentId) <= 16) {
        toggleStreamModal();
      }
  }))
}
function handleParkLabelClick() {
  parkLabels.forEach(parkLabel => parkLabel.addEventListener('click', (e) => {
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
  }))
}

handleParkGroupClick();
handleParkLabelClick();