// const htmlEl = document.getElementsByTagName("body");
const parkGroups: HTMLDivElement[] = Array.prototype.slice.call(
  document.getElementsByClassName("park"),
);
const streams: HTMLIFrameElement[] = Array.prototype.slice.call(
  document.getElementsByClassName("stream"),
);
const streamModal: HTMLElement | null = document.getElementById("streamModal");
const dorawa: HTMLElement | null = document.getElementById("dorawa");

let currentId: number;
const players = [...Array(streams.length)];
const localPlayerInitCount = new Array(players.length).fill(0);

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

function toggleStreamModal() {
  streamModal?.classList.toggle("hidden");
  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "visible";
  } else if ((document.body.style.overflow === "visible")) {
    document.body.style.overflow = "hidden";
  }
}

function onPlayerReady() {
  players[currentId].playVideo();
  if (!dorawa?.getAttribute("listener")) {
    dorawa?.addEventListener("click", () => {
      toggleStreamModal();
      streams.forEach((stream) => {
        if (!stream.classList.contains("hidden")) {
          stream.classList.add("hidden");
        }
      });
      players[currentId].pauseVideo();
    });
  }
  dorawa?.setAttribute("listener", "true");
}

function handleParkGroupClick(e: Event) {
  currentId = Number((<HTMLElement>e.target)?.dataset?.parkGroup);
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

dorawa?.addEventListener("click", () => {
  if (!dorawa?.getAttribute("listener")) {
    toggleStreamModal();
  }
});

parkGroups.forEach((parkGroup) => parkGroup.addEventListener("click", handleParkGroupClick));
