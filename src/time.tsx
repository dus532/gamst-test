import dayjs from 'dayjs';

export const standardTime = dayjs().subtract(20, 'minute').toISOString();

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
