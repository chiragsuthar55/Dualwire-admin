export const renderMsg = (e) => {
  console.log("e", e);
  return e?.response?.status === 401 ||
    e?.response?.status === 404 ||
    e?.response?.status === 400
    ? e?.response?.data?.message
    : "Something goes wrong, please try again later!";
};

export const getPaymentStatus = (val, str) => {
  if (!val) return;
  console.log("val", val, str);
  if (str === "Active") {
    if (val === 1) return "Active";
    else if (val === 2) return "InActive";
  } else {
    if (val === 1) return "SUCCESS";
    else if (val === 2) return "CANCELED";
  }
};

export const formattedDateWithTime = (date) => {
  if (!date) return;
  const jsDate = new Date(date);
  if (isNaN(jsDate)) return date;

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = jsDate.toLocaleString("en-US", options)?.split(",");
  return `${formattedDate[0]} at${formattedDate[1]}`;
};

export const getShortNumber = (number) => {
  if (number >= 1000000) return (number / 1000000)?.toFixed(1) + "M";
  else if (number >= 1000) return (number / 1000)?.toFixed(1) + "K";
  else return number?.toString();
};
