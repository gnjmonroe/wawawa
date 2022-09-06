// get html elements
const parks = Array.prototype.slice.call(
  document.getElementsByClassName("park"),
);
const sunStatuses = Array.prototype.slice.call(
  document.getElementsByClassName("sun-status"),
);
const localTimes = Array.prototype.slice.call(
  document.getElementsByClassName("local-time"),
);
const parkCoords = parks.map((park) => [park.dataset.lat, park.dataset.lng]);

// get data from geonames API
async function callApi(promiseArray: any) {
  for (let i = 0; i < parkCoords.length; i += 1) {
    const response = await fetch(
      `http://api.geonames.org/timezoneJSON?lat=${parkCoords[i][0]}&lng=${parkCoords[i][1]}&username=gnjmonroe`,
    );
    const jsonForm = await response.json();
    promiseArray.push(jsonForm);
  }
  return Promise.all(promiseArray);
}

function splitTimeString(timeString: string) {
  const timeStringH = timeString.match(/^(\d+)/g)?.[0];
  const timeStringM = timeString.match(/(\d+)$/g)?.[0];
  return [timeStringH, timeStringM];
}

function compareTimeStrings(timeString0: string, timeString1: string) {
  const [timeStringH0, timeStringM0] = splitTimeString(timeString0);
  const [timeStringH1, timeStringM1] = splitTimeString(timeString1);
  let hoursDiff = Number(timeStringH1) - Number(timeStringH0);
  let minutesDiff = Number(timeStringM1) - Number(timeStringM0);
  if (minutesDiff < 0) {
    hoursDiff -= 1;
    minutesDiff += 60;
  }
  return 60 * hoursDiff + minutesDiff;
}

function determineSunStatus(localTime: string, sunriseTime: string, sunsetTime: string) {
  if (
    compareTimeStrings(sunriseTime, localTime) > 60
    && compareTimeStrings(localTime, sunsetTime) > 60
  ) {
    return "up";
  }
  if (
    compareTimeStrings(sunriseTime, localTime) < 0
    || compareTimeStrings(localTime, sunsetTime) < 0
  ) {
    return "down";
  }
  if (
    (compareTimeStrings(sunriseTime, localTime) >= 0
      && compareTimeStrings(sunriseTime, localTime) <= 60)
    || (compareTimeStrings(localTime, sunsetTime) >= 0
      && compareTimeStrings(localTime, sunsetTime) <= 60)
  ) {
    return "golden";
  }
  return "else";
}

function setSunRayX(
  sunRayName: SVGLineElement,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  sunIconSvg: SVGElement,
) {
  sunRayName.setAttribute("x1", `${x1}`);
  sunRayName.setAttribute("y1", `${y1}`);
  sunRayName.setAttribute("x2", `${x2}`);
  sunRayName.setAttribute("y2", `${y2}`);
  sunIconSvg.appendChild(sunRayName);
}

function logTimeSunriseSunset(apiData: any[]) {
  for (let i = 0; i < apiData.length; i += 1) {
    const localTimeString: string = localTimes[i].textContent;
    const sunriseString: string = apiData[i].sunrise.match(/\d+:\d+$/g)[0];
    const sunsetString: string = apiData[i].sunset.match(/\d+:\d+$/g)[0];
    const sunStatus = determineSunStatus(
      localTimeString,
      sunriseString,
      sunsetString,
    );
    if (sunStatus === "up") {
      const sunIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      sunIcon.setAttribute("width", "16");
      sunIcon.setAttribute("height", "16");
      sunIcon.setAttribute("viewbox", "0 0 16 16");
      sunIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      sunIcon.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      const sunCircle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      const sunRay0 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      const sunRay1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      const sunRay2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      const sunRay3 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      const sunRay4 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      const sunRay5 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      const sunRay6 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      const sunRay7 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      sunCircle.setAttribute("cx", "8");
      sunCircle.setAttribute("cy", "8");
      sunCircle.setAttribute("r", "4.5");
      sunIcon.appendChild(sunCircle);
      setSunRayX(sunRay0, 13.7, 13.7, 12.2, 12.2, sunIcon);
      setSunRayX(sunRay1, 3.8, 3.8, 2.3, 2.3, sunIcon);
      setSunRayX(sunRay2, 16, 8, 14, 8, sunIcon);
      setSunRayX(sunRay3, 2, 8, 0, 8, sunIcon);
      setSunRayX(sunRay4, 13.7, 2.3, 12.2, 3.8, sunIcon);
      setSunRayX(sunRay5, 3.8, 12.2, 2.3, 13.7, sunIcon);
      setSunRayX(sunRay6, 8, 0, 8, 2, sunIcon);
      setSunRayX(sunRay7, 8, 14, 8, 16, sunIcon);
      sunStatuses[i].classList.add("sun-up");
      sunStatuses[i].textContent = "";
      sunStatuses[i].appendChild(sunIcon);
    } else if (sunStatus === "down") {
      sunStatuses[i].classList.add("sun-down");
      sunStatuses[i].textContent = "";
      const moonIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      moonIcon.setAttribute("width", "12");
      moonIcon.setAttribute("height", "12");
      moonIcon.setAttribute("viewbox", "0 0 12 12");
      moonIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      moonIcon.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      const moonPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      moonPath.setAttribute(
        "d",
        "M9.3,9.1C6,9.1,3.2,6.4,3.2,3c0-1.1,0.3-2.1,0.8-3C1.7,0.9,0.1,3.2,0.1,5.8c0,3.4,2.8,6.2,6.2,6.2c2.4,0,4.6-1.4,5.6-3.5C11.1,8.9,10.3,9.1,9.3,9.1z",
      );
      moonIcon.appendChild(moonPath);
      sunStatuses[i].appendChild(moonIcon);
    } else if (sunStatus === "golden") {
      sunStatuses[i].classList.add("sun-golden");
      sunStatuses[i].textContent = "Golden Hour";
    }
  }
}

async function getApiData() {
  const promiseArray: any = [];
  const apiData: any = await callApi(promiseArray);
  logTimeSunriseSunset(apiData); // do sun-status stuff here
}

// converts from str to num (assumes single-digit offsets)
function utcOffsetToNumber(utcString: string) {
  if (utcString[0] === "-") {
    return Number(utcString[1]) * -1;
  }
  return Number(utcString[1]);
}

function calcHoursForDst(hourNum: number, dst: string) {
  const dstAdjustedHourNum = dst === "true" ? hourNum + 1 : hourNum;
  if (dstAdjustedHourNum < 0) return 24 + dstAdjustedHourNum;
  return dstAdjustedHourNum;
}

// adds leading zeros where needed
function formatMinutes(minuteNum: number) {
  if (minuteNum === 0) return "00";
  if (minuteNum > 0 && minuteNum < 10) return `0${minuteNum}`;
  return minuteNum;
}

function setLocalTime() {
  const gmt = new Date();
  parks.forEach((park, i) => {
    const utcOffset = utcOffsetToNumber(park.dataset.utc);
    const hour = calcHoursForDst(
      gmt.getUTCHours() + utcOffset,
      park.dataset.dst,
    );
    const minute = formatMinutes(gmt.getUTCMinutes());
    const timeString = `${hour}:${minute}`;
    localTimes[i].textContent = timeString;
  });
}

setLocalTime();
getApiData();
