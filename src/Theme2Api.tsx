import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import Triangle from './Triangle';
import LogoEPL from './LogoEPL';

import './App.css';
import { BounceLoader } from 'react-spinners';
import { useOverlayData } from './overlay';

function Theme2() {
  const [time, setTime] = useState(0);
  const data = useOverlayData();

  useEffect(() => {
    if (data?.standard_time) {
      const interval = setInterval(() => {
        const diff = dayjs().diff(dayjs(data?.standard_time), 'second');
        setTime(diff);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [data?.standard_time, time]);

  const min =
    Math.floor(time / 60) > 9
      ? Math.floor(time / 60)
      : `0${Math.floor(time / 60)}`;
  const sec = time % 60 > 9 ? time % 60 : `0${time % 60}`;

  const type = data?.time_type;
  const specialTop = data?.special_top;
  const specialBottom = data?.special_bottom;

  const colors = {
    home: data?.home_color,
    home_sub: data?.home_sub_color,
    home_text: data?.home_text_color,
    away: data?.away_color,
    away_sub: data?.away_sub_color,
    away_text: data?.away_text_color,
  };

  const teams = {
    home: data?.home_name,
    away: data?.away_name,
  };

  const left = type === '1st' || type === 'ot1' ? colors.home : colors.away;
  const leftSub =
    type === '1st' || type === 'ot1' ? colors.home_sub : colors.away_sub;
  const leftTextColor =
    type === '1st' || type === 'ot1' ? colors.home_text : colors.away_text;

  const right = type === '1st' || type === 'ot1' ? colors.away : colors.home;
  const rightSub =
    type === '1st' || type === 'ot1' ? colors.away_sub : colors.home_sub;
  const rightTextColor =
    type === '1st' || type === 'ot1' ? colors.away_text : colors.home_text;

  const leftTeam = type === '1st' || type === 'ot1' ? teams.home : teams.away;
  const rightTeam = type === '1st' || type === 'ot1' ? teams.away : teams.home;

  const leftScore =
    type === '1st' || type === 'ot1' ? data?.home_score : data?.away_score;
  const rightScore =
    type === '1st' || type === 'ot1' ? data?.away_score : data?.home_score;

  const leftGoal =
    type === '1st' || type === 'ot1' ? data?.is_home_goal : data?.is_away_goal;
  const rightGoal =
    type === '1st' || type === 'ot1' ? data?.is_away_goal : data?.is_home_goal;

  const isExtraTime = data?.extra_time > 0;

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
            background: leftGoal ? leftSub : rightGoal ? rightSub : '',
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
              right: leftGoal ? 40 : undefined,
              left: rightGoal ? 40 : undefined,
              fontSize: 60,
              fontWeight: 900,
              fontFamily: 'Pretendard',
            }}
            className={leftGoal || rightGoal ? 'typoGoal' : ''}
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
            className={rightGoal ? 'opacity' : ''}
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
                gap: 14,
                zIndex: 10,
              }}
              className={leftGoal || rightGoal ? 'opacity' : ''}
            >
              <div
                style={{
                  textAlign: 'right',
                  position: 'relative',
                  top: -12,
                  width: 200,
                  letterSpacing: -4,
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
                  width: 200,
                  letterSpacing: -4,
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
            className={leftGoal ? 'opacity' : ''}
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
            display: data?.is_timer ? 'flex' : 'none',
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
            {data?.standard_time ? `${min}:${sec}` : '경기전'}
          </div>
          {data?.is_var ? (
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
            +{data?.extra_time}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Theme2TypeApi() {
  return (
    <>
      <Theme2 />
    </>
  );
}

export default Theme2TypeApi;
