export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  nationality?: string;
  profil?: string;
  gender?: string;
  age?: number;
  address?: string;
  phone?: string;
  email?: string;
  maritalStatus?: string;
  children?: number;
  post?: string;
  OtherDocument: {
    document: string;
    isExpired: boolean;
    comment: string;
    startDate: string;
    endDate: string;
    OtherDocumentType: { name: string }[];
    createdAt: string;
  }[];
  Contract: {
    type: string;
  }[];
  Leave: {
    status: string;
  }[];
  Sanction: {
    status: string;
  }[];
  createdAt: string;
};

export type PostEmployee = {
  firstName: string;
  lastName: string;
  nationality?: string;
  profil?: string;
  gender: string;
  age?: number;
  address?: string;
  phone?: string;
  email?: string;
  maritalStatus?: string;
  children?: number;
  post: string;
};

export type GetEmployees = {
  employees: Employee[];
  count: number;
  currentContract: number;
  endContract: number;
  currentLeave: number;
};
