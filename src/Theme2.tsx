import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import Triangle from './Triangle';
import LogoEPL from './LogoEPL';

import './App.css';
import { randomNumber, standardTime } from './time';
import { BounceLoader } from 'react-spinners';

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

  const [isGoal, setIsGoal] = useState(false);
  const [isVAR, setIsVAR] = useState(false);
  const [isExtraTime, setIsExtraTime] = useState(false);
  const [homeScore, setHomeScore] = useState(ranNum);

  function onGoal() {
    setIsGoal(true);

    setTimeout(() => {
      setHomeScore(homeScore + 1);
    }, 3000);

    setTimeout(() => {
      setIsGoal(false);
    }, 6000);
  }

  function onVAR() {
    setIsVAR(!isVAR);
  }

  function onExtraTime() {
    setIsExtraTime(!isExtraTime);
  }

  return (
    <div>
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
            width: 'auto',
            background: 'black',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
              height: '100%',
              position: 'absolute',
              right: 60,
              top: 0,
              fontSize: 60,
              fontWeight: 900,
              fontFamily: 'Pretendard',
            }}
            className={isGoal ? 'typoGoal' : ''}
          >
            GOAL
          </div>
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
              className={isGoal ? 'opacity' : ''}
            >
              <div
                style={{
                  textAlign: 'right',
                  position: 'relative',
                  top: -8,
                  width: 100,
                }}
              >
                {homeScore}
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
          <div
            style={{
              display: 'flex',
              position: 'relative',
            }}
            className={isGoal ? 'opacity' : ''}
          >
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
            marginRight: '20px',
            height: 64,
            overflow: 'hidden',
            borderRadius: isExtraTime ? '' : '0 0 8px 8px',
            zIndex: 2,
          }}
        >
          <div
            style={{
              height: '100%',
              width: 220,
              background: '#421041',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 700,
              fontFamily: 'Chivo Mono',
            }}
          >
            {min}:{sec}
          </div>
          {isVAR ? (
            <div
              className='var'
              style={{
                height: '100%',
                background: '#91288f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                fontWeight: 700,
                fontFamily: 'Pretendard',
                gap: 12,
              }}
            >
              <BounceLoader size={20} />
              <div
                style={{
                  marginRight: 4,
                }}
              >
                VAR
              </div>
            </div>
          ) : null}
        </div>
        {isExtraTime ? (
          <div
            className='extratime'
            style={{
              marginRight: '20px',
              width: 180,
              height: '100%',
              background: 'linear-gradient(90deg, #e53617 0%, #961aaf 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 700,
              borderRadius: '0 0 8px 8px',
              fontFamily: 'Chivo Mono',
              padding: '0 20px',
              zIndex: 1,
            }}
          >
            +5
          </div>
        ) : null}
      </div>
      <button onClick={onGoal}>골</button>
      <button onClick={onVAR}>VAR</button>
      <button onClick={onExtraTime}>추가시간</button>
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
