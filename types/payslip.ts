export interface PaySlip {
  id: string;
  file: string;
  comment: string;
  salary: string;
  payementDate: string;
  createdAt: string;
  employeeId: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
  };
}
