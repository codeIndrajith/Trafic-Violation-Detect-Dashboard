export interface Violation {
  id?: string;
  number_plate?: string;
  vehicle?: string;
  violation?: string;
  violation_count?: number;
  reportGen?: boolean;
  dateTime?: string;
}

export interface ReportData {
  address: string;
  createdAt: Date;
  email: string;
  fine: string;
  phone: string;
  violationId: string;
  vehicleNumber: string;
  violation: string;
  detectDateTime: string;
}
