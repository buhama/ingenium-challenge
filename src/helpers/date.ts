import { getUnixTime, parse, isValid, format } from "date-fns";

export const convertDateToUnix = (date: string, time?: string): number => {
  const parsedDate = time
    ? parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", new Date())
    : parse(date, "yyyy-MM-dd", new Date());
  const unixDate = getUnixTime(parsedDate);
  return unixDate * 1000;
};

export const convertUnixToDate = (
  unix: number | undefined,
  dateFormat = DATE_FORMAT.YYYY_MM_DD
): string => {
  if (!unix) {
    return "";
  }

  if (unix === 0) {
    return "";
  }

  return isValid(unix) ? format(new Date(unix), dateFormat).toString() : "";
};

export const getTodaysDate = (): number =>
  convertDateToUnix(
    format(new Date(), DATE_FORMAT.YYYY_MM_DD),
    format(new Date(), DATE_FORMAT.HH_MM)
  );

export enum DATE_FORMAT {
  YYYY_MM_DD = "yyyy-MM-dd",
  YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd hh:mm:ss",
  HH_MM = "HH:mm",
  WRITTEN_TIME = "hh:mm a",
  WRITTEN_DATE = "MMM dd',' yyyy",
  WRITTEN_DATE_AND_TIME = "MMM dd 'at' hh:mm a",
  MONTH_DAY = "MMM dd",
  DAY = "dd",
  DAY_SUFFIX = "do",
  WEEK_DAY = "EEE",
  DAY_WRITTEN_DATE_AND_TIME = "EEE, MMM d 'at' h:mm a",
  MONTH = "MMMM",
  MONTH_YEAR = "MMMM yyyy",
}
