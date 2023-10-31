export interface Contract {
  id: string;
  type: string;
  file: string;
  status: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface GetContracts {
  data: Contract[];
  countContract: number;
  countInProgressContract: number;
  countEndContract: number;
}
