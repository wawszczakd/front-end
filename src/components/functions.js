const formatTime = (time) => {
  const formattedTime = time.replace(/:/g, '');
  return formattedTime.slice(0, 4);
};

export const formatWorkTimes = (workTimes) => {
  return workTimes.map((time) => ({
    from: formatTime(time.from),
    to: formatTime(time.to)
  }));
};

export const reverseFormatTime = (formattedTime) => {
  const timeWithColons = formattedTime.replace(/(\d{2})(\d{2})/, '$1:$2');
  return timeWithColons;
};

export const formatPrice = (price) => {
  const zl = Math.floor(price / 100);
  const gr = price % 100;
  
  if (zl > 0) return `${zl} zł ${gr} gr`;
  else return `${gr} gr`;
};

export const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  
  if (hours > 0) return `${hours} h ${minutes} m`;
  else return `${minutes} m`;
};
