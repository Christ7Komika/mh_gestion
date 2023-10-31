export interface Sanction {
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

export interface GetSanctions {
  data: Sanction[];
  total: number;
  inProgress: number;
}
