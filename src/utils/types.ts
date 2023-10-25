export type ParsedCSVData = [number, number, Date, Date][];

export type EmployeeData = {
  empId: number;
  projectId: number;
  dateFrom: Date;
  dateTo: Date;
};

export type ProjectEmployeesData = {
  empId: number;
  dateFrom: Date;
  dateTo: Date;
};

export type DatePeriod = { dateFrom: Date; dateTo: Date };

export type EmployeesWorkingTogetherData = {
  empId1: number;
  empId2: number;
  days: number;
};
