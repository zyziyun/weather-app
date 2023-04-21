const WEEK_TXT = {
    "Monday": "Mon",
    "Tuesday": "Tue",
    "Wednesday": "Wed",
    "Thursday": "Thu",
    "Friday": "Fri",
    "Saturday": "Sat",
    "Sunday": "Sun",
    "April": "Apr"
}

const replaceWeekDay = (str) => {
    let new_str = str;
    Object.keys(WEEK_TXT).forEach((key) => {
        new_str = new_str.replace(key, WEEK_TXT[key]);
    });
    return new_str;
}

export const getFullTime = (dt = Date.now(), timezoneOffset = 0) => {
    const localDate = new Date(dt);
    const targetTimezoneOffset = new Date().getTimezoneOffset() * -60 - timezoneOffset;
    const mtime = new Date(localDate.getTime() + targetTimezoneOffset * 1000 * -1);
  
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    };

    return replaceWeekDay(mtime.toLocaleString("en-US", options));
}
  
export const getTimeHM = (time, timezoneOffset = 0) => {
    const localDate = new Date(time);
    const targetTimezoneOffset = new Date().getTimezoneOffset() * -60 - timezoneOffset;
    const mtime = new Date(localDate.getTime() + targetTimezoneOffset * 1000 * -1);
  
    const options = {
      hour: "numeric",
      minute: "numeric"
    };
    
    return mtime.toLocaleString("en-US", options);
}