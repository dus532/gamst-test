import { useEffect, useState } from 'react';
import BGArrow from './BGArrow';
import dayjs from 'dayjs';

import './App.css';
import { randomNumber, standardTime } from './time';

const ranNum = randomNumber(1, 5);

function Theme1() {
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
        display: 'flex',
        height: 64,
      }}
    >
      <div
        style={{
          background: 'white',
          width: 280,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 64,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Pretendard',
            fontSize: 46,
            fontWeight: 900,
            color: 'white',
            background: '#2A46E6',
            flex: '0 0 auto',
          }}
        >
          G
        </div>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            fontWeight: 500,
            fontSize: 40,
            color: 'black',
            letterSpacing: 0,
            fontFamily: 'Chivo Mono',
          }}
        >
          {min}:{sec}
        </div>
      </div>
      <div style={{ width: 32 }} />
      <div
        style={{
          height: '100%',
          width: 14,
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <div style={{ width: '100%', flex: 1, background: 'red' }} />
        <div
          style={{
            width: '100%',
            flex: 1,
            background: 'black',
          }}
        />
      </div>
      <div style={{ width: 4 }} />
      <div
        style={{
          display: 'flex',
          background: '#080958',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'relative',
          }}
        >
          <BGArrow />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-4px',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Paperlogy',
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            맨유
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: 160,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            fontSize: 36,
            fontWeight: 500,
            fontFamily: 'Chivo Mono',
          }}
        >
          <div style={{ width: 20 }}>{ranNum}</div>
          <div
            style={{
              width: 1,
              height: 28,
              background: 'rgba(255,255,255,0.1)',
            }}
          />
          <div style={{ width: 20 }}>0</div>
        </div>
        <div
          style={{
            display: 'flex',
            position: 'relative',
          }}
        >
          <div
            style={{
              transform: 'rotate(180deg)',
            }}
          >
            <BGArrow />
          </div>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 8,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Paperlogy',
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            맨시티
          </div>
        </div>
      </div>
      <div style={{ width: 4 }} />
      <div
        style={{
          height: '100%',
          width: 14,
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <div style={{ width: '100%', flex: 1, background: 'white' }} />
        <div
          style={{
            width: '100%',
            flex: 1,
            background: '#80A9DB',
          }}
        />
      </div>
    </div>
  );
}

function Theme1Type() {
  return (
    <>
      <Theme1 />
    </>
  );
}

export default Theme1Type;
