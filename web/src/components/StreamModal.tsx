import React, { useEffect, useRef } from 'react';

export default function StreamModal(props: {
  currentId: number,
  streamOpen: boolean,
  setStreamOpen: any,
}) {
  const {
    currentId,
    streamOpen,
    setStreamOpen,
  } = props;

  const streams: HTMLIFrameElement[] = Array.prototype.slice.call(
    document.getElementsByClassName('stream'),
  );
  const streamModal: HTMLElement | null = document.getElementById('streamModal');
  const dorawa: HTMLElement | null = document.getElementById('dorawa');

  // set up YouTube embed API script
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

  // set up counter and arrays for YouTube API interactivity
  const players: any = useRef([ // array of 0's for players.length
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const localPlayerInitCount = useRef([ // array of 0's for players.length
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  function toggleStreamModal() {
    streamModal?.classList.toggle('hidden');
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = 'visible';
    } else if ((document.body.style.overflow === 'visible')) {
      document.body.style.overflow = 'hidden';
    }
  }

  function onPlayerReady() {
    // plays stream of clicked parkgroup
    players.current[currentId].playVideo();

    // if dorawa not initialized, add event listener
    if (!dorawa?.getAttribute('listener')) dorawa?.setAttribute('listener', 'true');
  }

  useEffect(() => {
    if (streams.length > 0 && streamOpen) {
      toggleStreamModal(); // turn on/off stream modal visibility

      // if the click target's stream is hidden, unhide it
      // not using toggle because it caused issues with other streams
      // sometimes unintentionally becoming visible
      if (streams[currentId].classList.contains('hidden')) {
        streams[currentId].classList.remove('hidden');
      }

      // if stream is unopened, use YouTube API to init stream
      // else, just play the stream
      if (localPlayerInitCount.current[currentId] === 0) {
        // @ts-ignore
        players.current[currentId] = new YT.Player(`stream${currentId}`, {
          events: {
            onReady: onPlayerReady,
          },
        });
        localPlayerInitCount.current[currentId] += 1;
      } else {
        players.current[currentId].playVideo();
      }
    }
  }, [currentId, streamOpen]);

  function handleDorawaClick(e: any) {
    if (e?.code && (e?.code !== 'Space' && e?.code !== 'Escape' && e?.code !== 'Enter')) return;
    if (dorawa?.getAttribute('listener')) {
      players.current[currentId].pauseVideo();
      // toggle streamModal off
      toggleStreamModal();

      // turn all streams off
      streams.forEach((stream: any) => {
        if (!stream.classList.contains('hidden')) {
          stream.classList.add('hidden');
        }
      });
      setStreamOpen(false);
    }
  }

  return (
    <div className="stream-modal hidden" id="streamModal">
      <div role="button" className="back-button" id="dorawa" onClick={handleDorawaClick} onKeyDown={handleDorawaClick} tabIndex={0}>
        <svg className="bg-svg" width="240" height="135" viewBox="0 0 240 135" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <path className="bg-path" d="M100,0 L60,40 L60,120 L140,120 L180,80 L180,0z" />
        </svg>
        <svg
          className="logotype"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 64.54 57.24"
          xmlSpace="preserve"
        >
          <path
            className="logotype-path"
            d="M62.73,53.5
          c0.98,0,1.47-0.5,1.47-1.51v-4.97c0-1.01-0.49-1.51-1.47-1.51h-6.65c-0.98,0-1.47,0.5-1.47,1.51v4.97c0,1.01,0.49,1.51,1.47,1.51
          H62.73z M63.33,41.76l1.21-19.08V0.58H54.6v22.1l1.3,19.08H63.33z M10.71,12.46c0-1.77,0.56-3.02,1.68-3.74s2.26-1.08,3.41-1.08
          c0.57,0,1.15,0.08,1.73,0.25c0.58,0.17,1.11,0.44,1.6,0.83c0.49,0.38,0.89,0.89,1.21,1.51c0.32,0.62,0.48,1.37,0.48,2.23v15.77
          c0,1.78-0.55,3.04-1.64,3.78c-1.09,0.74-2.22,1.12-3.37,1.12c-1.15,0-2.29-0.37-3.41-1.12c-1.12-0.74-1.68-2-1.68-3.78V12.46z
          M0.69,28.22c0,3.12,0.92,5.7,2.77,7.74c1.84,2.04,4.26,3.45,7.26,4.21v9.22H0v7.85h34.3c3.11,0,5.46-0.62,7.04-1.87
          c1.58-1.25,2.38-3.31,2.38-6.19V30.46h5.1v-7.85h-5.1V0.36h-9.85v46.73c0,1.54-0.72,2.3-2.16,2.3H20.56v-9.14
          c3.05-0.72,5.53-2.11,7.43-4.18c1.9-2.06,2.85-4.68,2.85-7.85V12.46c0-1.92-0.39-3.66-1.17-5.22c-0.78-1.56-1.83-2.87-3.15-3.92
          c-1.33-1.05-2.91-1.87-4.75-2.45C19.93,0.29,17.94,0,15.81,0c-2.19,0-4.2,0.29-6.05,0.86C7.92,1.44,6.34,2.26,5.01,3.31
          C3.69,4.37,2.64,5.68,1.86,7.24c-0.78,1.56-1.17,3.3-1.17,5.22V28.22z"
          />
        </svg>
      </div>
      <iframe className="stream hidden" id="stream0" src="https://www.youtube.com/embed/1-iS7LArMPA?enablejsapi=1" title="YouTube video player - NYC, USA" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream1" src="https://www.youtube.com/embed/mphg2feuAPo?enablejsapi=1" title="YouTube video player - King Salmon, USA" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream2" src="https://www.youtube.com/embed/vvOjJoSEFM0?enablejsapi=1" title="YouTube video player - Los Angeles, USA" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream3" src="https://www.youtube.com/embed/N6390yh3Y_U?enablejsapi=1" title="YouTube video player - Sao Paulo, Brazil" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream4" src="https://www.youtube.com/embed/bvX0Kkv8xXw?enablejsapi=1" title="YouTube video player - Cape Town, South Africa" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream5" src="https://www.youtube.com/embed/TL0weAv8C9s?enablejsapi=1" title="YouTube video player - Limpopo, South Africa" frameBorder="0" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream6" src="https://www.youtube.com/embed/0EaQuajibHU?enablejsapi=1" title="YouTube video player - Koh Phangan, Thailand" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream7" src="https://www.youtube.com/embed/IACz47DhAtQ?enablejsapi=1" title="YouTube video player - Haad Rin, Thailand" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream8" src="https://www.youtube.com/embed/jFJ59-9tTyM?enablejsapi=1" title="YouTube video player - Chenggong, Taiwan" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream9" src="https://www.youtube.com/embed/z_mlibCfgFI?enablejsapi=1" title="YouTube video player - Taoyuan, Taiwan" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream10" src="https://www.youtube.com/embed/-JhoMGoAfFc?enablejsapi=1" title="YouTube video player - Seoul, South Korea" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream11" src="https://www.youtube.com/embed/qHJMkze8lPg?enablejsapi=1" title="YouTube video player - Tokyo, Japan" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream12" src="https://www.youtube.com/embed/IjSGWGt6xu8?enablejsapi=1" title="YouTube video player - Egmond aan Zee, Netherlands" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream13" src="https://www.youtube.com/embed/-5W4so8s0H8?enablejsapi=1" title="YouTube video player - Amsterdam, Netherlands" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream14" src="https://www.youtube.com/embed/W9DP0Je5rKU?enablejsapi=1" title="YouTube video player - Alguer Beach" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream15" src="https://www.youtube.com/embed/-mjQOL-Fnjk?enablejsapi=1" title="YouTube video player - Kromeriz, Czech Republic" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream16" src="https://www.youtube.com/embed/qwjt-gnItvg?enablejsapi=1" title="YouTube video player - Zillertal, Austria" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream17" src="https://www.youtube.com/embed/6JQyhhi41uk?enablejsapi=1" title="YouTube video player - Menaggio, Italy" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream18" src="https://www.youtube.com/embed/HpZAez2oYsA?enablejsapi=1" title="YouTube video player - Venice, Italy" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream19" src="https://www.youtube.com/embed/jXYQoWAKgFE?enablejsapi=1" title="YouTube video player - Rome, Italy" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      <iframe className="stream hidden" id="stream20" src="https://www.youtube.com/embed/jtLh8BdmHUU?enablejsapi=1" title="YouTube video player - Basel, Switzerland" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
    </div>
  );
}
