export const getAgeFromDate = (date) => {
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth();

  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(5, 7));

  if (month > curMonth) {
    return curYear - year + 1;
  } else {
    return curYear - year;
  }
};
