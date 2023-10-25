import { formatDateString, getDaysTogether } from "./dateHelpers";
import {
  EmployeesWorkingTogetherData,
  ParsedCSVData,
  ProjectEmployeesData,
} from "./types";

export const getParsedData = (
  csvString: string,
  delimiter = ",",
  haveHeader: boolean = false
) => {
  const csvData: ParsedCSVData = [];

  const rows = csvString.split("\n");
  if (haveHeader) rows.shift();

  for (let row of rows) {
    const rowData = row.split(delimiter);
    const [empIdStr, projectIdStr, dateFromStr, dateToStr] = rowData;
    csvData.push([
      Number(empIdStr),
      Number(projectIdStr),
      formatDateString(dateFromStr),
      formatDateString(dateToStr),
    ]);
  }

  return csvData;
};

export const getProjectEmployees = (csvData: ParsedCSVData) => {
  const projectMap = new Map<number, ProjectEmployeesData[]>();

  for (const record of csvData) {
    const [empId, projectId, dateFrom, dateTo] = record;
    if (projectMap.has(projectId)) {
      const emplData = projectMap.get(projectId);
      projectMap.set(
        projectId,
        emplData && emplData !== undefined
          ? [...emplData, { empId, dateFrom, dateTo }]
          : [{ empId, dateFrom, dateTo }]
      );
    } else {
      projectMap.set(projectId, [{ empId, dateFrom, dateTo }]);
    }
  }

  const result: EmployeesWorkingTogetherData[] = [];
  for (const projectEmployeesArray of projectMap.values()) {
    projectEmployeesArray.reduce((prev, curr) => {
      const days = getDaysTogether(
        {
          dateFrom: prev.dateFrom,
          dateTo: prev.dateTo,
        },
        {
          dateFrom: curr.dateFrom,
          dateTo: curr.dateTo,
        }
      );
      result.push({ empId1: prev.empId, empId2: curr.empId, days });
      return curr;
    });
  }
  return result;
};
