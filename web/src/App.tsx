/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import './scss/main.scss';
import StreamModal from './components/StreamModal';
import Wa from './components/Wa';
import Park from './components/Park';
import ToDomansa from './components/ToDomansa';

function App(this: any) {
  const [currentId, setCurrentId] = useState(0);
  const [streamOpen, setStreamOpen] = useState(false);

  return (
    <div className="App">
      <StreamModal
        currentId={currentId}
        streamOpen={streamOpen}
        setStreamOpen={setStreamOpen}
      />
      <main>
        <Wa />
        <Park
          parkGroup={0}
          utc={-5}
          dst
          lat="40.7128"
          lng="-74.0060"
          parkName="Times Square"
          parkCity="New York"
          parkCountry="United States"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={1}
          utc={-9}
          dst
          lat="58.6887"
          lng="-156.6628"
          parkName="Katmai National Park"
          parkCity="King Salmon"
          parkCountry="United States"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={2}
          utc={-8}
          dst
          lat="33.9850"
          lng="-118.4695"
          parkName="Venice Beach"
          parkCity="Los Angeles"
          parkCountry="California"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={3}
          utc={-3}
          dst={false}
          lat="-23.5558"
          lng="-46.6396"
          parkName="Canal do Porto de Santos"
          parkCity="Sao Paulo"
          parkCountry="Brazil"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={4}
          utc={2}
          dst={false}
          lat="-33.9249"
          lng="18.4241"
          parkName="Clifton 4th Beach"
          parkCity="Cape Town"
          parkCountry="South Africa"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={5}
          utc={2}
          dst={false}
          lat="-24.2058"
          lng="30.8620"
          parkName={"Rosie's Pan"}
          parkCity="Balule Nature Reserve"
          parkCountry="South Africa"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={6}
          utc={7}
          dst={false}
          lat="9.7116"
          lng="99.9850"
          parkName="Thong Sala"
          parkCity="Koh Phangan"
          parkCountry="Thailand"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={7}
          utc={7}
          dst={false}
          lat="9.6792"
          lng="100.0684"
          parkName="House of Sanskara"
          parkCity="Haad Rin"
          parkCountry="Thailand"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={8}
          utc={8}
          dst={false}
          lat="23.1262"
          lng="121.3656"
          parkName="Sanxiantai"
          parkCity="Chenggong"
          parkCountry="Taiwan"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={9}
          utc={8}
          dst={false}
          lat="24.9554"
          lng="121.2300"
          parkName="Daxi Old Street"
          parkCity="Taoyuan"
          parkCountry="Taiwan"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={10}
          utc={9}
          dst={false}
          lat="37.5665"
          lng="126.9780"
          parkName="Han River"
          parkCity="Seoul"
          parkCountry="South Korea"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={11}
          utc={9}
          dst={false}
          lat="35.6812"
          lng="139.7671"
          parkName="Tokyo Station"
          parkCity="Tokyo"
          parkCountry="Japan"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={12}
          utc={1}
          dst
          lat="52.6186"
          lng="4.6302"
          parkName="Pompplein"
          parkCity="Egmond aan Zee"
          parkCountry="Netherlands"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={13}
          utc={1}
          dst
          lat="52.3731"
          lng="4.8926"
          parkName="Dam Square"
          parkCity="Amsterdam"
          parkCountry="Netherlands"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={14}
          utc={1}
          dst
          lat="40.8846"
          lng="0.8055"
          parkName={"L'Ametlla de Mar"}
          parkCity="Alguer Beach"
          parkCountry="Spain"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={15}
          utc={2}
          dst={false}
          lat="50.0915"
          lng="13.1629"
          parkName="Velke Namesti"
          parkCity="Kromeriz"
          parkCountry="Czech Republic"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={16}
          utc={2}
          dst={false}
          lat="47.3133"
          lng="11.8678"
          parkName="Alpen-gasthof Tannen-alm"
          parkCity="Zillertal"
          parkCountry="Austria"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={17}
          utc={2}
          dst={false}
          lat="46.0160"
          lng="9.2572"
          parkName="Lake Como"
          parkCity="Menaggio"
          parkCountry="Italy"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={18}
          utc={2}
          dst={false}
          lat="45.4408"
          lng="12.3155"
          parkName="Ponte delle Guglie"
          parkCity="Venice"
          parkCountry="Italy"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={19}
          utc={2}
          dst={false}
          lat="41.9009"
          lng="12.4833"
          parkName="Fontana di Trevi"
          parkCity="Rome"
          parkCountry="Italy"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <Park
          parkGroup={20}
          utc={2}
          dst={false}
          lat="47.5603"
          lng="7.5914"
          parkName="Rhine River"
          parkCity="Basel"
          parkCountry="Switzerland"
          setCurrentId={setCurrentId}
          streamOpen={streamOpen}
          setStreamOpen={setStreamOpen}
        />
        <ToDomansa />
      </main>
    </div>
  );
}

export default App;
