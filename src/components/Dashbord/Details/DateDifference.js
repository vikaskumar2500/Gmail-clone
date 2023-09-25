const DateDifference = (date) => {
  const currTime = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const date1 = new Date(date);
  const date2 = new Date(currTime);

  // time difference in milliseconds
  const timeDifference = date2.getTime() - date1.getTime();

  // milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  // remaining milliseconds after subtracting days
  const remainingMilliseconds = timeDifference % (1000 * 3600 * 24);

  // hours
  const hoursDifference = Math.floor(remainingMilliseconds / (1000 * 3600));

  // remaining milliseconds after subtracting hours
  const remainingMilliseconds2 = remainingMilliseconds % (1000 * 3600);

  // minutes
  const minutesDifference = Math.floor(remainingMilliseconds2 / (1000 * 60));

  if (daysDifference === 0) {
    if (hoursDifference === 0)
      return { time: minutesDifference, type: "minutes" };
    else return { time: hoursDifference, type: "hours" };
  } else return { time: daysDifference, type: "days" };
};

export default DateDifference;
