"use strict";
var _a;
// const htmlEl = document.getElementsByTagName("body");
const parkGroups = Array.prototype.slice.call(document.getElementsByClassName("park"));
const streams = Array.prototype.slice.call(document.getElementsByClassName("stream"));
const streamModal = document.getElementById("streamModal");
const dorawa = document.getElementById("dorawa");
let currentId;
const players = [...Array(streams.length)];
const localPlayerInitCount = new Array(players.length).fill(0);
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
(_a = firstScriptTag.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(tag, firstScriptTag);
function toggleStreamModal() {
    streamModal === null || streamModal === void 0 ? void 0 : streamModal.classList.toggle("hidden");
    if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "visible";
    }
    else if ((document.body.style.overflow === "visible")) {
        document.body.style.overflow = "hidden";
    }
}
function onPlayerReady() {
    players[currentId].playVideo();
    if (!(dorawa === null || dorawa === void 0 ? void 0 : dorawa.getAttribute("listener"))) {
        dorawa === null || dorawa === void 0 ? void 0 : dorawa.addEventListener("click", () => {
            toggleStreamModal();
            streams.forEach((stream) => {
                if (!stream.classList.contains("hidden")) {
                    stream.classList.add("hidden");
                }
            });
            players[currentId].pauseVideo();
        });
    }
    dorawa === null || dorawa === void 0 ? void 0 : dorawa.setAttribute("listener", "true");
}
function handleParkGroupClick(e) {
    var _a, _b;
    currentId = Number((_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.parkGroup);
    toggleStreamModal();
    if (streams[currentId].classList.contains("hidden")) {
        streams[currentId].classList.remove("hidden");
    }
    if (localPlayerInitCount[currentId] === 0) {
        // eslint-disable-next-line no-undef
        players[currentId] = new YT.Player(`stream${currentId}`, {
            events: {
                onReady: onPlayerReady,
            },
        });
    }
    if (localPlayerInitCount[currentId] > 0) {
        players[currentId].playVideo();
    }
    localPlayerInitCount[currentId] += 1;
}
dorawa === null || dorawa === void 0 ? void 0 : dorawa.addEventListener("click", () => {
    if (!(dorawa === null || dorawa === void 0 ? void 0 : dorawa.getAttribute("listener"))) {
        toggleStreamModal();
    }
});
parkGroups.forEach((parkGroup) => parkGroup.addEventListener("click", handleParkGroupClick));
