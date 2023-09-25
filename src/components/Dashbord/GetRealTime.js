const GetRealTime = (date) => {
  const currTime = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const date1 = new Date(date);
  const date2 = new Date(currTime);

  const isSameYear = date1.getFullYear() === date2.getFullYear();

  const isSameDay = date1.getDate() === date2.getDate();

  if (isSameDay)
    return date1.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

  if (isSameYear) {
    const day = date1.toLocaleString("en-US", { day: "numeric" });
    const month = date1.toLocaleString("en-US", { month: "short" });

    return `${day} ${month} `;

  }

  return date1.toLocaleDateString();
};

export default GetRealTime;
