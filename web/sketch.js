const timeTest = document.getElementById('time-test');
const parks = Array.prototype.slice.call(document.getElementsByClassName('park'));
const workingDate = new Date();

const sunStatuses = parks.map(park => park.children[0].children[0].children[0]);
const localTimes = parks.map(park => park.children[0].children[0].children[1]);

const parkCoords = parks.map(park => [
  park.dataset.lat,
  park.dataset.lng
])

// get data from geonames API
async function callApi(promiseArray) {
  for (let i=0; i<parkCoords.length; i++) {
    const response = await fetch(`http://api.geonames.org/timezoneJSON?lat=${parkCoords[i][0]}&lng=${parkCoords[i][1]}&username=gnjmonroe`);
    const jsonForm = await response.json();
    promiseArray.push(jsonForm);
  }
  return await Promise.all(promiseArray);
}
function splitTimeString(timeString) {
  const timeStringH = timeString.match(/^(\d+)/g)[0]
  const timeStringM = timeString.match(/(\d+)$/g)[0]
  return [timeStringH, timeStringM]
}
function compareTimeStrings (timeString0, timeString1) {
  const [timeStringH0, timeStringM0] = splitTimeString(timeString0);
  const [timeStringH1, timeStringM1] = splitTimeString(timeString1);
  let hoursDiff = Number(timeStringH1) - Number(timeStringH0);
  let minutesDiff = Number(timeStringM1) - Number(timeStringM0);
  if (minutesDiff < 0) {
    hoursDiff -= 1;
    minutesDiff += 60;
  }
  return (60 * hoursDiff + minutesDiff);
}
function determineSunStatus (localTime, sunriseTime, sunsetTime) {
  if (compareTimeStrings(sunriseTime, localTime) > 60 && compareTimeStrings(localTime, sunsetTime) > 60) {
    return 'up'
  }
  if (compareTimeStrings(sunriseTime, localTime) < 0 || compareTimeStrings(localTime, sunsetTime) < 0) {
    return 'down'
  }
  if ((compareTimeStrings(sunriseTime, localTime) >= 0 && compareTimeStrings(sunriseTime, localTime) <= 60) || (compareTimeStrings(localTime, sunsetTime) >= 0 && compareTimeStrings(localTime, sunsetTime) <= 60)) {
    return 'golden'
  }
  return 'else'
}
function logTimeSunriseSunset(apiData) {
  for (let i=0; i<apiData.length; i++) {
    const localTimeString = localTimes[i].textContent;
    const sunriseString = apiData[i].sunrise.match(/\d+:\d+$/g)[0];
    const sunsetString = apiData[i].sunset.match(/\d+:\d+$/g)[0];
    const sunStatus = determineSunStatus(localTimeString, sunriseString, sunsetString);
    if (sunStatus === 'up') {
      sunStatuses[i].classList.add('sun-up');
      sunStatuses[i].textContent = '↑'
    } else if (sunStatus === 'down') {
      sunStatuses[i].classList.add('sun-down');
      sunStatuses[i].textContent = '↓'
    } else if (sunStatus === 'golden') {
      sunStatuses[i].classList.add('sun-golden');
      sunStatuses[i].textContent = 'Golden Hour'
    }
  }
}
async function getApiData() {
  // call API
  let promiseArray = [];
  console.log("awaiting");
  const apiData = await callApi(promiseArray);
  console.log(apiData);
  console.log('awaited');
  // do sun-status stuff here
  logTimeSunriseSunset(apiData);
}

// format local-time span
function utcToNumber(utcString) {
  if (utcString[0] === '-') {
    return Number(utcString[1]) * -1;
  } else {
    return Number(utcString[1]);
  }
}
function calcHours(hourNum, dst) {
  const dstAdjustedHourNum = dst === "true" ? hourNum + 1 : hourNum
  if (dstAdjustedHourNum < 0) return 24 + dstAdjustedHourNum;
  return dstAdjustedHourNum;
}
function formatMinutes(minuteNum) {
  if (minuteNum === 0) return '00';
  if (minuteNum > 0 && minuteNum < 10) return `0${minuteNum}`
  return minuteNum;
}
function setLocalTime() {
  const gmt = new Date()
  parks.forEach((park,i) => {
    const utc = utcToNumber(park.dataset.utc);
    const hour = calcHours(gmt.getUTCHours() + utc, park.dataset.dst);
    const minute = formatMinutes(gmt.getUTCMinutes());
    const timeString = `${hour}:${minute}`
    localTimes[i].textContent = timeString;
  })
}

setLocalTime();
getApiData();