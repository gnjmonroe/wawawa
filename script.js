const parks = Array.prototype.slice.call(document.getElementsByClassName('park'));
const streams = Array.prototype.slice.call(document.getElementsByClassName('stream'));
const streamModal = document.getElementById('streamModal');
const returnTarget = document.getElementById('return');

function handleParkClick() {
  parks.forEach(park => park.addEventListener('click', e => {
    console.log(park.classList);
    streamModal.classList.toggle('hidden');
    streams[park.id.substring(4)].classList.toggle('hidden')
  }))
}

handleParkClick();

returnTarget.addEventListener('click', e => {
  streamModal.classList.toggle('hidden');
  streams.forEach(stream => stream.className = 'stream hidden')
})