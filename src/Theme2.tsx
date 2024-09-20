import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import Triangle from './Triangle';
import LogoEPL from './LogoEPL';

import './App.css';
import { randomNumber, standardTime } from './time';

const ranNum = randomNumber(1, 5);

function Theme2() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = dayjs().diff(dayjs(standardTime), 'second');
      setTime(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const min =
    Math.floor(time / 60) > 9
      ? Math.floor(time / 60)
      : `0${Math.floor(time / 60)}`;
  const sec = time % 60 > 9 ? time % 60 : `0${time % 60}`;

  return (
    <div
      style={{
        marginTop: 32,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          height: 80,
        }}
      >
        <div
          style={{
            marginRight: '-40px',
            display: 'flex',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 220,
              height: '100%',
              background: '#DD2121',
              fontWeight: 700,
              fontFamily: 'Paperlogy',
              fontSize: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            맨유
          </div>
          <Triangle />
        </div>
        <div
          style={{
            background: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 260,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 136,
              fontWeight: 900,
              position: 'relative',
              gap: 12,
              zIndex: 3,
            }}
          >
            <div
              style={{
                textAlign: 'right',
                position: 'relative',
                top: -8,
                width: 100,
              }}
            >
              {ranNum}
            </div>
            <LogoEPL />
            <div
              style={{
                textAlign: 'left',
                position: 'relative',
                top: -8,
                width: 100,
              }}
            >
              0
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', position: 'relative' }}>
          <div
            style={{
              height: '100%',
              left: '0px',
              position: 'absolute',
            }}
          >
            <Triangle fill='#3867A9' />
          </div>
          <div
            style={{
              width: 260,
              height: '100%',
              background: '#87B3E2',
              fontWeight: 700,
              fontFamily: 'Paperlogy',
              fontSize: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0B223A',
            }}
          >
            맨시티
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: 220,
          marginRight: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 64,
            background: '#421041',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          {min}:{sec}
        </div>
      </div>
    </div>
  );
}

function Theme2Type() {
  return (
    <>
      <Theme2 />
    </>
  );
}

export default Theme2Type;
