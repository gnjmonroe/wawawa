/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ParkSvg from './ParkSvg';

export default function Park(props: {
  parkGroup: number,
  utc: number,
  dst: boolean,
  lat: string,
  lng: string,
  parkName: string,
  parkCity: string,
  parkCountry: string,
  setCurrentId: any,
  streamOpen: boolean,
  setStreamOpen: any,
}) {
  const {
    parkGroup,
    utc,
    dst,
    lat,
    lng,
    parkName,
    parkCity,
    parkCountry,
    setCurrentId,
    streamOpen,
    setStreamOpen,
  } = props;

  // handle dst and utc into local time
  function formatHourString(hour: number, dstProp:boolean): string {
    const dstAdjustedHour = dstProp === true ? hour + 1 : hour;
    if (dstAdjustedHour < 0) return String(24 + dstAdjustedHour);
    return String(dstAdjustedHour);
  }
  function formatMinuteString(minute: number): string {
    if (minute === 0) return '00';
    if (minute > 0 && minute < 10) return `0${minute}`;
    return String(minute);
  }
  function calcLocalTime(utcProp: number, dstProp: boolean): string {
    const gmt = new Date();
    const hour = formatHourString(gmt.getUTCHours() + utcProp, dstProp);
    const minute = formatMinuteString(gmt.getUTCMinutes());
    const localTime = `${hour}:${minute}`;
    return localTime;
  }
  const formattedLocalTimeString = calcLocalTime(utc, dst);

  // handle utc classname
  function formatUtcClassName(utcProp: number) {
    return `badge utc utc-${String(utcProp)}`;
  }

  // handle utc
  function formatUtcString(utcProp: number): string {
    if (utcProp > 0) return `UTC+${utcProp}`;
    const absUtcProp = utcProp * -1;
    return `UTC-${absUtcProp}`;
  }
  const formattedUtcString = formatUtcString(utc);

  // handle lat and lng
  function formatLatString(inputProp: string) {
    if (inputProp[0] === '-') {
      return `${inputProp.substring(1)}°S`; // if -, °S
    }
    return `${inputProp}°N`; // if +, °N
  }
  function formatLngString(inputProp: string) {
    if (inputProp[0] === '-') return `${inputProp.substring(1)}°W`; // if -, °W
    return `${inputProp}°E`; // if +, °E
  }
  function formatCoordinateStrings(latInput: string, lngInput: string): string {
    const latString = formatLatString(latInput);
    const lngString = formatLngString(lngInput);
    return `${latString}, ${lngString}`;
  }
  const formattedCoordinateString = formatCoordinateStrings(lat, lng);

  function handleClick(e: any) {
    setCurrentId(e.target.dataset.parkGroup);
    if (streamOpen) setStreamOpen(false);
    if (!streamOpen) setStreamOpen(true);
  }

  return (
    <div className="park" data-park-group={parkGroup} onClick={handleClick}>
      <div className="rounded-outline" id={`outline-${parkGroup}`} data-park-group={parkGroup}>
        <ParkSvg parkGroup={parkGroup} data-park-group={parkGroup} />
        <div className="top-line" data-park-group={parkGroup}>
          <span className={formatUtcClassName(utc)} data-park-group={parkGroup}>
            {formattedUtcString}
          </span>
          <span className="badge local-time" data-park-group={parkGroup}>{formattedLocalTimeString}</span>
          <span className="sun-status" data-park-group={parkGroup} />
        </div>
        <div className="center-line" data-park-group={parkGroup}>
          <h2 data-park-group={parkGroup}>{parkName}</h2>
          <p data-park-group={parkGroup}>
            {parkCity}
            ,
            <br />
            {parkCountry}
          </p>
        </div>
        <div className="bottom-line" data-park-group={parkGroup}>
          <span className="badge coordinates" data-park-group={parkGroup}>{formattedCoordinateString}</span>
        </div>
      </div>
    </div>
  );
}
