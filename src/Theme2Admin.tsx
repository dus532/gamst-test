import { useEffect, useState } from 'react';
import { updateOverlayData, useOverlayData } from './overlay';
import dayjs from 'dayjs';

function LabalInput({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: 12,
        background: 'rgba(255,255,255,0.05)',
        flex: 1,
      }}
    >
      <label style={{ fontSize: 20 }}>{label}</label>
      <br />
      {children}
    </div>
  );
}

export default function Theme2Admin() {
  const data = useOverlayData();
  const [time, setTime] = useState(0);
  const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (data?.standard_time) {
      const interval = setInterval(() => {
        const diff = dayjs().diff(dayjs(data?.standard_time), 'second');
        setTime(diff);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [data?.standard_time, time]);

  const min =
    Math.floor(time / 60) > 9
      ? Math.floor(time / 60)
      : `0${Math.floor(time / 60)}`;
  const sec = time % 60 > 9 ? time % 60 : `0${time % 60}`;

  return (
    <div
      style={{
        margin: '0 auto',
        padding: '20px',
        maxWidth: 1200,
        width: '100%',
        display: 'flex',
        gap: 12,
      }}
    >
      <div
        style={{
          flex: 2,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <LabalInput label='현재 시간'>
          <div style={{ fontSize: 50 }}>
            {min}:{sec}
          </div>
          <div style={{ fontSize: 12, opacity: 0.5 }}>
            {dayjs(data?.standard_time).format('YYYY.MM.DD HH:mm:ss')} 으로부터
          </div>
        </LabalInput>
        <LabalInput label='시간 조정'>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              onClick={async () => {
                const newTime = dayjs(data?.standard_time).add(5, 'minute');
                await updateOverlayData({
                  standard_time: newTime.toISOString(),
                });
              }}
            >
              - 5분
            </button>
            <button
              onClick={async () => {
                const newTime = dayjs(data?.standard_time).add(60, 'second');
                await updateOverlayData({
                  standard_time: newTime.toISOString(),
                });
              }}
            >
              - 60초
            </button>
            <button
              onClick={async () => {
                const newTime = dayjs(data?.standard_time).add(10, 'second');
                await updateOverlayData({
                  standard_time: newTime.toISOString(),
                });
              }}
            >
              - 10초
            </button>
            <button
              onClick={async () => {
                const newTime = dayjs(data?.standard_time).add(1, 'second');
                await updateOverlayData({
                  standard_time: newTime.toISOString(),
                });
              }}
            >
              - 1초
            </button>
            <button
              onClick={async () => {
                const newTime = dayjs(data?.standard_time).subtract(
                  1,
                  'second'
                );
                await updateOverlayData({
                  standard_time: newTime.toISOString(),
                });
              }}
            >
              + 1초
            </button>
            <button
              onClick={async () => {
                const newTime = dayjs(data?.standard_time).subtract(
                  10,
                  'second'
                );
                await updateOverlayData({
                  standard_time: newTime.toISOString(),
                });
              }}
            >
              + 10초
            </button>
            <button
              onClick={async () => {
                const newTime = dayjs(data?.standard_time).subtract(
                  60,
                  'second'
                );
                await updateOverlayData({
                  standard_time: newTime.toISOString(),
                });
              }}
            >
              + 60초
            </button>
            <button
              onClick={async () => {
                const newTime = dayjs(data?.standard_time).subtract(
                  5,
                  'minute'
                );
                await updateOverlayData({
                  standard_time: newTime.toISOString(),
                });
              }}
            >
              + 5분
            </button>
          </div>
        </LabalInput>
        <LabalInput label='전/후반전 + 시간 초기화'>
          <button
            onClick={() => {
              const newTime = dayjs().subtract(0, 'minute');
              updateOverlayData({
                standard_time: newTime.toISOString(),
                time_type: '1st',
                is_timer: true,
              });
            }}
          >
            전반전 초기화 (00:00) + 전반전으로
          </button>
          <button
            onClick={() => {
              const newTime = dayjs().subtract(45, 'minute');
              updateOverlayData({
                standard_time: newTime.toISOString(),
                time_type: '2nd',
                is_timer: true,
              });
            }}
          >
            후반전 초기화 (45:00) + 후반전으로
          </button>
        </LabalInput>
        <hr style={{ width: '100%' }} />
        <LabalInput label={`${data?.home_name} 골`}>
          현재 : {data?.home_score}
          <div
            style={{
              display: 'flex',
              gap: 8,
            }}
          >
            <button
              onClick={async () => {
                await updateOverlayData({
                  home_score: 0,
                });
              }}
            >
              0으로 초기화
            </button>
            <button
              onClick={async () => {
                if (data?.home_score <= 0) return;
                await updateOverlayData({
                  home_score: data?.home_score - 1,
                });
              }}
            >
              - 1골
            </button>
            <button
              onClick={async () => {
                await updateOverlayData({
                  home_score: data?.home_score + 1,
                });
              }}
            >
              + 1골
            </button>
          </div>
        </LabalInput>
        <LabalInput label={`${data?.away_name} 골`}>
          현재 : {data?.away_score}
          <div
            style={{
              display: 'flex',
              gap: 8,
            }}
          >
            <button
              onClick={async () => {
                await updateOverlayData({
                  away_score: 0,
                });
              }}
            >
              0으로 초기화
            </button>
            <button
              onClick={async () => {
                if (data?.away_score <= 0) return;
                await updateOverlayData({
                  away_score: data?.away_score - 1,
                });
              }}
            >
              - 1골
            </button>
            <button
              onClick={async () => {
                await updateOverlayData({
                  away_score: data?.away_score + 1,
                });
              }}
            >
              + 1골
            </button>
          </div>
        </LabalInput>
        <hr style={{ width: '100%' }} />
        <LabalInput label='홈 팀 | 이름'>
          <input
            type='text'
            defaultValue={data?.home_name}
            onChange={async (e) => {
              clearTimeout(timeoutState);
              const text = e.target.value;

              setTimeoutState(
                setTimeout(async () => {
                  await updateOverlayData({
                    home_name: text,
                  });
                }, 300)
              );
            }}
          ></input>
        </LabalInput>
        <div style={{ display: 'flex', gap: 12 }}>
          <LabalInput label='홈 배경색'>
            <input
              type='color'
              value={data?.home_color}
              onChange={async (e) => {
                clearTimeout(timeoutState);
                const color = e.target.value;

                setTimeoutState(
                  setTimeout(async () => {
                    await updateOverlayData({
                      home_color: color,
                    });
                  }, 300)
                );
              }}
            ></input>
          </LabalInput>
          <LabalInput label='홈 서브 색'>
            <input
              type='color'
              value={data?.home_sub_color}
              onChange={async (e) => {
                clearTimeout(timeoutState);
                const color = e.target.value;

                setTimeoutState(
                  setTimeout(async () => {
                    await updateOverlayData({
                      home_sub_color: color,
                    });
                  }, 300)
                );
              }}
            ></input>
          </LabalInput>
          <LabalInput label='홈 텍스트 색'>
            <input
              type='color'
              value={data?.home_text_color}
              onChange={async (e) => {
                clearTimeout(timeoutState);
                const color = e.target.value;

                setTimeoutState(
                  setTimeout(async () => {
                    await updateOverlayData({
                      home_text_color: color,
                    });
                  }, 300)
                );
              }}
            ></input>
          </LabalInput>
        </div>
        <hr style={{ width: '100%' }} />
        <LabalInput label='어웨이 팀 | 이름'>
          <input
            type='text'
            defaultValue={data?.away_name}
            onChange={async (e) => {
              clearTimeout(timeoutState);
              const text = e.target.value;

              setTimeoutState(
                setTimeout(async () => {
                  await updateOverlayData({
                    away_name: text,
                  });
                }, 300)
              );
            }}
          ></input>
        </LabalInput>
        <div style={{ display: 'flex', gap: 12 }}>
          <LabalInput label='어웨이 팀 | 배경색'>
            <input
              type='color'
              value={data?.away_color}
              onChange={async (e) => {
                clearTimeout(timeoutState);
                const color = e.target.value;

                setTimeoutState(
                  setTimeout(async () => {
                    await updateOverlayData({
                      away_color: color,
                    });
                  }, 300)
                );
              }}
            ></input>
          </LabalInput>
          <LabalInput label='어웨이 팀 | 서브 색'>
            <input
              type='color'
              value={data?.away_sub_color}
              onChange={async (e) => {
                clearTimeout(timeoutState);
                const color = e.target.value;

                setTimeoutState(
                  setTimeout(async () => {
                    await updateOverlayData({
                      away_sub_color: color,
                    });
                  }, 300)
                );
              }}
            ></input>
          </LabalInput>
          <LabalInput label='어웨이 팀 | 텍스트 색'>
            <input
              type='color'
              value={data?.away_text_color}
              onChange={async (e) => {
                clearTimeout(timeoutState);
                const color = e.target.value;

                setTimeoutState(
                  setTimeout(async () => {
                    await updateOverlayData({
                      away_text_color: color,
                    });
                  }, 300)
                );
              }}
            ></input>
          </LabalInput>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          flex: 1,
          height: 'fit-content',
        }}
      >
        <LabalInput label='전/후반전 설정'>
          <div style={{ fontSize: 14 }}>
            현재 :{' '}
            {data?.time_type === '1st'
              ? '전반전'
              : data?.time_type === '2nd'
              ? '후반전'
              : ''}
          </div>
          <button
            onClick={() => {
              updateOverlayData({
                time_type: '1st',
              });
            }}
          >
            전반전으로 설정
          </button>
          <button
            onClick={() => {
              updateOverlayData({
                time_type: '2nd',
              });
            }}
          >
            후반전으로 설정
          </button>
        </LabalInput>
        <LabalInput label='홈 팀'>
          <button
            disabled={data?.is_home_goal}
            onClick={async () => {
              await updateOverlayData({
                is_home_goal: false,
              });
              await updateOverlayData({
                is_home_goal: true,
              });
              setTimeout(async () => {
                await updateOverlayData({
                  home_score: data?.home_score + 1,
                });
              }, 3000);
              setTimeout(async () => {
                await updateOverlayData({
                  is_home_goal: false,
                });
              }, 8000);
            }}
          >
            {data?.home_name} 골! (액션)
          </button>
        </LabalInput>
        <LabalInput label='어웨이 팀'>
          <button
            disabled={data?.is_away_goal}
            onClick={async () => {
              await updateOverlayData({
                is_away_goal: false,
              });
              await updateOverlayData({
                is_away_goal: true,
              });
              setTimeout(async () => {
                await updateOverlayData({
                  away_score: data?.away_score + 1,
                });
              }, 3000);
              setTimeout(async () => {
                await updateOverlayData({
                  is_away_goal: false,
                });
              }, 8000);
            }}
          >
            {data?.away_name} 골! (액션)
          </button>
        </LabalInput>
        <hr style={{ width: '100%' }} />
        <LabalInput label='타이머 표시'>
          <button
            disabled={data?.is_timer}
            onClick={async () => {
              await updateOverlayData({
                is_timer: true,
              });
            }}
          >
            타이머 켜기
          </button>
          <button
            disabled={!data?.is_timer}
            onClick={async () => {
              await updateOverlayData({
                is_timer: false,
              });
            }}
          >
            타이머 끄기
          </button>
        </LabalInput>
        <LabalInput label='VAR'>
          <button
            disabled={data?.is_var}
            onClick={async () => {
              await updateOverlayData({
                is_var: true,
              });
            }}
          >
            VAR 켜기
          </button>
          <button
            disabled={!data?.is_var}
            onClick={async () => {
              await updateOverlayData({
                is_var: false,
              });
            }}
          >
            VAR 끄기
          </button>
        </LabalInput>
        <LabalInput label='추가시간'>
          <input
            type='number'
            defaultValue={data?.extra_time}
            onChange={async (e) => {
              clearTimeout(timeoutState);
              const text = e.target.value;

              setTimeoutState(
                setTimeout(async () => {
                  await updateOverlayData({
                    extra_time: text,
                  });
                }, 300)
              );
            }}
          ></input>
          <br />( 0 입력시 추가시간 제거됨 )
        </LabalInput>
        <hr style={{ width: '100%' }} />
        <LabalInput label='상단 스페셜 메세지 (ex. 손흥민 출전)'>
          <input
            type='text'
            defaultValue={data?.special_top}
            onChange={async (e) => {
              clearTimeout(timeoutState);
              const text = e.target.value;

              setTimeoutState(
                setTimeout(async () => {
                  await updateOverlayData({
                    special_top: text,
                  });
                }, 300)
              );
            }}
          ></input>
        </LabalInput>
        <LabalInput label='하단 스페셜 메세지 (ex. 전반 종료)'>
          <input
            type='text'
            defaultValue={data?.special_bottom}
            onChange={async (e) => {
              clearTimeout(timeoutState);
              const text = e.target.value;

              setTimeoutState(
                setTimeout(async () => {
                  await updateOverlayData({
                    special_bottom: text,
                  });
                }, 300)
              );
            }}
          ></input>
        </LabalInput>
      </div>
    </div>
  );
}
