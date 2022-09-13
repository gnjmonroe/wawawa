import React from 'react';

export default function ParkSvg(props: { parkGroup: number }) {
  const { parkGroup } = props;

  return (
    <svg className="bg-svg" width="240" height="135" viewBox="0 0 240 135" data-park-group={parkGroup} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <pattern id={`bg-pattern-${parkGroup}`} patternUnits="userSpaceOnUse" x="0" y="0" width="240" height="135">
          <image href={`assets/park-${parkGroup}.png`} x="0" y="0" width="240" height="135" />
        </pattern>
      </defs>
      <path className="bg-path" data-park-group={parkGroup} d="M100,0 L60,40 L60,120 L140,120 L180,80 L180,0z" />
    </svg>
  );
}
