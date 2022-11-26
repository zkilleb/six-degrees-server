import dotenv from 'dotenv';

dotenv.config();

export function getCurrentLoggingDate() {
  const currentDate = new Date();
  const formattedDate =
    currentDate.getFullYear() +
    '-' +
    (currentDate.getMonth() + 1) +
    '-' +
    currentDate.getDate() +
    ' ' +
    currentDate.getHours() +
    ':' +
    currentDate.getMinutes() +
    ':' +
    currentDate.getSeconds();
  return formattedDate;
}

export function generateTMDBParams(keyword) {
  return {
    params: {
      api_key: process.env.API_KEY,
      language: 'en-US',
      query: keyword,
      page: 1,
      include_adult: false,
    },
  };
}
