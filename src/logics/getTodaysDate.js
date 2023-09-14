const timeUnits = {
  year: 365 * 24 * 60,
  years: 365 * 24 * 60,
  month: 30 * 24 * 60,
  months: 30 * 24 * 60,
  week: 7 * 24 * 60,
  weeks: 7 * 24 * 60,
  day: 24 * 60,
  days: 24 * 60,
  hour: 60,
  hours: 60,
  minute: 1,
  minutes: 1,
};

const getTodayDate = (durationString) => {
  if (!durationString) {
    throw new Error("Duration is must.");
  }

  try {
    const parts = durationString.match(
      /(\d+)\s*(year|month|week|day|hour|minute|second)s?/g
    );

    if (parts && parts.length) {
      let minutes = 0;
      parts.forEach((part) => {
        part = part.toString().trim();

        const [quantity, unit] = part.split(/\s+/);
        minutes += parseInt(quantity) * timeUnits[unit];
      });

      return minutes >= 0 && minutes <= (24 + 3) * 60;
    }
  } catch (e) {
    console.log(">> error", e);
    return false;
  }
};

module.exports = getTodayDate;
