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

export const getParsedData = (csvString: string, delimiter = ",") => {
  const csvData: ParsedCSVData = [];

  const rows = csvString.split("\n");

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

export const getProjectEmployees = async (csvData: ParsedCSVData) => {
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

  for await (const projectEmployeesArray of projectMap.values()) {
    console.log(projectEmployeesArray);

    for (const emp1 of projectEmployeesArray) {
      for (const emp2 of projectEmployeesArray) {
        if (emp1.empId === emp2.empId) continue;
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

  // projectMap.forEach((projectEmployeesArray, projectId) => {
  //   console.log(projectId);
  //   console.log(projectEmployeesArray);

  //   for (let i = 0; i < projectEmployeesArray.length; i++) {
  //     for (let j = i + 1; j < projectEmployeesArray.length - 1; j++) {
  //       const days = getDaysTogether(
  //         {
  //           dateFrom: projectEmployeesArray[i].dateFrom,
  //           dateTo: projectEmployeesArray[i].dateTo,
  //         },
  //         {
  //           dateFrom: projectEmployeesArray[j].dateFrom,
  //           dateTo: projectEmployeesArray[j].dateTo,
  //         }
  //       );

  //       console.log(days);
  //       console.log(projectEmployeesArray[i].empId);
  //       console.log(projectEmployeesArray[j].empId);

  //       res.push({
  //         empId1: projectEmployeesArray[i].empId,
  //         empId2: projectEmployeesArray[j].empId,
  //         days,
  //       });
  //     }
  //   }
  // });

  return res;
};
