import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import Triangle from './Triangle';
import LogoEPL from './LogoEPL';

import './App.css';
import { colors, standardTime, teams } from './const';
import { BounceLoader } from 'react-spinners';

function Theme2() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (standardTime) {
      const interval = setInterval(() => {
        const diff = dayjs().diff(dayjs(standardTime), 'second');
        setTime(diff);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time]);

  const min =
    Math.floor(time / 60) > 9
      ? Math.floor(time / 60)
      : `0${Math.floor(time / 60)}`;
  const sec = time % 60 > 9 ? time % 60 : `0${time % 60}`;

  const [isGoal, setIsGoal] = useState(false);
  const [isRightGoal, setIsRightGoal] = useState(false);
  const [isVAR, setIsVAR] = useState(false);
  const [isExtraTime, setIsExtraTime] = useState(false);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [type, setType] = useState<'1st' | '2nd' | 'ot1' | 'ot2' | 'pk'>('1st');
  const [viewTimer, setViewTimer] = useState(true);
  const [specialBottom, setSpecialBottom] = useState('');
  const [specialTop, setSpecialTop] = useState('');

  function onGoal() {
    setIsGoal(true);

    setTimeout(() => {
      if (type === '1st' || type === 'ot1') {
        setHomeScore(homeScore + 1);
      } else {
        setAwayScore(awayScore + 1);
      }
    }, 3000);

    setTimeout(() => {
      setIsGoal(false);
    }, 6000);
  }

  function onRightGoal() {
    setIsRightGoal(true);

    setTimeout(() => {
      if (type === '1st' || type === 'ot1') {
        setAwayScore(awayScore + 1);
      } else {
        setHomeScore(homeScore + 1);
      }
    }, 3000);

    setTimeout(() => {
      setIsRightGoal(false);
    }, 6000);
  }

  function onVAR() {
    setIsVAR(!isVAR);
  }

  function onExtraTime() {
    setIsExtraTime(!isExtraTime);
  }

  function onTimer() {
    setViewTimer(!viewTimer);
  }

  const left = colors.home;
  const leftSub = colors.home_sub;
  const leftTextColor = colors.home_text;

  const right = colors.away;
  const rightSub = colors.away_sub;
  const rightTextColor = colors.away_text;

  const leftTeam = teams.home;
  const rightTeam = teams.away;

  const leftScore = homeScore;
  const rightScore = awayScore;

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
            opacity: specialTop && specialTop !== '' ? 1 : 0,
            justifyContent: 'center',
            marginRight: '20px',
            overflow: 'hidden',
            borderRadius: '8px 8px 0 0',
            zIndex: 1,
            transition: 'opacity 0.5s',
          }}
        >
          <div
            style={{
              height: '100%',
              minWidth: 400,
              padding: '4px 60px 12px',
              background: '#f8f8f8',
              display: 'flex',
              color: '#4a1253',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
              fontFamily: 'Tantan',
            }}
          >
            {specialTop && specialTop !== '' ? specialTop : '-'}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            height: 80,
            width: 'auto',
            background: isGoal ? leftSub : isRightGoal ? rightSub : '',
            position: 'relative',
            zIndex: 2,
            borderRadius: '8px 8px 0 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: '100%',
              position: 'absolute',
              top: 0,
              right: isGoal ? 40 : undefined,
              left: isRightGoal ? 40 : undefined,
              fontSize: 60,
              fontWeight: 900,
              fontFamily: 'Pretendard',
            }}
            className={isGoal || isRightGoal ? 'typoGoal' : ''}
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
            className={isRightGoal ? 'opacity' : ''}
          >
            <div
              style={{
                width: 300,
                height: '100%',
                background: left,
                fontWeight: 700,
                fontFamily: 'Tantan',
                fontSize: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: leftTextColor,
                borderRadius: '8px 0 0 0',
              }}
            >
              {leftTeam}
            </div>
            <div
              style={{
                height: '100%',
                left: 300,
                position: 'absolute',
              }}
            >
              <Triangle fill={left} />
            </div>
            <div
              style={{
                width: 180,
                background: leftSub,
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 260,
              fontFamily: 'Pretendard',
              position: 'absolute',
              height: 80,
              left: 'calc(50% - 130px)',
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
                zIndex: 10,
              }}
              className={isGoal || isRightGoal ? 'opacity' : ''}
            >
              <div
                style={{
                  textAlign: 'right',
                  position: 'relative',
                  top: -12,
                  width: 100,
                  textShadow: '0 0 45px rgba(0, 0, 0, 0.5)',
                }}
              >
                {leftScore}
              </div>
              <LogoEPL />
              <div
                style={{
                  textAlign: 'left',
                  position: 'relative',
                  top: -12,
                  width: 100,
                  textShadow: '0 0 45px rgba(0, 0, 0, 0.5)',
                }}
              >
                {rightScore}
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
                width: 220,
                background: rightSub,
              }}
            />
            <div
              style={{
                height: '100%',
                right: 300,
                transform: 'rotate(180deg)',
                position: 'absolute',
              }}
            >
              <Triangle fill={right} />
            </div>
            <div
              style={{
                width: 300,
                height: '100%',
                background: right,
                fontWeight: 700,
                fontFamily: 'Tantan',
                fontSize: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: rightTextColor,
                borderRadius: '0 8px 0 0',
              }}
            >
              {rightTeam}
            </div>
          </div>
        </div>
        {specialBottom && specialBottom !== '' ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginRight: '20px',
              height: 56,
              overflow: 'hidden',
              borderRadius: isExtraTime ? '' : '0 0 8px 8px',
              zIndex: 1,
            }}
            className='extratime'
          >
            <div
              style={{
                height: '100%',
                padding: '0 60px',
                background: '#4b2257',
                display: 'flex',
                color: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 700,
                fontFamily: 'Tantan',
              }}
            >
              {specialBottom}
            </div>
          </div>
        ) : null}
        <div
          style={{
            display: viewTimer ? 'flex' : 'none',
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
              fontSize: 36,
              fontWeight: 700,
              fontFamily: 'Tantan',
            }}
          >
            {standardTime ? `${min}:${sec}` : '경기전'}
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
      <br />
      <button onClick={onGoal}>{leftTeam} 골</button>
      <button onClick={onRightGoal}>{rightTeam} 골</button>
      <button onClick={onVAR}>VAR</button>
      <button onClick={onExtraTime}>추가시간</button>
      <button onClick={() => setType('1st')}>1st</button>
      <button onClick={() => setType('2nd')}>2nd</button>
      <button onClick={onTimer}>타이머</button>
      <br />
      상단 스페셜 메세지 (ex. 손흥민 선발 출전)
      <input
        type='text'
        onKeyDown={(e) =>
          e.key === 'Enter' && setSpecialTop(e.currentTarget.value)
        }
      />
      <br />
      하단 스페셜 메세지 (ex. 전반전 종료)
      <input
        type='text'
        onKeyDown={(e) =>
          e.key === 'Enter' && setSpecialBottom(e.currentTarget.value)
        }
      />
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
