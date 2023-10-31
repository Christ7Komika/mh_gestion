export interface Leave {
  id: string;
  file: string;
  status: string;
  motif: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  employeeId: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface GetLeave {
  data: Leave[];
  total: number;
  inProgress: number;
}
