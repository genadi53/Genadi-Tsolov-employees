import { DatePeriod } from "./types";

export const formatDateString = (dateString: string) => {
  if (dateString === "NULL") {
    return new Date();
  }
  return new Date(dateString);
};

export const checkForOverlap = (period1: DatePeriod, period2: DatePeriod) => {
  return (
    (period1.dateFrom <= period2.dateTo &&
      period1.dateFrom >= period2.dateFrom) ||
    (period2.dateFrom <= period1.dateTo && period2.dateFrom >= period1.dateFrom)
  );
};

export const getDaysTogether = (period1: DatePeriod, period2: DatePeriod) => {
  const workedTogether = checkForOverlap(period1, period2);
  if (!workedTogether) return 0;

  const startDate = compareDates(period1.dateFrom, period2.dateFrom, "greater");
  const endDate = compareDates(period1.dateTo, period2.dateTo, "lesser");
  const timeDiff = endDate.getTime() - startDate.getTime();

  const overlapDays = timeDiff / (1000 * 60 * 60 * 24);
  return Math.round(overlapDays + 1);
};

export const compareDates = (
  date1: Date,
  date2: Date,
  searchFor: "greater" | "lesser" = "greater"
) => {
  if (searchFor === "greater") {
    return date1 >= date2 ? date1 : date2;
  } else {
    return date1 <= date2 ? date1 : date2;
  }
};
