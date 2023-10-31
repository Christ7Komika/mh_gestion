export interface EmployeeDocument {
  id: string;
  document: string;
  isExpired: boolean;
  comment: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  otherDocumentType: {
    name: string;
  };
}
[];

export interface OtherDocument {
  id: string;
  document: string;
  isExpired: boolean;
  comment: string;
  startDate: string;
  endDate: string;
  employeeId: string;
  updatedAt: string;
  createdAt: string;
  otherDocumentTypeId: string;
}

export interface OtherDocumentType {
  id: string;
  name: string;
  OtherDocument: OtherDocument[];
}
