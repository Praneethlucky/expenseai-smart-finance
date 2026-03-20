export interface CreateBillRequestDto {
  name: string;
  amount: number;
  categoryId: number;
  paymentTypeId: number;

  frequency: string;

  startDate: string;
  endDate?: string;

  dayOfMonth?: number;
  dayOfWeek?: number;
  monthOfYear?: number;
  
}

export interface Bill {
  billId : number;
  name: string;
  amount: number;
  categoryId: number;
  paymentTypeId: number;

  frequency?: string;
}

export interface UpdateBillDto {
  billId : number;
  name: string;
  amount: number;
  categoryId?: number;
  paymentTypeId?: number;

  frequency?: string;
}