import dayjs from 'dayjs';

export const standardTime = dayjs().subtract(20, 'minute').toISOString();

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const colors = {
  home: '#DD2121',
  home_sub: '#1d0505',
  home_text: '#FFFFFF',
  away: '#c6d1dc',
  away_sub: '#152a40',
  away_text: '#152e52',
};

export const teams = {
  home: '브렌트포드',
  away: '토트넘',
};
