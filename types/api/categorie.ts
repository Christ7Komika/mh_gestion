export interface OtherDocument {
  id: string;
  document: string;
  isExpired: boolean;
  comment: string;
  startDate: string;
  endDate: string;
  otherDocumentType: { name: string };
  createdAt: string;
}

export interface Categories {
  id: string;
  name: string;
  OtherDocument: OtherDocument[];
}
