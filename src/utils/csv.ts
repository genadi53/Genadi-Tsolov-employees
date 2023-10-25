import { formatDateString, getDaysTogether } from "./dateHelpers";
import {
  EmployeesWorkingTogetherData,
  ParsedCSVData,
  ProjectEmployeesData,
} from "./types";

// const data: [number, number, string, string][] = [
//   [1, 1, "2022/03/15", "2002/02/25"],
//   [2, 1, "2020/09/20", "2007/08/21"],
//   [3, 2, "2012/04/29", "2010/10/15"],
//   [4, 3, "2016/06/23", "2022/11/13"],
//   [5, 3, "2020/02/13", ""],
// ];

// const map = new Map<number, number[]>();
// data.map((el: [number, number, string, string]) => {
//   const [id, projId, _dateStart, _dateEnd] = el;
//   if (map.has(projId)) {
//     const emplIds = map.get(projId);
//     map.set(projId, emplIds ? [...emplIds, id] : [id]);
//   } else {
//     map.set(projId, [id]);
//   }
// });

// map.forEach((val, key) => {
//   console.log(val);
//   val.forEach((el) => console.log(el));
// });

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
    // console.log(rowData);
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
  console.log(projectMap);

  const res: EmployeesWorkingTogetherData[] = [];
  const passedIds: number[] = [];

  for (const projectEmployeesArray of projectMap.values()) {
    console.log(projectEmployeesArray);

    for (const emp1 of projectEmployeesArray) {
      for (const emp2 of projectEmployeesArray) {
        if (emp1.empId === emp2.empId || passedIds.includes(emp2.empId))
          continue;
        const days = getDaysTogether(
          {
            dateFrom: emp1.dateFrom,
            dateTo: emp1.dateTo,
          },
          {
            dateFrom: emp2.dateFrom,
            dateTo: emp2.dateTo,
          }
        );

        passedIds.push(emp1.empId);
        console.log(days);
        console.log(emp1.empId);
        console.log(emp2.empId);

        res.push({
          empId1: emp1.empId,
          empId2: emp2.empId,
          days,
        });
      }
    }
  }
  return res;
};
