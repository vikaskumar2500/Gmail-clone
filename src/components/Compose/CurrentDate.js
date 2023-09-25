
const CurrentDate = () => {
  const date = new Date();
  const time = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
  return time;
};

export default CurrentDate;
